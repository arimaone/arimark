<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Milkdown, useEditor } from "@milkdown/vue";
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx, EditorViewReady, prosePluginsCtx } from "@milkdown/core";
import { gfm } from "@milkdown/preset-gfm";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";
import { indent } from "@milkdown/plugin-indent";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { Plugin, PluginKey } from "@milkdown/prose/state";
import { Decoration, DecorationSet } from "@milkdown/prose/view";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Start writing your masterpiece..." },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "save", "title-change"]);

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

// Custom Arima Placeholder Plugin
const arimarkPlaceholderPlugin = (text) => {
  return new Plugin({
    key: new PluginKey("arimark-placeholder"),
    props: {
      decorations: (state) => {
        const { doc } = state;
        if (doc.childCount === 1 && doc.firstChild.isTextblock && doc.firstChild.content.size === 0) {
          const placeholder = document.createElement("span");
          placeholder.classList.add("placeholder");
          placeholder.textContent = text;
          return DecorationSet.create(doc, [Decoration.widget(1, placeholder)]);
        }
        return DecorationSet.empty;
      },
    },
  });
};

const { get, loading } = useEditor((root) => {
  const editor = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, props.modelValue);
      ctx.set(editorViewOptionsCtx, {
        editable: () => !props.readonly,
      });
      
      ctx.update(prosePluginsCtx, (prev) => [...prev, arimarkPlaceholderPlugin(props.placeholder)]);
    })
    .config((ctx) => {
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
          emit("update:modelValue", markdown);
          emit("title-change", extractTitle(markdown));
        }
      });
    })
    .use(commonmark)
    .use(gfm)
    .use(history)
    .use(indent)
    .use(listener);

  return editor;
});

// Robust Focus Logic
const tryFocus = () => {
  const editor = get();
  if (!editor) return false;
  
  const view = editor.action((ctx) => ctx.get(editorViewOptionsCtx).view);
  if (view && !props.readonly) {
    view.focus();
    return true;
  }
  return false;
};

let focusInterval = null;
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  
  // Try focusing multiple times to account for rendering delays
  let attempts = 0;
  focusInterval = setInterval(() => {
    if (tryFocus() || attempts > 20) {
      clearInterval(focusInterval);
    }
    attempts++;
  }, 100);
});

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    emit("save", props.modelValue);
  }
};

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  if (focusInterval) clearInterval(focusInterval);
});
</script>

<template>
  <div class="arimark-editor-inner text-textMain">
    <Milkdown class="arimark-editor border-none focus:outline-none" />
  </div>
</template>
