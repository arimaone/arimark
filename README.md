# arimark

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg)](https://vuejs.org/)
[![Milkdown](https://img.shields.io/badge/Milkdown-v7-8b5cf6.svg)](https://milkdown.dev/)

**Arimark** is a minimalist, block-based Markdown editor for the Vue 3 ecosystem, powered by Milkdown Crepe.

It re-imagines writing by bringing **document metadata (Titles & Tags)** directly into the interactive canvas as native visual blocks, while staying **100% interoperable with standard YAML Frontmatter** used by tools like Obsidian, Astro, VitePress, Nuxt Content, and GitHub.

---

## ✨ Features

- **🎯 Native Metadata Blocks:** Title (H1) and Tags live inside the document canvas as interactive, keyboard-friendly blocks instead of detached external form fields.
- **📄 Universal Frontmatter:** Reads and writes clean standard YAML Frontmatter (`--- title: ... tags: [...] ---`) or legacy bracket format.
- **⚡ Slash Commands (`/`):** Type `/` to insert headings, lists, code blocks, quotes, dividers, titles, and tags.
- **✨ Distraction-Free Canvas:** Clean, centered Medium-style typography with subtle right-margin block indicators (`H1`, `P`, `LIST`, `CODE`).
- **📱 Responsive & Resilient:** Automatic mobile layout adaptation (margin indicators gracefully hide below 1024px) and robust CSS variable fallbacks.
- **⌨️ Keyboard Shortcuts:** Supports `Ctrl+S` / `Cmd+S` save events, tag creation (`Enter`, comma, space), and backspace deletion.
- **🧩 TypeScript Ready:** Bundled with full `.d.ts` type definitions and Volar support.

---

## 📦 Installation

```bash
npm install arimark
# or
pnpm add arimark
# or
yarn add arimark
```

---

## 🚀 Quick Start

```vue
<script setup>
import { ref } from "vue";
import { Arimark } from "arimark";
import "arimark/style.css";

const markdown = ref(`---
title: "Getting Started with Arimark"
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

## 📖 Component API

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `v-model` (`modelValue`) | `string` | `""` | The raw Markdown content string. |
| `placeholder` | `string` | `"Type '/' for commands"` | Ghost placeholder text for empty blocks. |
| `readonly` | `boolean` | `false` | Sets the editor to read-only mode. |
| `metadataFormat` | `'frontmatter' \| 'bracket'` | `'frontmatter'` | Serialization format for document title and tags. |

### Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `update:modelValue` | `string` | Emitted whenever document content changes. |
| `save` | `string` | Emitted when user presses `Ctrl+S` or `Cmd+S`. |
| `title-change` | `string` | Emitted with current title string (`"Untitled Note"` if empty). |
| `tags-change` | `string[]` | Emitted whenever tags are added or removed. |

---

## 🎨 Theming & Customization

Arimark comes with sensible default colors and automatically respects your host application's CSS variables. You can easily override colors by defining:

```css
:root {
  /* Common app variables */
  --text-main: #0f172a;
  --bg-main: #ffffff;
  --bg-muted: #f8fafc;
  --text-muted: #64748b;
  --border-subtle: #e2e8f0;
  --action-primary: #3b82f6;
  --action-hover: #2563eb;
  --action-danger: #ef4444;

  /* Or Arimark-specific tokens */
  --arimark-font: 'Inter', system-ui, sans-serif;
  --arimark-action-primary: #8b5cf6;
}
```

---

## 🛠️ Local Development

To contribute or test locally:

```bash
# 1. Clone repository
git clone https://github.com/arimaone/arimark.git
cd arimark

# 2. Install dependencies
npm install

# 3. Start the interactive playground
npm run dev

# 4. Build library distribution
npm run build
```

---

## 📄 License

[MIT](LICENSE) © 2026 Arima
