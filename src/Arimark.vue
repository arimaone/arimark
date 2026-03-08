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

/* 3. Slash Menu - Arima Precision Alignment */
.arimark-crepe-host .milkdown-slash-menu {
  @apply bg-surfaceMain border border-borderSubtle rounded-[6px] font-sans !important;
  background-color: var(--bg-main) !important;
  border: 1px solid var(--border-subtle) !important;
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.2) !important;
  padding: 4px !important;
  min-width: 200px !important; 
  z-index: 1000 !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-groups {
  padding: 0 2px 2px !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-groups .menu-group h6 {
  @apply text-[11px] font-bold text-textMuted uppercase tracking-wider px-2 py-1.5 !important;
  color: var(--text-muted) !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li {
  @apply flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] cursor-pointer transition-colors !important;
  color: var(--text-main) !important;
  min-width: unset !important;
  height: 32px !important; 
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active,
.arimark-crepe-host .milkdown-slash-menu .menu-group li:hover {
  background-color: var(--bg-muted) !important;
}

/* Icon Precision Fix: Overriding Crepe's hardcoded SVG weights */
.arimark-crepe-host .milkdown-slash-menu .menu-group li svg {
  @apply w-[18px] h-[18px] !important; 
  fill: var(--text-muted) !important;
  color: var(--text-muted) !important;
  /* Nuclear suppression of heavy paths */
  stroke: none !important;
  opacity: 0.6;
  transition: all 0.2s ease;
}

/* Ensure paths themselves are not thick */
.arimark-crepe-host .milkdown-slash-menu .menu-group li svg path {
  fill: currentColor !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li > span {
  @apply text-[13px] !important;
  line-height: 1 !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active svg,
.arimark-crepe-host .milkdown-slash-menu .menu-group li:hover svg {
  fill: var(--action-primary) !important;
  color: var(--action-primary) !important;
  opacity: 1;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active > span {
  @apply text-actionPrimary font-medium !important;
}

/* 4. Block Handles Alignment */
.arimark-crepe-host .milkdown-block-handle .operation-item {
  @apply rounded-[4px] transition-colors !important;
  width: 28px !important;
  height: 28px !important;
}

.arimark-crepe-host .milkdown-block-handle .operation-item svg {
  @apply w-[18px] h-[18px] !important;
  fill: var(--text-muted) !important;
  opacity: 0.25;
}

.arimark-crepe-host .milkdown-block-handle .operation-item:hover svg {
  fill: var(--action-primary) !important;
  opacity: 1;
}

/* 5. Ghost Placeholder */
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
