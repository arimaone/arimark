<script setup>
import { ref } from "vue";
import { Arimark } from "../src/index.js";

const initialDoc = `---
title: "Welcome to Arimark"
description: "A modern block editor for Vue 3."
author: "Arima"
tags: ["vue3", "milkdown", "markdown"]
---

Arimark is a modern, block-based Markdown editor made for the Vue 3 ecosystem.

## Features
- **Native Metadata Blocks:** Titles and tags live directly inside the document.
- **Universal Frontmatter:** Saves cleanly as standard YAML frontmatter for Obsidian, Astro, and VitePress.
- **Slash Commands:** Type \`/\` to quickly insert headings, lists, tables, code blocks, or metadata.
- **Distraction-Free:** Pure canvas design inspired by Medium and Notion.

Try editing this note or pressing **Cmd+S / Ctrl+S** to trigger a save!
`;

const content = ref(initialDoc);
const currentTitle = ref("Welcome to Arimark");
const currentTags = ref(["vue3", "milkdown", "markdown"]);
const lastSaved = ref(null);
const metadataFormat = ref("frontmatter");
const readonly = ref(false);

const handleTitleChange = (title) => {
  currentTitle.value = title;
};

const handleTagsChange = (tags) => {
  currentTags.value = tags;
};

const handleSave = (markdown) => {
  lastSaved.value = new Date().toLocaleTimeString();
  console.log("Save triggered:", markdown);
};

const resetDoc = () => {
  content.value = initialDoc;
};
</script>

<template>
  <div class="playground-layout">
    <!-- Header -->
    <header class="playground-header">
      <div class="header-left">
        <h1 class="logo">arimark <span class="badge">Playground</span></h1>
      </div>
      <div class="header-controls">
        <label class="control-item">
          <span>Format:</span>
          <select v-model="metadataFormat">
            <option value="frontmatter">YAML Frontmatter</option>
            <option value="bracket">Legacy Brackets</option>
          </select>
        </label>
        <label class="control-item">
          <input type="checkbox" v-model="readonly" />
          <span>Read-Only</span>
        </label>
        <button class="btn btn-secondary" @click="resetDoc">Reset</button>
        <div v-if="lastSaved" class="save-indicator">
          Saved at {{ lastSaved }}
        </div>
      </div>
    </header>

    <!-- Main Workspace -->
    <main class="playground-body">
      <!-- Editor Pane -->
      <section class="editor-pane">
        <div class="editor-container">
          <Arimark
            v-model="content"
            :readonly="readonly"
            :metadata-format="metadataFormat"
            @title-change="handleTitleChange"
            @tags-change="handleTagsChange"
            @save="handleSave"
          />
        </div>
      </section>

      <!-- Output / Metadata Pane -->
      <aside class="output-pane">
        <div class="panel-section">
          <h3>Live State Inspector</h3>
          <div class="inspector-item">
            <strong>Title Event:</strong>
            <code>{{ currentTitle || "(none)" }}</code>
          </div>
          <div class="inspector-item">
            <strong>Tags Event:</strong>
            <div class="tags-preview">
              <span v-for="tag in currentTags" :key="tag" class="preview-tag">
                #{{ tag }}
              </span>
              <span v-if="currentTags.length === 0" class="muted-text">No tags</span>
            </div>
          </div>
        </div>

        <div class="panel-section flex-grow">
          <h3>Raw Markdown Output (v-model)</h3>
          <textarea
            class="markdown-output"
            readonly
            :value="content"
          ></textarea>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.playground-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8fafc;
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 2px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.875rem;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #475569;
}

.control-item select {
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
  font-size: 0.875rem;
}

.btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #334155;
  border-color: #cbd5e1;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}

.save-indicator {
  font-size: 0.75rem;
  color: #16a34a;
  font-weight: 600;
}

.playground-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-pane {
  flex: 1;
  overflow-y: auto;
  padding: 48px 32px;
  background: #ffffff;
  display: flex;
  justify-content: center;
}

.editor-container {
  width: 100%;
  max-width: 760px;
}

.output-pane {
  width: 440px;
  border-left: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
}

.panel-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel-section.flex-grow {
  flex: 1;
  min-height: 0;
}

.panel-section h3 {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.inspector-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875rem;
  color: #334155;
}

.inspector-item code {
  background: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8125rem;
}

.tags-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preview-tag {
  background: #e0e7ff;
  color: #4338ca;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
}

.muted-text {
  color: #94a3b8;
  font-style: italic;
  font-size: 0.8125rem;
}

.markdown-output {
  width: 100%;
  flex: 1;
  resize: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.5;
  padding: 12px;
  background: #0f172a;
  color: #f1f5f9;
  border: 1px solid #334155;
  border-radius: 8px;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
