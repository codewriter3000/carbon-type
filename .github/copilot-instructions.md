# Copilot instructions for this repository

## Product purpose

This repository builds a word processing application with these priorities in this exact order:

1. ADA accessibility and WCAG-aligned usability.
2. College research paper workflows.
3. Dark-theme-first user experience.
4. Stable document editing and export fidelity.
5. Clean architecture that supports parallel agent work.

This is not a generic note-taking app, a marketing-document tool, or a novelty editor.
Optimize for students, researchers, and serious long-form writing sessions.

## Core product principles

- Accessibility is a first-order product requirement, not a later audit.
- Dark mode is the primary visual target. Light mode is still required, but dark mode drives design decisions first.
- Research-paper features are core product behavior, not optional polish.
- Structured document semantics matter more than superficial formatting.
- Predictability and recoverability are more important than cleverness.
- Never introduce a feature that risks silent data loss.
- Prefer maintainable, explicit implementations over magical abstractions.

## Primary user workflows

Assume the main user wants to do most or all of the following:

- Write a multi-page college research paper.
- Use headings and an outline to organize sections.
- Insert and manage citations.
- Add footnotes or endnotes.
- Generate or maintain a bibliography or works-cited section.
- Navigate entirely by keyboard if needed.
- Use screen readers or other assistive technology.
- Work comfortably for long periods in dark mode.
- Export to print-ready formats such as PDF and common interchange formats such as DOCX or Markdown.
- Recover work safely after refreshes, interruptions, or crashes.

## Accessibility rules

Accessibility requirements are non-negotiable.

- Prefer semantic HTML over ARIA whenever native elements can do the job.
- Every interactive control must be keyboard reachable and visibly focusable.
- Do not remove focus outlines unless replacing them with a clearly visible accessible alternative.
- All dialogs, menus, popovers, and panels must define focus entry, focus containment when appropriate, and focus exit behavior.
- Escape behavior must be consistent and predictable.
- Do not rely on color alone to communicate state, meaning, errors, or selection.
- All form controls must have accessible labels.
- Use proper heading hierarchy and landmark structure.
- Support reduced-motion preferences.
- Maintain adequate color contrast, especially in dark mode.
- Touch targets must remain usable even if the primary audience is desktop users.
- Screen-reader experience must be considered for editor controls, citations, notes, comments, outline navigation, and export flows.

When implementing UI:
- state the keyboard behavior,
- state the screen-reader implications,
- state any accessibility tradeoffs if they exist.

## Dark-theme-first rules

Dark mode is the default design target for all interface work.

- Start by designing and validating dark mode first.
- Ensure text, icons, carets, selection states, borders, dividers, and focus rings remain readable on dark surfaces.
- Avoid low-contrast muted text.
- Avoid washed-out panel boundaries.
- Avoid relying on subtle grayscale differences that disappear in dark mode.
- Maintain clear selected, active, hovered, focused, disabled, and error states.
- Keep the visual design calm, low-glare, and suitable for long writing sessions.
- Theme tokens should be centralized and consistently applied.
- Light mode should reuse the same semantic token system whenever possible.

## Research-paper-first rules

This application is optimized for academic writing.

Treat the following as core document concepts, not hacks:
- title and subtitle,
- author and course metadata if supported,
- headings and subheadings,
- outline navigation,
- citations,
- footnotes and endnotes,
- bibliography or works-cited structures,
- page numbers,
- page and margin settings,
- section-aware formatting where supported.

When building features, ask:
- Does this help someone write a real research paper?
- Does this preserve structure across save, export, and import?
- Does this reduce formatting errors or repetitive work?

Prefer structured data for citations and bibliography entries instead of plain formatted text whenever possible.

## Editor behavior rules

The editing experience must be stable and predictable.

- Preserve document structure.
- Avoid hidden side effects.
- Make keyboard commands explicit and testable.
- Undo and redo must remain reliable.
- Copy, paste, split, join, selection changes, and formatting commands must behave deterministically.
- Normalize invalid states carefully and minimally.
- Do not couple core editor behavior tightly to cosmetic UI concerns.
- Preserve semantic structure for export and persistence layers.

