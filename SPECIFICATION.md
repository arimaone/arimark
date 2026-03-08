# Arimark Specification

## Document Metadata
- Service name: `arimark`
- Layer: `components/style` (Component Library)
- Status: `active`
- Spec version: `0.3.1`
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
- **UX Law:** Placeholders must vanish immediately upon focus to maintain a pure canvas feel.
- **UX Law:** Placeholder must have an opacity of 0.5.
- **UX Law:** Slash Commands (`/`) provide an intuitive way to create rich content blocks.
- **UX Law:** Automatic Focus must be guaranteed upon editor initialization.
- **UI Law:** Navigation elements (Breadcrumbs) must be fluid and free of layout shifts during content updates.
- **UI Law:** Nuclear Reset: All library-provided outlines, borders, and shadows must be suppressed at the source.

## 3. Scope Boundaries and Roadmap
- **v0.1.0:** Initial concept and headless Milkdown experiment.
- **v0.2.0:** Manual slash menu implementation.
- **v0.3.0:** Transition to **Crepe Engine** for enterprise-grade stability.
- **v0.3.1:** Refined Crepe UI Skin and robust Focus management.

## 4. High-Level Architecture
Arimark is a Vue 3 component library that wraps the Milkdown Crepe engine. 
- **Internal:** Milkdown Crepe + ProseMirror.
- **Styling:** FULL import of Crepe Common Layout + Arima "Nuclear" Overrides.
- **Contract:** Communicates via raw Markdown strings (`v-model`).

## 15. Spec Changelog
- **0.3.1 (2026-03-07):** Added full Crepe layout styles and multi-stage focus logic.
- **0.3.0 (2026-03-07):** Major architectural pivot to Milkdown Crepe for increased stability.
- **0.2.5 (2026-03-07):** Reverted branding sovereignty to standard library classes for maximum stability.
...
