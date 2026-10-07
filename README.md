# @arimaone/arimark

[![CI](https://github.com/arimaone/arimark/actions/workflows/ci.yml/badge.svg)](https://github.com/arimaone/arimark/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-24%20passed-brightgreen.svg)](https://github.com/arimaone/arimark/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg)](https://vuejs.org/)
[![Milkdown](https://img.shields.io/badge/Milkdown-v7-8b5cf6.svg)](https://milkdown.dev/)

A minimalist, block-based Markdown editor for the Vue 3 ecosystem, powered by Milkdown Crepe.

Arimark brings document metadata (Titles and Tags) directly into the interactive canvas as native visual blocks, while remaining fully interoperable with standard YAML Frontmatter used by tools like Obsidian, Astro, VitePress, Nuxt Content, and GitHub.

---

## Features

- **Native Metadata Blocks:** Title (H1) and Tags live inside the document canvas as interactive, keyboard-friendly blocks instead of detached external form fields.
- **Universal Frontmatter:** Reads and writes standard YAML Frontmatter (`--- title: ... tags: [...] ---`) and legacy bracket formats. Custom metadata fields (`description`, `author`, `date`) are preserved across edits.
- **Slash Commands (`/`):** Type `/` to insert headings, lists, code blocks, blockquotes, horizontal rules, titles, and tags.
- **Distraction-Free Canvas:** Borderless, centered typography with subtle right-margin block indicators (`H1`, `P`, `LIST`, `CODE`).
- **Font Agnostic:** Inherits the host application's typography by default (`inherit`), customizable via `--arimark-font-family`.
- **Responsive Layout:** Automatically hides right-margin indicators on screens below 1024px to prevent horizontal overflow.
- **Keyboard Shortcuts:** Built-in `Ctrl+S` / `Cmd+S` save events, tag creation (`Enter`, comma, space), and backspace deletion.
- **TypeScript Support:** Bundled with complete `.d.ts` type declarations.

---

## Installation

```bash
npm install @arimaone/arimark
# or
pnpm add @arimaone/arimark
# or
yarn add @arimaone/arimark
```

---

## Quick Start

```vue
<script setup>
import { ref } from "vue";
import { Arimark } from "@arimaone/arimark";
import "@arimaone/arimark/style.css";

const markdown = ref(`---
title: "Getting Started with Arimark"
description: "A block-based markdown editor for Vue 3."
tags: ["vue3", "markdown", "editor"]
---

Arimark turns Markdown into a living block canvas.
Type '/' anywhere to open the command menu!
`);

const onSave = (content) => {
  console.log("Document saved:", content);
};

const onTitleChange = (title) => {
  console.log("Current title:", title);
};

const onTagsChange = (tags) => {
  console.log("Current tags:", tags);
};
</script>

<template>
  <div class="editor-wrapper">
    <Arimark
      v-model="markdown"
      placeholder="Type '/' for commands"
      @save="onSave"
      @title-change="onTitleChange"
      @tags-change="onTagsChange"
    />
  </div>
</template>

<style scoped>
.editor-wrapper {
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 20px;
}
</style>
```

---

## Component API

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `v-model` (`modelValue`) | `string` | `""` | Raw Markdown content string. |
| `placeholder` | `string` | `"Type '/' for commands"` | Placeholder text displayed on empty blocks. |
| `readonly` | `boolean` | `false` | Sets editor to read-only mode. |
| `metadataFormat` | `'frontmatter' \| 'bracket'` | `'frontmatter'` | Serialization format for document title and tags. |

### Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `update:modelValue` | `string` | Emitted whenever document content changes. |
| `save` | `string` | Emitted when user presses `Ctrl+S` or `Cmd+S`. |
| `title-change` | `string` | Emitted with the current title string (`"Untitled Note"` if empty). |
| `tags-change` | `string[]` | Emitted whenever tags are added or removed. |

---

## Theming & Customization

Arimark includes neutral default colors and automatically inherits your host application's typography. You can customize colors and fonts using standard CSS custom properties:

```css
:root {
  /* Application design tokens */
  --text-main: #0f172a;
  --bg-main: #ffffff;
  --bg-muted: #f8fafc;
  --text-muted: #64748b;
  --border-subtle: #e2e8f0;
  --action-primary: #3b82f6;
  --action-hover: #2563eb;
  --action-danger: #ef4444;

  /* Arimark typography and accent tokens */
  --arimark-font-family: 'Inter', system-ui, sans-serif; /* Defaults to inherit */
  --arimark-action-primary: #8b5cf6;
}
```

---

## Local Development

To contribute or test locally:

```bash
# 1. Clone repository
git clone https://github.com/arimaone/arimark.git
cd arimark

# 2. Install dependencies
npm install

# 3. Start the interactive playground
npm run dev

# 4. Run automated test suite
npm test

# 5. Build library distribution
npm run build
```

---

## License

[MIT](LICENSE) © 2026 Arima
