# Arimark Specification

## Document Metadata
- Service name: `arimark`
- Layer: `components/style` (Component Library)
- Status: `active`
- Spec version: `0.3.8`
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
- **UX Law:** Ghost Block Indicators: Subtle icons or typographic labels sit in the **right margin** to provide structural context.
- **UX Law:** Ghost indicators must use a subtle opacity threshold (Base: 0.15, Highlight: 0.4) to remain non-distracting.
- **UI Law:** Navigation elements (Breadcrumbs) must be fluid and free of layout shifts during content updates.
- **UI Law:** Nuclear Reset: All library-provided outlines, borders, and shadows must be suppressed at the source.
- **UI Law:** Pure Canvas: Surgical removal of internal padding on the content area while preserving menu layouts.

## 3. Scope Boundaries and Roadmap
- **v0.1.0:** Initial concept and headless Milkdown experiment.
- **v0.2.0:** Manual slash menu implementation.
- **v0.3.0:** Transition to **Crepe Engine** for enterprise-grade stability.
- **v0.3.1:** Refined Crepe UI Skin and robust Focus management.
- **v0.3.7:** Ghost Block Icons and refined brand consistency.
- **v0.3.8:** Refined Ghost Indicator opacity thresholds.

## 4. High-Level Architecture
Arimark is a Vue 3 component library that wraps the Milkdown Crepe engine. 
- **Internal:** Milkdown Crepe + ProseMirror.
- **Styling:** FULL import of Crepe Common Layout + Arima "Nuclear" Overrides.
- **Contract:** Communicates via raw Markdown strings (`v-model`).

## 15. Spec Changelog
- **0.3.8 (2026-03-07):** Subtely reduced Ghost Indicator opacity (Base: 0.15, Highlight: 0.4).
- **0.3.7 (2026-03-07):** Moved Ghost Block Indicators to the right margin to avoid handle conflicts.
- **0.3.6 (2026-03-07):** Updated default placeholder to `Type '/' for commands`.
- **0.3.5 (2026-03-07):** Documented Pure Canvas law (Surgical zero internal padding).
- **0.3.4 (2026-03-07):** Guaranteed Heading 1 transformation on initial editor creation.
- **0.3.3 (2026-03-07):** Simplified placeholder logic to always display `/`.
- **0.3.2 (2026-03-07):** Enforced Heading 1 as the default block for the first empty line.
- **0.3.1 (2026-03-07):** Added full Crepe layout styles and multi-stage focus logic.
- **0.3.0 (2026-03-07):** Major architectural pivot to Milkdown Crepe for increased stability.
- **0.2.5 (2026-03-07):** Reverted branding sovereignty to standard library classes for maximum stability.
- **0.2.4 (2026-03-07):** Fixed command object mapping and atomic transaction for slash commands.
- **0.2.3 (2026-03-07):** Refined slash command execution using explicit keys and atomic transactions.
- **0.2.2 (2026-03-07):** Implemented Portal rendering for Slash Menu to fix positioning issues.
- **0.2.1 (2026-03-07):** Integrated Branding Sovereignty law (Class Eraser) and refined Slash Menu integration.
- **0.2.0 (2026-03-07):** Integrated Slash Command Menu for block-based editing.
- **0.1.5 (2026-03-07):** Reverted placeholder law: must vanish on focus. Kept 0.5 opacity.
- **0.1.4 (2026-03-07):** Refined placeholder positioning logic to avoid layout interference.
- **0.1.3 (2026-03-07):** Reverted placeholder alignment while maintaining 0.5 opacity.
- **0.1.2 (2026-03-07):** Refined placeholder opacity (0.5) and alignment law (native overlay).
- **0.1.1 (2026-03-07):** Refined placeholder visibility law and breadcrumb stability.
- **0.1.0 (2026-03-07):** Initial specification for the Arimark Standard.
