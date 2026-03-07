<script setup>
import { MilkdownProvider } from "@milkdown/vue";
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
      <MilkdownProvider>
        <ArimarkEditor 
          :modelValue="modelValue" 
          :placeholder="placeholder"
          :readonly="readonly"
          @update:modelValue="$emit('update:modelValue', $event)"
          @save="$emit('save', $event)"
          @title-change="$emit('title-change', $event)"
        />
      </MilkdownProvider>
    </div>
  </div>
</template>

<style>
/* Arimark Core Branding Styles */
.arimark-wrapper [contenteditable="true"] {
  @apply outline-none border-none text-[18px] leading-relaxed text-textMain;
  font-family: 'Source Sans 3', sans-serif;
  min-height: 75vh;
  cursor: text;
  outline: none !important;
  box-shadow: none !important;
  position: relative;
}

/* Classic Placeholder Logic: Vanishes on Focus, 0.5 Opacity */
.arimark-wrapper [contenteditable="true"][data-arimark-placeholder]:not(:focus)::before {
  content: attr(data-arimark-placeholder);
  @apply absolute pointer-events-none select-none italic;
  color: var(--text-muted);
  opacity: 0.5;
}

/* Explicitly hide on focus to ensure pure canvas feel */
.arimark-wrapper [contenteditable="true"]:focus::before {
  display: none !important;
}

.arimark-wrapper [contenteditable="true"] p {
  @apply mb-6;
}

.arimark-wrapper [contenteditable="true"] h1 {
  @apply text-[42px] font-bold mb-8 leading-tight text-textMain;
}

.arimark-wrapper [contenteditable="true"] h2 {
  @apply text-[30px] font-bold mb-6 mt-10 leading-tight text-textMain;
}

.arimark-wrapper [contenteditable="true"] h3 {
  @apply text-[24px] font-bold mb-4 mt-8 leading-tight text-textMain;
}

.arimark-wrapper [contenteditable="true"] blockquote {
  @apply border-l-4 border-actionPrimary pl-6 italic text-textMuted my-8 text-[20px];
}

.arimark-wrapper [contenteditable="true"] ul, 
.arimark-wrapper [contenteditable="true"] ol {
  @apply mb-6 pl-6;
}

.arimark-wrapper [contenteditable="true"] li {
  @apply mb-2;
}

/* Cleanup: Absolute suppression of any library UI artifacts */
.arimark-wrapper .milkdown-menu,
.arimark-wrapper .milkdown-toolbar,
.arimark-wrapper .milkdown-slash {
  display: none !important;
}
</style>
