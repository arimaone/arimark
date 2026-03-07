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
/* Arimark Medium-style overrides */
.arimark-editor .ProseMirror {
  @apply outline-none border-none text-[18px] leading-relaxed text-textMain;
  font-family: 'Source Sans 3', sans-serif;
  min-height: 75vh;
  cursor: text;
  outline: none !important;
  box-shadow: none !important;
}

/* Milkdown v7 Placeholder Style */
.arimark-editor .ProseMirror .placeholder {
  @apply text-textMuted pointer-events-none absolute italic;
  font-style: normal;
}

.arimark-editor .ProseMirror p {
  @apply mb-6;
}

.arimark-editor .ProseMirror h1 {
  @apply text-[42px] font-bold mb-8 leading-tight text-textMain;
}

.arimark-editor .ProseMirror h2 {
  @apply text-[30px] font-bold mb-6 mt-10 leading-tight text-textMain;
}

.arimark-editor .ProseMirror h3 {
  @apply text-[24px] font-bold mb-4 mt-8 leading-tight text-textMain;
}

.arimark-editor .ProseMirror blockquote {
  @apply border-l-4 border-actionPrimary pl-6 italic text-textMuted my-8 text-[20px];
}

.arimark-editor .ProseMirror ul, 
.arimark-editor .ProseMirror ol {
  @apply mb-6 pl-6;
}

.arimark-editor .ProseMirror li {
  @apply mb-2;
}

/* Hide Milkdown default elements if any remain */
.arimark-editor .milkdown-menu,
.arimark-editor .milkdown-toolbar {
  display: none !important;
}
</style>
