<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { Crepe } from "@milkdown/crepe";
import { editorViewCtx, prosePluginsCtx } from "@milkdown/core";
import { listenerCtx } from "@milkdown/plugin-listener";
import { Plugin, PluginKey } from "@milkdown/prose/state";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "/" },
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

// 1. Default Heading 1 Enforcement
const arimarkDefaultH1Plugin = () => {
  return new Plugin({
    key: new PluginKey("arimark-default-h1"),
    appendTransaction: (transactions, prevState, nextState) => {
      const { doc, tr } = nextState;
      if (doc.childCount === 1 && doc.firstChild.type.name === "paragraph" && doc.firstChild.content.size === 0) {
        const headingType = nextState.schema.nodes.heading;
        if (headingType) return tr.setNodeMarkup(0, headingType, { level: 1 });
      }
      return null;
    }
  });
};

onMounted(async () => {
  if (!editorContainer.value) return;

  crepe = new Crepe({
    root: editorContainer.value,
    defaultValue: props.modelValue,
    features: {
      [Crepe.Feature.BlockEdit]: true,
      [Crepe.Feature.Placeholder]: true,
      [Crepe.Feature.Toolbar]: true,
    },
    featureConfigs: {
      placeholder: { text: props.placeholder }
    }
  });

  crepe.editor.config((ctx) => {
    const listener = ctx.get(listenerCtx);
    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      if (markdown !== prevMarkdown) {
        emit("update:modelValue", markdown);
        emit("title-change", extractTitle(markdown));
      }
    });

    ctx.update(prosePluginsCtx, (prev) => [
      ...prev, 
      arimarkDefaultH1Plugin()
    ]);
  });

  await crepe.create();

  if (!props.modelValue || !props.modelValue.trim()) {
    crepe.editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      const headingType = view.state.schema.nodes.heading;
      if (headingType && view.state.doc.firstChild.type.name === "paragraph") {
        view.dispatch(view.state.tr.setNodeMarkup(0, headingType, { level: 1 }));
      }
    });
  }

  const forceFocus = () => {
    crepe?.editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      if (view && !props.readonly) view.focus();
    });
  };
  setTimeout(forceFocus, 100);

  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  if (crepe) crepe.destroy();
  window.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    emit("save", props.modelValue);
  }
};
</script>

<template>
  <div class="arimark-editor-wrapper text-textMain">
    <div ref="editorContainer" class="arimark-crepe-host"></div>
  </div>
</template>

<style>
.arimark-crepe-host {
  min-height: 70vh;
  width: 100%;
}
</style>
