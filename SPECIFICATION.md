# Arimark Specification

## Document Metadata
- Service name: `arimark`
- Layer: `components/style` (Component Library)
- Status: `active`
- Spec version: `0.3.7`
- Last updated: 2026-03-07
- Owner: `Arima Product Team`

## 1. Purpose
Arimark is the canonical, block-based markdown editor for the Arima ecosystem. It provides a "no compromise" writing experience, blending the simplicity of Markdown with the rich interactions of a modern block editor. It is designed to be the "Soul of Expression" for all Arima applications.

## 2. Product Decisions (Locked)
- **Engine:** Built on **Milkdown Crepe** (MIT) for maximum stability and predictable block behavior.
- **Aesthetic:** Medium.com style. Borderless, centered, and distraction-free.
- **Typography:** `Source Sans 3` is the absolute standard for all blocks.
- **Save Logic:** No explicit save button. Implementation must support `Ctrl/Cmd+S` and debounced autosave.
- **Metadata:** The first line/block of any document is programmatically treated as the "Title".
- **Structural Law:** The very first line of a document defaults to **Heading 1** upon initialization and remains enforced if the document is cleared.
- **UX Law:** Placeholders must vanish immediately upon focus to maintain a pure canvas feel.
- **UX Law:** Placeholder must have an opacity of 0.5.
- **UX Law:** Default placeholder is `Type '/' for commands` to signify the available command-based interaction.
- **UX Law:** Slash Commands (`/`) provide an intuitive way to create rich content blocks.
- **UX Law:** Automatic Focus must be guaranteed upon editor initialization.
- **UX Law:** Ghost Block Indicators: Subtle icons sit in the **right margin** to provide structural context without interfering with left-side drag handles.
- **UI Law:** Navigation elements (Breadcrumbs) must be fluid and free of layout shifts during content updates.
- **UI Law:** Nuclear Reset: All library-provided outlines, borders, and shadows must be suppressed at the source.
- **UI Law:** Pure Canvas: Surgical removal of internal padding on the content area while preserving menu layouts.

## 15. Spec Changelog
- **0.3.7 (2026-03-07):** Moved Ghost Block Indicators to the right margin to avoid handle conflicts.
- **0.3.6 (2026-03-07):** Updated default placeholder to `Type '/' for commands`.
- **0.3.5 (2026-03-07):** Documented Pure Canvas law (Surgical zero internal padding).
...
