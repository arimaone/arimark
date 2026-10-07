import { describe, it, expect } from "vitest";
import {
  parseFrontmatter,
  prepareInputMarkdown,
  formatOutputMarkdown,
} from "../src/frontmatter.js";

describe("Frontmatter Edge Cases & Robustness", () => {
  it("handles titles containing colons and quotes correctly", () => {
    const input = `---
title: "Vue 3: The Complete Guide & Best Practices"
tags: ["vue-3", "javascript"]
---

Body content here`;

    const parsed = parseFrontmatter(input);
    expect(parsed.title).toBe("Vue 3: The Complete Guide & Best Practices");
    expect(parsed.tags).toEqual(["vue-3", "javascript"]);
  });

  it("ignores YAML comments inside frontmatter", () => {
    const input = `---
# Documentation metadata
title: "Document Title"
# Tag list below
tags: ["tag1", "tag2"]
---

Content`;

    const parsed = parseFrontmatter(input);
    expect(parsed.title).toBe("Document Title");
    expect(parsed.tags).toEqual(["tag1", "tag2"]);
  });

  it("does not break on horizontal rules (---) inside the document body", () => {
    const input = `---
title: "Note with Dividers"
tags: ["notes"]
---

Section 1

---

Section 2

---

Section 3`;

    const parsed = parseFrontmatter(input);
    expect(parsed.title).toBe("Note with Dividers");
    expect(parsed.body).toContain("Section 1");
    expect(parsed.body).toContain("---");
    expect(parsed.body).toContain("Section 3");
  });

  it("handles unclosed frontmatter delimiters gracefully without crashing", () => {
    const brokenInput = `---
title: "Unfinished Frontmatter
tags: ["test"]

No closing delimiter here`;

    const parsed = parseFrontmatter(brokenInput);
    expect(parsed).toBeDefined();
    expect(parsed.body).toBe(brokenInput);
  });

  it("handles mixed case YAML keys gracefully", () => {
    const input = `---
title: "Case Insensitive"
description: "Some description"
tags: ["alpha", "beta"]
---

Body`;

    const parsed = parseFrontmatter(input);
    expect(parsed.title).toBe("Case Insensitive");
    expect(parsed.tags).toEqual(["alpha", "beta"]);
    expect(parsed.extraYaml.description).toBe("Some description");
  });

  it("escapes quotes when serializing output frontmatter", () => {
    const internalMarkdown = `title: [Quote "Test" Title]

tags: [test]

Body text`;

    const output = formatOutputMarkdown(internalMarkdown, "frontmatter");
    expect(output).toContain('title: "Quote \\"Test\\" Title"');
  });

  it("handles multiple tags with whitespace and empty values", () => {
    const input = `---
title: "Whitespace Tags"
tags: [  vue  ,  "milkdown"  ,   ,  "markdown"  ]
---

Content`;

    const parsed = parseFrontmatter(input);
    expect(parsed.tags).toEqual(["vue", "milkdown", "markdown"]);
  });

  it("preserves multiple custom metadata types (arrays and strings)", () => {
    const input = `---
title: "Advanced Config"
category: "engineering"
contributors:
  - Alice
  - Bob
tags: ["team"]
---

Body text`;

    const parsed = parseFrontmatter(input);
    expect(parsed.extraYaml.category).toBe("engineering");
    expect(parsed.extraYaml.contributors).toEqual(["Alice", "Bob"]);

    const serialized = formatOutputMarkdown(
      `title: [Advanced Config]\n\ntags: [team]\n\nBody text`,
      "frontmatter",
      parsed.extraYaml
    );

    expect(serialized).toContain('category: "engineering"');
    expect(serialized).toContain("contributors:\n  - \"Alice\"\n  - \"Bob\"");
  });
});
