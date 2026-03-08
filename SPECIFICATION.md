# Arimark Specification

## Document Metadata
- Service name: `arimark`
- Layer: `components/style` (Component Library)
- Status: `active`
- Spec version: `0.3.4`
- Last updated: 2026-03-07
- Owner: `Arima Product Team`

## 1. Purpose
Arimark is the canonical, block-based markdown editor for the Arima ecosystem. It provides a "no compromise" writing experience, blending the simplicity of Markdown with the rich interactions of a modern block editor. It is designed to be the "Soul of Expression" for all Arima applications.

## 2. Product Decisions (Locked)
- **Engine:** Built on **Milkdown Crepe** (MIT) for maximum stability and predictable block behavior.
- **Aesthetic:** Borderless, centered, and distraction-free.
- **Typography:** `Source Sans 3` is the absolute standard for all blocks.
- **Save Logic:** No explicit save button. Implementation must support `Ctrl/Cmd+S` and debounced autosave.
- **Metadata:** The first line/block of any document is programmatically treated as the "Title".
- **Structural Law:** The very first line of a document defaults to **Heading 1** upon initialization and remains enforced if the document is cleared.
- **UX Law:** Placeholders must vanish immediately upon focus to maintain a pure canvas feel.
- **UX Law:** Placeholder must have an opacity of 0.5.
- **UX Law:** Default placeholder is always `/` to signify the available command-based interaction.
- **UX Law:** Slash Commands (`/`) provide an intuitive way to create rich content blocks.
- **UX Law:** Automatic Focus must be guaranteed upon editor initialization.
- **UI Law:** Navigation elements (Breadcrumbs) must be fluid and free of layout shifts during content updates.
- **UI Law:** Nuclear Reset: All library-provided outlines, borders, and shadows must be suppressed at the source.

## 15. Spec Changelog
- **0.3.4 (2026-03-07):** Guaranteed Heading 1 transformation on initial editor creation.
- **0.3.3 (2026-03-07):** Simplified placeholder logic to always display `/`.
- **0.3.2 (2026-03-07):** Enforced Heading 1 as the default block for the first empty line.
- **0.3.1 (2026-03-07):** Added full Crepe layout styles and multi-stage focus logic.
...
