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

// 1. Default Heading 1 Plugin: Enforces H1 for the first empty line
const arimarkDefaultH1Plugin = () => {
  return new Plugin({
    key: new PluginKey("arimark-default-h1"),
    appendTransaction: (transactions, prevState, nextState) => {
      const { doc, tr } = nextState;
      // Enforcement logic: If doc is empty (one block, paragraph, no content)
      if (doc.childCount === 1 && 
          doc.firstChild.type.name === "paragraph" && 
          doc.firstChild.content.size === 0) {
        const headingType = nextState.schema.nodes.heading;
        if (headingType) {
          return tr.setNodeMarkup(0, headingType, { level: 1 });
        }
      }
      return null;
    }
  });
};

// Optimized Focus Trigger
const forceFocus = () => {
  if (!crepe || props.readonly) return;
  try {
    crepe.editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      if (view) {
        view.focus();
      }
    });
  } catch (e) {}
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
      [Crepe.Feature.Toolbar]: true, // Enabled for floating formatting menu
    },
    featureConfigs: {
      placeholder: {
        text: props.placeholder,
      }
    }
  });

  // 2. Add Listeners and Enforcement Plugins
  crepe.editor.config((ctx) => {
    const listener = ctx.get(listenerCtx);
    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      if (markdown !== prevMarkdown) {
        emit("update:modelValue", markdown);
        emit("title-change", extractTitle(markdown));
      }
    });

    ctx.update(prosePluginsCtx, (prev) => [...prev, arimarkDefaultH1Plugin()]);
  });

  // 3. Create
  await crepe.create();

  // 4. Force initial H1 state if starting fresh
  if (!props.modelValue || !props.modelValue.trim()) {
    crepe.editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      const { state, dispatch } = view;
      const headingType = state.schema.nodes.heading;
      if (headingType && state.doc.firstChild.type.name === "paragraph") {
        dispatch(state.tr.setNodeMarkup(0, headingType, { level: 1 }));
      }
    });
  }

  // 5. Focus
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
