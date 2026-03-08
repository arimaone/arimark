<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Crepe } from "@milkdown/crepe";
import { editorViewCtx } from "@milkdown/core";
import { listenerCtx } from "@milkdown/plugin-listener";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Start writing..." },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "save", "title-change"]);

const editorContainer = ref(null);
let crepe = null;

const extractTitle = (markdown) => {
  if (!markdown || !markdown.trim()) return "Untitled Note";
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    const title = trimmed.replace(/^#+\s+/, "").trim();
    if (title && title !== "<br />" && title !== "<br>") return title;
  }
  return "Untitled Note";
};

// Optimized Focus Trigger
const forceFocus = () => {
  if (!crepe || props.readonly) return;
  try {
    crepe.editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      if (view) {
        view.focus();
        console.log("Arimark: Focus acquired successfully.");
      }
    });
  } catch (e) {
    console.warn("Arimark: Focus attempt failed, will retry.");
  }
};

onMounted(async () => {
  if (!editorContainer.value) return;

  // 1. Initialize Crepe
  crepe = new Crepe({
    root: editorContainer.value,
    defaultValue: props.modelValue,
    features: {
      [Crepe.Feature.BlockEdit]: true,
      [Crepe.Feature.Placeholder]: true,
      [Crepe.Feature.Toolbar]: false,
    },
    featureConfigs: {
      placeholder: {
        text: props.placeholder,
      }
    }
  });

  // 2. Add Listeners
  crepe.editor.config((ctx) => {
    const listener = ctx.get(listenerCtx);
    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      if (markdown !== prevMarkdown) {
        emit("update:modelValue", markdown);
        emit("title-change", extractTitle(markdown));
      }
    });
  });

  // 3. Create
  await crepe.create();

  // 4. Robust Multi-stage Focus
  forceFocus();
  setTimeout(forceFocus, 100);
  setTimeout(forceFocus, 500);

  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  if (crepe) {
    crepe.destroy();
  }
  window.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    emit("save", props.modelValue);
  }
};

watch(() => props.modelValue, (newVal) => {
  // Safe sync for external updates
});
</script>

<template>
  <div class="arimark-editor-wrapper">
    <div ref="editorContainer" class="arimark-crepe-host"></div>
  </div>
</template>

<style>
.arimark-crepe-host {
  min-height: 70vh;
  width: 100%;
}
</style>
