<script setup>
import ArimarkEditor from "./ArimarkEditor.vue";

defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Start writing your masterpiece..." },
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
/* 1. Import Crepe Base Styles (Variables + FULL Layout) */
@import "@milkdown/crepe/theme/common/style.css";
@import "@milkdown/crepe/theme/classic.css";

/* 2. Arima "Nuclear" Reset */
.arimark-crepe-host, 
.arimark-crepe-host *,
.arimark-crepe-host *:focus,
.arimark-crepe-host *:active {
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}

.arimark-crepe-host .milkdown {
  border: none !important;
  background: transparent !important;
}

/* 3. Arima Design Overrides */
.arimark-crepe-host {
  /* Brand Constants */
  --crepe-font-default: 'Source Sans 3', sans-serif !important;
  --crepe-font-title: 'Source Sans 3', sans-serif !important;
  --crepe-color-background: transparent !important;
  
  /* Kill borders at the variable level */
  --crepe-color-outline: transparent !important;
}

.arimark-crepe-host .ProseMirror {
  @apply p-0;
  font-family: 'Source Sans 3', sans-serif !important;
  font-size: 18px !important;
  line-height: 1.6 !important;
  min-height: 70vh;
}

/* Fix the Slash Menu - Give it a proper Arima Box feel */
.arimark-crepe-host .milkdown-slash-menu {
  @apply bg-surfaceMain border border-borderSubtle rounded-[8px] shadow-2xl font-sans !important;
  padding: 8px !important;
  min-width: 280px !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li {
  @apply rounded-[4px] transition-colors !important;
  padding: 10px 12px !important;
}

.arimark-crepe-host .milkdown-slash-menu .menu-group li.active,
.arimark-crepe-host .milkdown-slash-menu .menu-group li:hover {
  @apply bg-surfaceMuted text-actionPrimary !important;
}

/* Ghost Placeholder: 0.5 Opacity */
.arimark-crepe-host .ProseMirror .placeholder {
  @apply text-textMuted pointer-events-none absolute italic;
  opacity: 0.5;
  font-style: normal;
  left: 0;
}

/* Cleanup: Absolute suppression of standard menu artifacts */
.arimark-crepe-host .milkdown-menu,
.arimark-crepe-host .milkdown-toolbar {
  display: none !important;
}
</style>
