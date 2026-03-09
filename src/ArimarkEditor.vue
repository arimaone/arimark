<script setup>
import { onMounted, onUnmounted, ref, watch, h, render } from "vue";
import { Crepe } from "@milkdown/crepe";
import { editorViewCtx, prosePluginsCtx, commandsCtx } from "@milkdown/core";
import { listenerCtx } from "@milkdown/plugin-listener";
import { Plugin, PluginKey, TextSelection } from "@milkdown/prose/state";
import { $nodeSchema, $command } from "@milkdown/utils";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "/" },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "save", "title-change", "tags-change"]);

const editorContainer = ref(null);
let crepe = null;

const extractTitle = (markdown) => {
  if (!markdown || !markdown.trim()) return "Untitled Note";
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("tags:")) {
      let title = trimmed.replace(/^#+\s+/, "").trim();
      if (title && title !== "<br />" && title !== "<br>") return title;
    }
  }
  return "Untitled Note";
};

// --- 1. Structured Metadata Nodes & Commands ---

const titleNode = $nodeSchema("title", () => ({
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [{ tag: 'h1[data-type="arima-title"]' }],
  toDOM: () => ["h1", { "data-type": "arima-title", class: "arima-title-block" }, 0],
  parseMarkdown: {
    match: (node) => node.type === "heading" && node.depth === 1 && node.data?.isTitle,
    runner: (state, node, type) => {
      state.openNode(type);
      state.next(node.children);
      state.closeNode();
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "title",
    runner: (state, node) => {
      state.addNode("heading", undefined, undefined, { depth: 1, isTitle: true });
      state.next(node.content);
    },
  },
}));

const tagsNode = $nodeSchema("tags", () => ({
  group: "block",
  atom: true,
  attrs: {
    values: { default: [] }
  },
  parseDOM: [{ 
    tag: 'div[data-type="arima-tags"]',
    getAttrs: (dom) => ({ values: dom.dataset.values?.split(",").filter(v => !!v) || [] })
  }],
  toDOM: (node) => {
    const div = document.createElement("div");
    div.dataset.type = "arima-tags";
    div.dataset.values = node.attrs.values.join(",");
    div.classList.add("arima-tags-block");
    return div;
  },
  parseMarkdown: {
    match: (node) => node.type === "paragraph" && node.children?.[0]?.value?.startsWith("tags: "),
    runner: (state, node, type) => {
      const text = node.children[0].value;
      const values = text.replace("tags: ", "").split(",").map(v => v.trim()).filter(v => !!v);
      state.addNode(type, { values });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "tags",
    runner: (state, node) => {
      state.addNode("paragraph", undefined, [{ type: "text", value: `tags: ${node.attrs.values.join(", ")}` }]);
    },
  }
}));

// --- 2. Tags NodeView (Smarter Navigation) ---

class TagsNodeView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    this.dom = document.createElement("div");
    this.dom.classList.add("arima-tags-block");
    this.dom.dataset.type = "arima-tags";
    
    this.render();
  }

  render() {
    this.dom.innerHTML = "";
    
    this.node.attrs.values.forEach((tag, index) => {
      const pill = document.createElement("span");
      pill.classList.add("tag-pill");
      pill.textContent = tag;
      
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "×";
      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.removeTag(index);
      };
      pill.appendChild(removeBtn);
      this.dom.appendChild(pill);
    });

    const input = document.createElement("span");
    input.contentEditable = "true";
    input.classList.add("tag-input-area");
    input.dataset.placeholder = this.node.attrs.values.length === 0 ? "Add tags..." : "";
    
    input.onkeydown = (e) => {
      // 1. Commit tag on Space or Comma
      if (e.key === " " || e.key === ",") {
        e.preventDefault();
        const val = input.textContent.trim().replace(/,/g, "");
        if (val) this.addTag(val);
        input.textContent = "";
      }
      
      // 2. SMART EXIT: Enter commits pending tag and JUMPS OUT to a new block
      if (e.key === "Enter") {
        e.preventDefault();
        const val = input.textContent.trim();
        
        // Commit pending text as tag if exists
        if (val) {
          this.addTag(val, false); // Add tag but don't focus input
        }

        // Create a new paragraph after the tags block and move cursor there
        const { state, dispatch } = this.view;
        const pos = this.getPos() + this.node.nodeSize;
        const tr = state.tr.insert(pos, state.schema.nodes.paragraph.create());
        dispatch(tr.setSelection(TextSelection.create(tr.doc, pos + 1)).scrollIntoView());
        this.view.focus();
      }

      if (e.key === "Backspace" && input.textContent === "" && this.node.attrs.values.length > 0) {
        e.preventDefault();
        this.removeTag(this.node.attrs.values.length - 1);
      }
    };

    this.dom.appendChild(input);
  }

  addTag(tag, refocuseInput = true) {
    const values = [...this.node.attrs.values];
    if (values.length >= 12 || values.includes(tag) || tag.length > 24) return;
    
    const tr = this.view.state.tr.setNodeMarkup(this.getPos(), null, {
      values: [...values, tag]
    });
    this.view.dispatch(tr);
    
    if (refocuseInput) {
      setTimeout(() => {
        const input = this.dom.querySelector(".tag-input-area");
        if (input) input.focus();
      }, 10);
    }
  }

  removeTag(index) {
    const values = [...this.node.attrs.values];
    values.splice(index, 1);
    const tr = this.view.state.tr.setNodeMarkup(this.getPos(), null, {
      values
    });
    this.view.dispatch(tr);
    
    setTimeout(() => {
      const input = this.dom.querySelector(".tag-input-area");
      if (input) input.focus();
    }, 10);
  }

  update(node) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    this.render();
    return true;
  }

  ignoreMutation() { return true; }
  stopEvent() { return true; }
}

