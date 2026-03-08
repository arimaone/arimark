<script setup>
import ArimarkEditor from "./ArimarkEditor.vue";

defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Type '/' for commands" },
  readonly: { type: Boolean, default: false },
});

defineEmits(["update:modelValue", "save", "title-change"]);
</script>

<template>
  <div class="arimark-container w-full font-sans">
    <div class="w-full">
      <ArimarkEditor
        :modelValue="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        @update:modelValue="$emit('update:modelValue', $event)"
        @save="$emit('save', $event)"
        @title-change="$emit('title-change', $event)"
      />
    </div>
  </div>
</template>

<style>
/* 1. Import Crepe Base Styles */
@import "@milkdown/crepe/theme/common/style.css";
@import "@milkdown/crepe/theme/classic.css";

/* 2. Arima Theme Sovereignty */
.arimark-crepe-host .milkdown {
  --crepe-color-background: transparent !important;
  --crepe-color-on-background: var(--text-main) !important;
  --crepe-color-surface: var(--bg-main) !important;
  --crepe-color-surface-low: var(--bg-muted) !important;
  --crepe-color-on-surface: var(--text-main) !important;
  --crepe-color-on-surface-variant: var(--text-muted) !important;
  --crepe-color-outline: var(--border-subtle) !important;
  --crepe-color-primary: var(--action-primary) !important;
  --crepe-color-hover: var(--bg-muted) !important;
  --crepe-color-selected: var(--action-hover) !important;
  --crepe-color-inline-area: var(--bg-muted) !important;

  --crepe-font-default: 'Source Sans 3', sans-serif !important;
  --crepe-font-title: 'Source Sans 3', sans-serif !important;

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
  color: var(--text-main) !important;
  background: transparent !important;
  min-height: 70vh;
}

/* 3. Innovative Typographic Ghost Indicators (Right-Side) */
.arimark-crepe-host .ProseMirror > * {
  position: relative !important;
}

.arimark-crepe-host .ProseMirror > *::after {
  position: absolute;
  right: -80px; /* More space for longer labels */
  font-size: 1rem !important;
  @apply font-bold text-textMuted uppercase tracking-wider pointer-events-none select-none !important;
  opacity: 0.3;
  transition: all 0.2s ease;
  font-family: 'Source Sans 3', sans-serif !important;
  white-space: nowrap;
}

/* Precise Mapping based on real Crepe DOM tags and classes */
.arimark-crepe-host .ProseMirror > p::after { content: "P"; top: 4px; }
.arimark-crepe-host .ProseMirror > h1::after { content: "H1"; top: 12px; }
.arimark-crepe-host .ProseMirror > h2::after { content: "H2"; top: 10px; }
.arimark-crepe-host .ProseMirror > h3::after { content: "H3"; top: 8px; }
.arimark-crepe-host .ProseMirror > blockquote::after { content: "QUOTE"; top: 4px; }
.arimark-crepe-host .ProseMirror > hr::after { content: "DIVIDER"; top: -10px; }
.arimark-crepe-host .ProseMirror > ul::after { content: "BULLET"; top: 4px; }
.arimark-crepe-host .ProseMirror > ol::after { content: "ORDERED"; top: 4px; }
.arimark-crepe-host .ProseMirror > .task-list::after { content: "TASK"; top: 4px; }
.arimark-crepe-host .ProseMirror > .milkdown-image-block::after { content: "IMAGE"; top: 4px; }
.arimark-crepe-host .ProseMirror > .milkdown-code-block::after { content: "CODE"; top: 4px; }
.arimark-crepe-host .ProseMirror > .milkdown-table::after,
.arimark-crepe-host .ProseMirror > .milkdown-table-block::after { content: "TABLE"; top: 4px; }

/* Highlight state */
.arimark-crepe-host .ProseMirror > *:hover::after,
.arimark-crepe-host .ProseMirror > *.ProseMirror-selectednode::after {
  opacity: 0.8 !important;
  color: var(--action-primary) !important;
}

/* 4. Sidebar-Style Slash Menu */
.arimark-crepe-host .milkdown-slash-menu {
  @apply bg-surfaceMain border border-borderSubtle rounded-[6px] font-sans !important;
  background-color: var(--bg-main) !important;
  border: 1px solid var(--border-subtle) !important;
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.2) !important;
  padding: 4px !important;
  min-width: 200px !important;
  z-index: 1000 !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-groups .menu-group h6 {
  @apply text-[11px] font-bold text-textMuted uppercase tracking-wider px-2 py-1.5 !important;
  color: var(--text-muted) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li {
  @apply flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] cursor-pointer transition-colors !important;
  color: var(--text-main) !important;
  height: 32px !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active,
.arimark-crepe-host .milkdown-slash-menu .menu-group li:hover {
  background-color: var(--bg-muted) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li svg {
  @apply w-[18px] h-[18px] !important;
  fill: var(--text-muted) !important;
  stroke: none !important;
  opacity: 0.8;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active svg {
  fill: var(--action-primary) !important;
  opacity: 1;
}

/* 5. Block Handles & Ghost Placeholder */
.arimark-crepe-host .milkdown-block-handle .operation-item svg {
  @apply w-[18px] h-[18px] !important;
  fill: var(--text-muted) !important;
  opacity: 0.3;
}

.arimark-crepe-host .milkdown-block-handle .operation-item:hover svg {
  fill: var(--action-primary) !important;
  opacity: 1;
}

.arimark-crepe-host .ProseMirror .placeholder {
  @apply text-textMuted pointer-events-none absolute italic !important;
  color: var(--text-muted) !important;
  opacity: 0.5 !important;
  left: 0 !important;
}

/* 6. Cleanup */
.arimark-crepe-host .milkdown-menu,
.arimark-crepe-host .milkdown-toolbar {
  display: none !important;
}
</style>