If a change affects schema, serialization, or command behavior:
- update tests,
- update related docs or notes,
- call out downstream effects on storage and export.

## Persistence and sync rules

User trust depends on reliable saving.

- Never accept silent data loss.
- Autosave must be resilient and understandable.
- Restore behavior after refresh or interruption must be deterministic.
- Store research metadata, document structure, theme preferences, and accessibility preferences as first-class data.
- Versioning and revision behavior should be explicit.
- Migrations must be considered whenever stored structures change.
- Sync and persistence code should favor explicit contracts and recoverable failure modes.

## Export and interoperability rules

Import and export are product features, not afterthoughts.

Preserve as much of the following as practical:
- headings,
- citations,
- footnotes and endnotes,
- bibliography structure,
- page settings,
- page breaks,
- numbering,
- semantic document structure.

When exact fidelity is impossible:
- preserve structure before superficial appearance,
- document the limitation clearly,
- add regression coverage for the expected behavior.

Export-related changes should consider:
- PDF fidelity,
- DOCX compatibility,
- Markdown or plain-text fallback behavior,
- print CSS and print preview,
- round-trip safety where applicable.

## Testing expectations

Every meaningful change should improve confidence.

Prefer tests that verify user-visible behavior and core invariants, especially for:
- keyboard editing,
- accessibility-critical flows,
- autosave and restore,
- schema and serialization,
- citation and bibliography behavior,
- import and export behavior,
- long-document edge cases,
- dark-theme-specific usability regressions.

When fixing a bug, add a regression test whenever practical.
Favor deterministic tests over brittle timing-based tests.

## Coding style guidance

- Prefer clear, maintainable code over clever code.
- Prefer explicit names over short ambiguous names.
- Keep functions and modules focused on one responsibility.
- Reuse existing patterns when they are sound.
- Do not introduce new dependencies without a clear reason.
- Do not create parallel abstractions when an existing one can be extended safely.
- Add concise comments only where intent would otherwise be unclear.
- Avoid large unrelated refactors in feature PRs.
- Keep changes scoped to the task.

## Architecture and parallel work rules

This repository uses specialized agent roles.
Assume work may be performed in parallel by different agents.

Therefore:
- keep module boundaries clear,
- avoid editing unrelated files,
- document contract changes,
- note merge risks early,
- separate architecture changes from cosmetic cleanup when possible.

If your task overlaps another domain, call it out explicitly:
- editor-core for document model and commands,
- research-features for academic workflows,
- backend-sync for persistence and save logic,
- export-interop for import/export fidelity,
- dark-theme-ux for theme and interaction states,
- test-automation for coverage and regression protection,
- release-reviewer for release risk and integration concerns.

## Pull request and change expectations

For non-trivial changes, include or update the following where relevant:

- tests,
- docs or inline notes,
- migration notes,
- accessibility impact,
- keyboard behavior impact,
- persistence impact,
- export impact,
- theme impact.

In summaries and PR notes, be explicit about:
- what changed,
- why it changed,
- risks,
- follow-up work,
- cross-module effects.

## What to avoid

Do not optimize for these at the expense of core goals:

- flashy UI over readability,
- rich-text gimmicks over structured writing,
- decorative dark theme over usable dark theme,
- feature count over stability,
- shortcuts that break accessibility,
- shortcuts that risk data loss,
- exports that look fine visually but drop important structure,
- generic “document app” assumptions that ignore research-paper needs.

## Decision priority order

When tradeoffs exist, prioritize decisions in this order:

1. Prevent data loss and preserve user work.
2. Preserve accessibility and keyboard/screen-reader usability.
3. Preserve research-paper structure and academic workflows.
4. Preserve document model correctness and export fidelity.
5. Preserve dark-theme readability and comfort.
6. Improve developer ergonomics and implementation elegance.

## Response behavior for Copilot

When assisting in this repository:

- read existing code before proposing architectural changes,
- align suggestions with the product priorities above,
- mention assumptions clearly,
- flag ambiguity instead of inventing requirements,
- prefer actionable implementation steps,
- explain cross-cutting impacts when relevant,
- keep responses focused on this repository’s mission.

If a requested change conflicts with accessibility, document integrity, or reliable save/export behavior, say so clearly and propose a safer alternative.