// Icons for the slash menu
const titleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5.5C5 6.33 5.67 7 6.5 7H10.5V17.5C10.5 18.33 11.17 19 12 19C12.83 19 13.5 18.33 13.5 17.5V7H17.5C18.33 7 19 6.33 19 5.5C19 4.67 18.33 4 17.5 4H6.5C5.67 4 5 4.67 5 5.5Z"/></svg>`;
const tagsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`;

// --- 3. Commands & Metadata Logic ---

const insertTitleCommand = $command("InsertTitle", (ctx) => () => (state, dispatch) => {
  const { tr, selection } = state;
  let titlePos = -1;
  state.doc.descendants((node, pos) => {
    if (node.type.name === "title") { titlePos = pos; return false; }
  });

  if (titlePos !== -1) {
    if (dispatch) {
      const newSelection = TextSelection.create(state.doc, titlePos + 1);
      dispatch(tr.setSelection(newSelection).scrollIntoView());
      ctx.get(editorViewCtx).focus();
    }
    return true;
  }

  if (dispatch) {
    const { $from } = selection;
    tr.delete($from.before(), $from.after());
    tr.insert(0, titleNode.type(ctx).create());
    const finalTr = tr.setSelection(TextSelection.create(tr.doc, 1));
    dispatch(finalTr.scrollIntoView());
    setTimeout(() => ctx.get(editorViewCtx).focus(), 10);
  }
  return true;
});

const insertTagsCommand = $command("InsertTags", (ctx) => () => (state, dispatch) => {
  const { tr, selection } = state;
  let tagsPos = -1;
  state.doc.descendants((node, pos) => {
    if (node.type.name === "tags") { tagsPos = pos; return false; }
  });

  if (tagsPos !== -1) {
    if (dispatch) {
      const newSelection = TextSelection.create(state.doc, tagsPos);
      dispatch(tr.setSelection(newSelection).scrollIntoView());
      ctx.get(editorViewCtx).focus();
    }
    return true;
  }

  if (dispatch) {
    const { $from } = selection;
    tr.delete($from.before(), $from.after());
    const node = tagsNode.type(ctx).create();
    tr.replaceSelectionWith(node);
    dispatch(tr.scrollIntoView());
    setTimeout(() => {
      const view = ctx.get(editorViewCtx);
      const input = view.dom.querySelector(".tag-input-area");
      if (input) input.focus();
    }, 20);
  }
  return true;
});

const arimarkMetadataPlugin = () => {
  return new Plugin({
    key: new PluginKey("arimark-metadata-sync"),
    props: {
      nodeViews: {
        tags: (node, view, getPos) => new TagsNodeView(node, view, getPos)
      }
    },
    appendTransaction: (transactions, prevState, nextState) => {
      const { doc } = nextState;
      let title = "";
      let tags = [];

      doc.descendants((node) => {
        if (node.type.name === "title") title = node.textContent;
        if (node.type.name === "tags") tags = node.attrs.values;
      });

      if (title || tags.length > 0) {
        emit("title-change", title || "Untitled Note");
        emit("tags-change", tags);
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
      placeholder: { text: props.placeholder },
      [Crepe.Feature.BlockEdit]: {
        buildMenu: (builder) => {
          builder.addGroup("metadata", "Metadata")
            .addItem("title", {
              label: "Title",
              icon: titleIcon,
              onRun: (ctx) => ctx.get(commandsCtx).call(insertTitleCommand.key)
            })
            .addItem("tags", {
              label: "Tags",
              icon: tagsIcon,
              onRun: (ctx) => ctx.get(commandsCtx).call(insertTagsCommand.key)
            });
        }
      }
    }
  });

  crepe.editor.config((ctx) => {
    const listener = ctx.get(listenerCtx);
    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      if (markdown !== prevMarkdown) {
        emit("update:modelValue", markdown);
      }
    });

    ctx.update(prosePluginsCtx, (prev) => [
      ...prev, 
      arimarkMetadataPlugin()
    ]);
  })
  .use(titleNode)
  .use(tagsNode)
  .use(insertTitleCommand)
  .use(insertTagsCommand);

  await crepe.create();

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
