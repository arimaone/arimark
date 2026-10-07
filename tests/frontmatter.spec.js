import { describe, it, expect } from "vitest";
import {
  parseFrontmatter,
  prepareInputMarkdown,
  formatOutputMarkdown,
  parseTitleLine,
  parseTagsLine,
} from "../src/frontmatter.js";

describe("Frontmatter & Metadata Engine", () => {
  it("extracts standard title and inline tags array", () => {
    const input = `---
title: "My Blog Post"
tags: ["vue", "markdown", "editor"]
---

# Introduction
Hello world!`;

    const result = parseFrontmatter(input);
    expect(result.title).toBe("My Blog Post");
    expect(result.tags).toEqual(["vue", "markdown", "editor"]);
    expect(result.body.trim()).toBe("# Introduction\nHello world!");
  });

  it("extracts multi-line YAML list tags", () => {
    const input = `---
title: "Multi-line Tags"
tags:
  - astro
  - vitepress
  - nuxt
---

Body content`;

    const result = parseFrontmatter(input);
    expect(result.title).toBe("Multi-line Tags");
    expect(result.tags).toEqual(["astro", "vitepress", "nuxt"]);
  });

  it("preserves arbitrary frontmatter keys (description, author, date)", () => {
    const input = `---
title: "Rich Metadata Document"
description: "A comprehensive guide to block editors."
author: "Thirumalai Raj"
date: "2026-10-08"
tags: ["guide", "writing"]
---

Main text goes here.`;

    const result = parseFrontmatter(input);
    expect(result.title).toBe("Rich Metadata Document");
    expect(result.tags).toEqual(["guide", "writing"]);
    expect(result.extraYaml).toEqual({
      description: "A comprehensive guide to block editors.",
      author: "Thirumalai Raj",
      date: "2026-10-08",
    });
  });

  it("falls back to extracting initial # Heading 1 when frontmatter has no title", () => {
    const inputWithoutTitle = `---
tags: ["test"]
---

# Auto Extracted Title

Rest of the body`;

    const result = parseFrontmatter(inputWithoutTitle);
    expect(result.title).toBe("Auto Extracted Title");
    expect(result.tags).toEqual(["test"]);
    expect(result.body.trim()).toBe("Rest of the body");
  });

  it("falls back to initial # Heading 1 when there is NO frontmatter at all", () => {
    const plainMarkdown = `# Standalone Title

This document has no frontmatter.`;

    const result = parseFrontmatter(plainMarkdown);
    expect(result.title).toBe("Standalone Title");
    expect(result.body.trim()).toBe("This document has no frontmatter.");
  });

  it("prepares input markdown with internal bracket syntax for Milkdown", () => {
    const input = `---
title: "Prepared Document"
tags: ["first", "second"]
---

Paragraph content`;

    const prepared = prepareInputMarkdown(input);
    expect(prepared).toContain("title: [Prepared Document]");
    expect(prepared).toContain("tags: [first, second]");
    expect(prepared).toContain("Paragraph content");
    expect(prepared).not.toContain("---");
  });

  it("formats output markdown back to standard YAML frontmatter preserving custom keys", () => {
    const internalMarkdown = `title: [Updated Title]

tags: [new-tag, open-source]

This is the updated body.`;

    const extraYaml = {
      description: "Custom description intact",
      author: "Arima Product Team",
    };

    const output = formatOutputMarkdown(internalMarkdown, "frontmatter", extraYaml);
    expect(output).toContain('title: "Updated Title"');
    expect(output).toContain('description: "Custom description intact"');
    expect(output).toContain('author: "Arima Product Team"');
    expect(output).toContain('tags: ["new-tag", "open-source"]');
    expect(output).toContain("This is the updated body.");
    expect(output.startsWith("---\n")).toBe(true);
  });

  it("formats output markdown as bracket syntax when format is 'bracket'", () => {
    const internalMarkdown = `title: [Legacy Title]

tags: [legacy, test]

Body here`;

    const output = formatOutputMarkdown(internalMarkdown, "bracket");
    expect(output).toBe(internalMarkdown);
  });

  it("handles empty or whitespace markdown gracefully", () => {
    expect(parseFrontmatter("")).toEqual({ title: "", tags: [], extraYaml: {}, body: "" });
    expect(prepareInputMarkdown("")).toBe("");
    expect(formatOutputMarkdown("", "frontmatter")).toBe("");
  });
});
