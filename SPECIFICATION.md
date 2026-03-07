# Arimark Specification

## Document Metadata
- Service name: `arimark`
- Layer: `components/style` (Component Library)
- Status: `active`
- Spec version: `0.1.0`
- Last updated: 2026-03-07
- Owner: `Arima Product Team`

## 1. Purpose
Arimark is the canonical, block-based markdown editor for the Arima ecosystem. It provides a "no compromise" writing experience, blending the simplicity of Markdown with the rich interactions of a modern block editor. It is designed to be the "Soul of Expression" for all Arima applications.

## 2. Product Decisions (Locked)
- **Engine:** Built on Milkdown (MIT) for truly open-source, markdown-first editing.
- **Aesthetic:** Medium.com style. Borderless, centered, and distraction-free.
- **Typography:** `Source Sans 3` is the absolute standard for all blocks.
- **Save Logic:** No explicit save button. Implementation must support `Ctrl/Cmd+S` and debounced autosave.
- **Metadata:** The first line/block of any document is programmatically treated as the "Title".

## 3. Scope Boundaries and Roadmap
- **v0.1.0:** Core Milkdown integration, Medium-style skin, Slash Commands, and Title extraction.
- **v0.2.0:** Support for Arima-specific blocks (SAM reports, Feed snippets).
- **v0.3.0:** Collaborative editing support (Yjs integration).

## 4. High-Level Architecture
Arimark is a Vue 3 component library that wraps the Milkdown engine. 
- **Internal:** Milkdown + ProseMirror.
- **Styling:** UnoCSS for zero-runtime CSS overhead.
- **Contract:** Communicates via raw Markdown strings (`v-model`).

## 5. API Surface
### `<Arimark />` Component
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `modelValue` | `String` | `""` | The markdown content. |
| `placeholder` | `String` | `"Start writing..."` | Placeholder for empty state. |
| `readonly` | `Boolean` | `false` | Disable editing. |

### Events
- `@update:modelValue`: Emitted on every change.
- `@save`: Emitted on `Ctrl/Cmd+S`.
- `@title-change`: Emitted when the first line (Title) changes.

## 6. Auth, Tenant Isolation, Authorization
Arimark is a UI component; it inherits the security and tenant context of the host application (e.g., the Notes service).

## 7. Data Model
Arimark operates on **Markdown (GFM)**. 
- **Structure:** Hierarchical blocks.
- **Title Extraction:** `document.firstChild.textContent`.

## 8. Security Controls
- **XSS Prevention:** All HTML output from Markdown must be sanitized before rendering (handled by Milkdown core).
- **Injection:** Only GFM-compliant markdown is processed.

## 9. Observability
- **Performance:** Editor initialization and "Time to Interactive" (TTI) must be tracked in the browser console in dev mode.

## 10. Deployment and Runtime
- **Distribution:** Consumed as a workspace package (`@arima/arimark`).
- **Runtime:** Vue 3.x.

## 11. Configuration
Style overrides are handled via UnoCSS utility classes passed to the component container.

## 12. Testing Strategy
- **Unit Tests:** Markdown parsing and Title extraction logic.
- **E2E Tests:** Verification of block creation and slash command responsiveness.

## 13. Rollout Plan
- **Phase 1:** Integration into the Notes application.
- **Phase 2:** Adoption in SAM and Feed services.

## 14. Document Governance (Mandatory)
- Any behavior/API/schema change in Arimark must update `SPECIFICATION.md` in the same PR.
- Versioning follows Semantic Versioning (SemVer).

## 15. Spec Changelog
- **0.1.0 (2026-03-07):** Initial specification for the Arimark Standard.
