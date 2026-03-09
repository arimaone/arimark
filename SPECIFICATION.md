# Arimark Specification

## Document Metadata
- Service name: `arimark`
- Layer: `components/style` (Component Library)
- Status: `active`
- Spec version: `0.5.0`
- Last updated: 2026-03-07
- Owner: `Arima Product Team`

## 1. Purpose
Arimark is the canonical, block-based markdown editor for the Arima ecosystem. It provides a "no compromise" writing experience, blending the simplicity of Markdown with the rich interactions of a modern block editor. It is designed to be the "Soul of Expression" for all Arima applications.

## 2. Product Decisions (Locked)
- **Engine:** Built on **Milkdown Crepe** (MIT) for maximum stability and predictable block behavior.
- **Aesthetic:** Medium.com style. Borderless, centered, and distraction-free.
- **Typography:** `Source Sans 3` is the absolute standard for all blocks.
- **Save Logic:** No explicit save button. Implementation must support `Ctrl/Cmd+S` and debounced autosave.
- **Metadata Sovereignty:** Titles and Tags are no longer external form fields. They are **Native Block Nodes** within the document.
- **Structural Law (Title):** The `/title` command creates a unique, plain-text heading block. Only one allowed per document.
- **Structural Law (Tags):** The `/tags` command creates a unique, pill-based metadata block. Only one allowed per document.
- **UX Law:** Placeholders must vanish immediately upon focus to maintain a pure canvas feel.
- **UX Law:** Placeholder must have an opacity of 0.5.
- **UX Law:** Default placeholder is `Type '/' for commands`.
- **UX Law:** Slash Commands (`/`) provide an intuitive way to create rich content and metadata blocks.
- **UX Law:** Automatic Focus must be guaranteed upon editor initialization.
- **UX Law:** Ghost Block Indicators: Subtle typographic labels sit in the **right margin** to provide structural context.
- **UI Law:** Navigation elements (Breadcrumbs) must be fluid and free of layout shifts during content updates.
- **UI Law:** Nuclear Reset: All library-provided outlines, borders, and shadows must be suppressed at the source.
- **UI Law:** Pure Canvas: Surgical removal of internal padding on the content area while preserving menu layouts.

## 3. Scope Boundaries and Roadmap
- **v0.1.0 - v0.4.0:** Headless and Crepe engine stabilization, UI refinements.
- **v0.5.0:** Transition to **Structured Document Engine** with native Title and Tags nodes.

## 4. High-Level Architecture
Arimark is a Vue 3 component library that wraps the Milkdown Crepe engine. 
- **Internal:** Milkdown Crepe + ProseMirror + Custom Metadata Nodes.
- **Styling:** FULL import of Crepe Common Layout + Arima "Nuclear" Overrides.
- **Contract:** Communicates via raw Markdown strings (`v-model`). Emits structured metadata events.

## 15. Spec Changelog
- **0.5.0 (2026-03-07):** Evolutionary pivot: `/title` and `/tags` are now native document nodes (Singletons). Removed external form-based metadata logic.
- **0.4.2 (2026-03-07):** Removed emoji logic to focus on core performance.
- **0.4.1 (2026-03-07):** Integrated Emoji Autocomplete functionality.
- **0.4.0 (2026-03-07):** Integrated sleek Floating Formatting Menu for selection-based editing.
...
