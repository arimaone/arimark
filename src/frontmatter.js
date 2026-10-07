const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const TITLE_LINE_RE = /^title:\s*\[(.*)\]$/;
const TAGS_LINE_RE = /^tags:\s*\[(.*)\]$/;
const H1_HEADING_RE = /^#\s+(.+)$/m;

/**
 * Parses raw markdown and extracts YAML frontmatter metadata, title, tags, and extra custom fields.
 * If no title is defined in frontmatter, it optionally falls back to extracting the first `# Heading 1`.
 */
export function parseFrontmatter(markdown) {
  if (typeof markdown !== "string" || !markdown.trim()) {
    return { title: "", tags: [], extraYaml: {}, body: markdown || "" };
  }

  const match = markdown.match(FRONTMATTER_RE);
  if (!match) {
    // Check if there is an initial # Heading 1 to extract as title fallback
    const trimmed = markdown.trimStart();
    const h1Match = trimmed.match(/^#\s+(.+)(\r?\n|$)/);
    if (h1Match) {
      const fallbackTitle = h1Match[1].trim();
      const remainingBody = trimmed.slice(h1Match[0].length).trimStart();
      return { title: fallbackTitle, tags: [], extraYaml: {}, body: remainingBody };
    }
    return { title: "", tags: [], extraYaml: {}, body: markdown };
  }

  const yamlContent = match[1];
  let body = markdown.slice(match[0].length);

  let title = "";
  let tags = [];
  const extraYaml = {};

  const lines = yamlContent.split("\n");
  let currentKey = null;
  let inList = false;
  let listItems = [];

  const finalizeCurrentList = () => {
    if (currentKey && inList) {
      if (currentKey === "tags") {
        tags = listItems;
      } else {
        extraYaml[currentKey] = listItems;
      }
      currentKey = null;
      inList = false;
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    // Check list item line under a multi-line key
    if (line.startsWith("- ")) {
      if (inList) {
        const itemVal = line.slice(2).trim().replace(/^["']|["']$/g, "").trim();
        listItems.push(itemVal);
        continue;
      }
    }

    finalizeCurrentList();

    // Key-value line: key: value
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const rawVal = line.slice(colonIndex + 1).trim();

      if (key === "tags") {
        if (!rawVal) {
          // Multi-line list follows
          currentKey = "tags";
          inList = true;
          listItems = [];
        } else if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
          // Inline array: [tag1, tag2]
          tags = rawVal
            .slice(1, -1)
            .split(",")
            .map((t) => t.trim().replace(/^["']|["']$/g, "").trim())
            .filter(Boolean);
        } else {
          tags = [rawVal.replace(/^["']|["']$/g, "").trim()].filter(Boolean);
        }
      } else if (key === "title") {
        title = rawVal.replace(/^["']|["']$/g, "").trim();
      } else {
        if (!rawVal) {
          currentKey = key;
          inList = true;
          listItems = [];
        } else {
          let val = rawVal.replace(/^["']|["']$/g, "").trim();
          extraYaml[key] = val;
        }
      }
    }
  }

  finalizeCurrentList();

  // If no title was found in frontmatter, check if the body starts with an H1 heading
  if (!title) {
    const trimmedBody = body.trimStart();
    const h1Match = trimmedBody.match(/^#\s+(.+)(\r?\n|$)/);
    if (h1Match) {
      title = h1Match[1].trim();
      body = trimmedBody.slice(h1Match[0].length).trimStart();
    }
  }

  return { title, tags, extraYaml, body };
}

/**
 * Prepares raw input markdown for Milkdown Crepe initialization.
 * Converts YAML frontmatter into internal bracket syntax so Milkdown nodes can render.
 */
export function prepareInputMarkdown(rawMarkdown) {
  if (!rawMarkdown || typeof rawMarkdown !== "string") return "";
  const fm = parseFrontmatter(rawMarkdown);

  let prefix = "";
  if (fm.title) {
    prefix += `title: [${fm.title}]\n\n`;
  }
  if (fm.tags && fm.tags.length > 0) {
    prefix += `tags: [${fm.tags.join(", ")}]\n\n`;
  }

  // If there was frontmatter or fallback title, prepend our nodes to the body
  if (prefix) {
    return prefix + fm.body.trimStart();
  }

  return rawMarkdown;
}

/**
 * Parses internal bracket lines
 */
export function parseTitleLine(text) {
  const match = text.match(TITLE_LINE_RE);
  if (!match) return null;
  return (match[1] ?? "").trim();
}

export function parseTagsLine(text) {
  const match = text.match(TAGS_LINE_RE);
  if (!match) return null;
  return (match[1] ?? "").trim();
}

/**
 * Serializes internal Milkdown markdown to final output markdown.
 * Preserves extra YAML frontmatter keys (description, date, author, etc.).
 */
export function formatOutputMarkdown(markdown, format = "frontmatter", extraYaml = {}) {
  if (!markdown || typeof markdown !== "string") return "";
  if (format === "bracket") return markdown;

  let title = "";
  let tags = [];

  const lines = markdown.split("\n");
  const remainingLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const titleVal = parseTitleLine(line.trim());
    if (titleVal !== null && !title) {
      title = titleVal;
      continue;
    }
    const tagsVal = parseTagsLine(line.trim());
    if (tagsVal !== null && tags.length === 0) {
      tags = tagsVal
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      continue;
    }
    remainingLines.push(line);
  }

  const body = remainingLines.join("\n").trim();
  const hasExtra = Object.keys(extraYaml).length > 0;

  if (!title && tags.length === 0 && !hasExtra) {
    return body;
  }

  let fm = "---\n";
  if (title) {
    fm += `title: "${title.replace(/"/g, '\\"')}"\n`;
  }

  for (const [key, value] of Object.entries(extraYaml)) {
    if (key === "title" || key === "tags") continue;
    if (Array.isArray(value)) {
      fm += `${key}:\n`;
      for (const item of value) {
        fm += `  - "${String(item).replace(/"/g, '\\"')}"\n`;
      }
    } else {
      fm += `${key}: "${String(value).replace(/"/g, '\\"')}"\n`;
    }
  }

  if (tags.length > 0) {
    fm += `tags: [${tags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(", ")}]\n`;
  }
  fm += "---\n\n";

  return fm + body;
}
