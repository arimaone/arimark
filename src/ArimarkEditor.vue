<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { Milkdown, useEditor } from "@milkdown/vue";
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx, EditorViewReady, prosePluginsCtx } from "@milkdown/core";
import { gfm } from "@milkdown/preset-gfm";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";
import { indent } from "@milkdown/plugin-indent";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { Plugin, PluginKey } from "@milkdown/prose/state";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Start writing..." },
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

// Custom Arima Placeholder Plugin (Attribute-based)
const arimarkPlaceholderPlugin = (text) => {
  return new Plugin({
    key: new PluginKey("arimark-placeholder"),
    props: {
      attributes: (state) => {
        const { doc } = state;
        if (doc.childCount === 1 && doc.firstChild.isTextblock && doc.firstChild.content.size === 0) {
          return { "data-arimark-placeholder": text };
        }
        return { "data-arimark-placeholder": "" };
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
        attributes: {
          class: 'arimark-content',
          spellcheck: 'false'
        }
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

// Ultimate Focus Logic: MutationObserver
let observer = null;
const editorContainer = ref(null);

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  
  // Watch for the contenteditable element to appear
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        const editable = mutation.target.querySelector('[contenteditable="true"]');
        if (editable && !props.readonly) {
          editable.focus();
          console.log("Arimark: Content area detected and focused.");
          observer.disconnect(); // Stop observing once focused
          break;
        }
      }
    }
  });

  if (editorContainer.value) {
    observer.observe(editorContainer.value, { childList: true, subtree: true });
  }
});

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    emit("save", props.modelValue);
  }
};

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  if (observer) observer.disconnect();
});
</script>

<template>
  <div ref="editorContainer" class="arimark-editor-inner text-textMain">
    <Milkdown class="arimark-wrapper border-none focus:outline-none" />
  </div>
</template>
