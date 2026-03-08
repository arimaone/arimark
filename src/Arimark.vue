<script setup>
import ArimarkEditor from "./ArimarkEditor.vue";

defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Press \"/\" to start" },
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
/* We target the .milkdown class to override its internal variable defaults */
.arimark-crepe-host .milkdown {
  /* Arima Core Variables Integration */
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

  /* Typography Sovereignty */
  --crepe-font-default: 'Source Sans 3', sans-serif !important;
  --crepe-font-title: 'Source Sans 3', sans-serif !important;
  --crepe-font-code: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;

  /* Kill Shadows */
  --crepe-shadow-1: none !important;
  --crepe-shadow-2: none !important;

  /* Force Layout Stability */
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* 3. Deep Interaction Resets */
.arimark-crepe-host .milkdown *,
.arimark-crepe-host .milkdown *:focus,
.arimark-crepe-host .milkdown *:active {
  outline: none !important;
  box-shadow: none !important;
}

/* SURGICAL FIX: Remove only the ProseMirror padding */
.arimark-crepe-host .ProseMirror {
  padding: 0 !important;
  color: var(--text-main) !important;
  background: transparent !important;
  min-height: 70vh;
}

/* 4. Arima Branded Slash Menu */
.arimark-crepe-host .milkdown-slash-menu {
  @apply bg-surfaceMain border border-borderSubtle rounded-[8px] font-sans !important;
  background-color: var(--bg-main) !important;
  border: 1px solid var(--border-subtle) !important;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-groups .menu-group h6 {
  @apply text-[10px] font-bold text-textMuted uppercase tracking-widest px-3 py-2 border-b border-borderSubtle/20 mb-1 !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li {
  @apply transition-colors !important;
  color: var(--text-main) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active,
.arimark-crepe-host .milkdown-slash-menu .menu-group li:hover {
  background-color: var(--bg-muted) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li svg {
  color: var(--text-muted) !important;
  fill: var(--text-muted) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active svg,
.arimark-crepe-host .milkdown-slash-menu .menu-group li:hover svg {
  color: var(--action-primary) !important;
  fill: var(--action-primary) !important;
}

/* 5. Block Handles & Ghost Placeholder */
.arimark-crepe-host .milkdown-block-handle .operation-item svg {
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
