<script setup>
import ArimarkEditor from "./ArimarkEditor.vue";

defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Type '/' for commands" },
  readonly: { type: Boolean, default: false },
  metadataFormat: { type: String, default: "frontmatter" }, // 'frontmatter' | 'bracket'
});

defineEmits(["update:modelValue", "save", "title-change", "tags-change"]);
</script>

<template>
  <div class="arimark-container w-full font-sans">
    <div class="w-full">
      <ArimarkEditor 
        :modelValue="modelValue" 
        :placeholder="placeholder"
        :readonly="readonly"
        :metadataFormat="metadataFormat"
        @update:modelValue="$emit('update:modelValue', $event)"
        @save="$emit('save', $event)"
        @title-change="$emit('title-change', $event)"
        @tags-change="$emit('tags-change', $event)"
      />
    </div>
  </div>
</template>

<style>
/* 1. Import Crepe Base Styles */
@import "@milkdown/crepe/theme/common/style.css";
@import "@milkdown/crepe/theme/classic.css";

/* 2. Theme Tokens with Robust Defaults (Overridable by host CSS) */
.arimark-container {
  --arimark-text-main: var(--text-main, #1e293b);
  --arimark-bg-main: var(--bg-main, #ffffff);
  --arimark-bg-muted: var(--bg-muted, #f8fafc);
  --arimark-text-muted: var(--text-muted, #64748b);
  --arimark-border-subtle: var(--border-subtle, #e2e8f0);
  --arimark-action-primary: var(--action-primary, #3b82f6);
  --arimark-action-hover: var(--action-hover, #2563eb);
  --arimark-action-danger: var(--action-danger, #ef4444);
  --arimark-font: var(--font-sans, 'Source Sans 3', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
}

.arimark-crepe-host .milkdown {
  --crepe-color-background: transparent !important;
  --crepe-color-on-background: var(--arimark-text-main) !important;
  --crepe-color-surface: var(--arimark-bg-main) !important;
  --crepe-color-surface-low: var(--arimark-bg-muted) !important;
  --crepe-color-on-surface: var(--arimark-text-main) !important;
  --crepe-color-on-surface-variant: var(--arimark-text-muted) !important;
  --crepe-color-outline: var(--arimark-border-subtle) !important;
  --crepe-color-primary: var(--arimark-action-primary) !important;
  --crepe-color-hover: var(--arimark-bg-muted) !important;
  --crepe-color-selected: var(--arimark-action-hover) !important;
  --crepe-color-inline-area: var(--arimark-bg-muted) !important;
  
  --crepe-font-default: var(--arimark-font) !important;
  --crepe-font-title: var(--arimark-font) !important;
  
  --crepe-shadow-1: none !important;
  --crepe-shadow-2: none !important;

  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.arimark-crepe-host .milkdown *,
.arimark-crepe-host .milkdown *:focus,
.arimark-crepe-host .milkdown *:active {
  outline: none !important;
  box-shadow: none !important;
}

.arimark-crepe-host .ProseMirror {
  padding: 0 !important;
  color: var(--arimark-text-main) !important;
  background: transparent !important;
  min-height: 70vh;
}

/* 3. Margin Indicators & Responsive Behavior */
.arimark-crepe-host .ProseMirror > * {
  position: relative !important;
}

.arimark-crepe-host .ProseMirror > *::after {
  position: absolute;
  right: -80px; 
  font-size: 0.875rem !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--arimark-text-muted);
  pointer-events: none;
  user-select: none;
  opacity: 0.15;
  transition: all 0.2s ease;
  font-family: var(--arimark-font);
  white-space: nowrap;
}

/* Hide right margin indicators on narrower viewports to avoid horizontal overflow */
@media (max-width: 1024px) {
  .arimark-crepe-host .ProseMirror > *::after {
    display: none !important;
  }
}

/* Sovereign Title Styling */
.arimark-crepe-host .arima-title-block {
  font-size: 2.5rem !important;
  font-weight: 800 !important;
  letter-spacing: -0.02em !important;
  margin-bottom: 2.5rem !important;
  color: var(--arimark-text-main) !important;
  line-height: 1.2 !important;
}

.arimark-crepe-host .ProseMirror > p::after { content: "P"; top: 4px; }
.arimark-crepe-host .ProseMirror > h1::after { content: "H1"; top: 12px; }
.arimark-crepe-host .ProseMirror > h2::after { content: "H2"; top: 10px; }
.arimark-crepe-host .ProseMirror > h3::after { content: "H3"; top: 8px; }
.arimark-crepe-host .ProseMirror > .blockquote::after { content: "QUOTE"; top: 4px; }
.arimark-crepe-host .ProseMirror > .hr::after { content: "DIVIDER"; top: -10px; }
.arimark-crepe-host .ProseMirror > .bullet-list::after { content: "LIST"; top: 4px; }
.arimark-crepe-host .ProseMirror > .ordered-list::after { content: "NUMS"; top: 4px; }
.arimark-crepe-host .ProseMirror > .task-list::after { content: "TASK"; top: 4px; }
.arimark-crepe-host .ProseMirror > .image-block::after { content: "IMAGE"; top: 4px; }
.arimark-crepe-host .ProseMirror > .code-mirror::after { content: "CODE"; top: 4px; }
.arimark-crepe-host .ProseMirror > .table-block::after { content: "TABLE"; top: 4px; }

/* Metadata Node Special Indicators */
.arimark-crepe-host .ProseMirror > .arima-title-block::after { content: "TITLE"; color: var(--arimark-action-primary); opacity: 0.4; top: 1.2rem; }
.arimark-crepe-host .ProseMirror > .arima-tags-block::after { content: "TAGS"; color: var(--arimark-action-primary); opacity: 0.4; top: 1.5rem; }

.arimark-crepe-host .ProseMirror > *:hover::after,
.arimark-crepe-host .ProseMirror > *.ProseMirror-selectednode::after {
  opacity: 0.4 !important;
  color: var(--arimark-action-primary) !important;
}

/* 4. Arima Tags Block Visuals */
.arimark-crepe-host .arima-tags-block {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 24px 0 !important;
  border-top: 1px solid var(--arimark-border-subtle) !important;
  margin-top: 48px !important;
  background: transparent !important;
  min-height: 32px !important;
}

.arimark-crepe-host .arima-tags-block .tag-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 4px 10px !important;
  background-color: var(--arimark-bg-muted) !important;
  border: 1px solid var(--arimark-border-subtle) !important;
  border-radius: 9999px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  color: var(--arimark-text-muted) !important;
  transition: all 0.2s ease !important;
  user-select: none !important;
}

.arimark-crepe-host .arima-tags-block .tag-pill:hover {
  color: var(--arimark-text-main) !important;
  border-color: var(--arimark-action-primary) !important;
  background-color: var(--arimark-bg-main) !important;
}

.arimark-crepe-host .arima-tags-block .tag-pill button {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  cursor: pointer !important;
  font-size: 14px !important;
  line-height: 1 !important;
  color: inherit !important;
  opacity: 0.5 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.arimark-crepe-host .arima-tags-block .tag-pill button:hover {
  opacity: 1 !important;
  color: var(--arimark-action-danger) !important;
}

.arimark-crepe-host .tag-input-area {
  font-size: 13px !important;
  color: var(--arimark-text-main) !important;
  min-width: 120px !important;
  outline: none !important;
  caret-color: var(--arimark-action-primary) !important;
  padding: 4px 0 !important;
}

.arimark-crepe-host .tag-input-area:empty::before {
  content: attr(data-placeholder);
  color: var(--arimark-text-muted) !important;
  opacity: 0.4 !important;
  font-style: italic !important;
  pointer-events: none !important;
}

/* 5. Slash Menu & Formatting Toolbar */
.arimark-crepe-host .milkdown-slash-menu {
  background-color: var(--arimark-bg-main) !important;
  border: 1px solid var(--arimark-border-subtle) !important;
  border-radius: 8px !important;
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.15) !important;
  padding: 4px !important;
  min-width: 200px !important; 
  z-index: 1000 !important;
}

.arimark-crepe-host .milkdown-toolbar {
  background-color: var(--arimark-bg-main) !important;
  border: 1px solid var(--arimark-border-subtle) !important;
  border-radius: 6px !important;
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.15) !important;
  padding: 4px !important;
  gap: 2px !important;
  display: flex !important;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.arimark-crepe-host .milkdown-toolbar[data-show="true"] {
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* 6. Ghost Placeholder */
.arimark-crepe-host .ProseMirror .placeholder {
  color: var(--arimark-text-muted) !important;
  opacity: 0.5 !important;
  font-style: italic !important;
  pointer-events: none !important;
  position: absolute !important;
  left: 0 !important;
}

/* 7. Cleanup */
.arimark-crepe-host .milkdown-menu {
  display: none !important;
}
</style>
