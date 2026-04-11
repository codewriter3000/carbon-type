## Plan: Carbon Type — Full-Featured Academic Word Processor (9-Agent Build)

Build a comprehensive, accessible, dark-theme-first word processor for college students on the existing React 19 + ProseMirror foundation. Work distributed across your 9 agents from `.github/agents/`, with `product-architect` planning, 5 implementation agents building in parallel, `accessibility-lead` auditing, `test-automation` covering regression, and `release-reviewer` gating merges.

---

### Your 9 Agents & Their Roles

| # | Agent | Role | Type |
|---|-------|------|------|
| 1 | **product-architect** | ADRs, specs, issue breakdowns, dependency maps, coordination | Planning |
| 2 | **editor-core** | Schema, commands, plugins, selection, normalization, keyboard | Impl |
| 3 | **research-features** | Citations, bibliography, APA/MLA, doc properties, footnotes, TOC, dictionary, thesaurus | Impl |
| 4 | **export-interop** | PDF, DOCX, DOC, Markdown, print, import, round-trip fixtures | Impl |
| 5 | **dark-theme-ux** | Tokens, theme toggle, toolbar, sidebar, dialogs, status bar, all component UI/styling | Impl |
| 6 | **backend-sync** | Auto-save, IndexedDB, crash recovery, version history, templates, preferences | Impl |
| 7 | **accessibility-lead** | ADA/WCAG audit, keyboard nav, focus management, screen readers, contrast | Audit + Impl |
| 8 | **test-automation** | Unit, integration, E2E, accessibility, export fixture tests | Impl |
| 9 | **release-reviewer** | PR review, merge sequencing, release readiness gates | Review |

Note: There's no dedicated "UI", "Tools", or "Tables" agent — that work distributes across **editor-core** (schema + commands), **dark-theme-ux** (visual UI + component shell), and **research-features** (academic tool panels).

---

### Complete Feature List (153 features)

**Core Formatting** (editor-core schema/commands + dark-theme-ux toolbar)
1–2. **Bold, Italic, Underline, Strikethrough** *(existing)* + **Superscript, Subscript**
3–6. Font family selector, Font size selector (8–72pt), Text color picker, Text highlight
7–11. Alignment (L/C/R/justify), Line spacing (single–double+custom), Paragraph spacing, First-line indent, Hanging indent
12–16. Increase/decrease indent, Bulleted lists, Numbered lists (1/a/i/A/I), Multi-level nested lists, Checklist/task lists
17–22. Block quotes *(existing)*, Code blocks + syntax highlighting, Clear formatting, Format painter, Styles dropdown, Undo/Redo buttons

**Page Layout** (editor-core + dark-theme-ux)
23–28. Page size (Letter/A4/Legal), Orientation, Margins (Normal/Narrow/Wide/Custom), Page breaks, Section breaks, Columns (1/2/3)
29–33. Page numbers (position/format/start), Headers & footers, Different first page, Odd/even headers *(stretch)*, Ruler with tab stops

**Academic / Research** (research-features + editor-core schema)
34–40. **Document Properties dialog** (author, course, professor, title, date, institution), **APA 7th Edition preset**, **MLA 9th Edition preset**, Chicago *(Phase 3)*, Title page auto-generation, Running head, Abstract with keywords
41–47. In-text citations (parenthetical + narrative), Citation source manager, BibTeX/RIS import, Auto-formatted bibliography, Footnotes, Endnotes, Table of Contents
48–53. Table of Figures, Table of Tables, Appendix support, Block quotation auto-formatting (40+ words for APA), Cross-references, Bookmarks

**Tables** (editor-core schema/commands + dark-theme-ux UI)
54–65. Insert table (grid picker), Add/delete rows/columns, Merge cells, Split cells, Header row, Table styles, Column resize, Cell alignment, Cell background, Table borders, Sort by column, Table caption

**Images & Media** (editor-core + dark-theme-ux)
66–74. Insert image (upload, drag-drop, paste, URL), Resize handles, Alignment (inline/center/float), **Alt text editor** *(a11y required)*, Caption + figure numbering, Crop *(stretch)*

**Math & Special Content** (editor-core + dark-theme-ux)
75–81. Math equation editor (LaTeX → KaTeX), Inline math, Block math, Special character panel, Emoji picker, Non-breaking space, Symbol browser

**Navigation** (research-features + dark-theme-ux)
82–89. Outline/Navigation pane, Document map sidebar, Bookmarks panel, **Find & Replace** (case/whole-word/regex), Replace All, Match highlighting, Go to page/heading/bookmark, Breadcrumb

**Tools & Utilities** (editor-core plugins + research-features + dark-theme-ux status bar)
90–102. **Word counter** (live status bar), Character count, Page count, Reading time, **Spell checker** (red squiggles), Grammar suggestions, **Dictionary lookup**, **Thesaurus**, Auto-correct, Smart quotes, Auto-capitalize, **Text case toggler**, Flesch-Kincaid readability score

**Export & Import** (export-interop)
103–114. **Export PDF**, **Export DOCX**, **Export DOC** (legacy fallback), Export Markdown, Export Plain Text, Export HTML, **Print** (Ctrl+P) + print preview, Print with academic formatting, Import DOCX, Import Markdown, Import plain text, Import HTML

**Persistence** (backend-sync)
115–124. **Auto-save** (IndexedDB), Manual save (Ctrl+S), **Crash recovery** + restore prompt, Version history, Multiple documents, **Templates** (Blank/APA/MLA/Research Proposal/Lab Report/Annotated Bib), Recent docs, Duplicate, Rename, Preferences persistence

**Collaboration** (backend-sync — future phase)
125–129. Comments/annotations, Track changes, Accept/reject, Compare versions, Real-time collab *(future)*

**UI/UX** (dark-theme-ux)
130–142. **Theme toggle** (System/Dark/Light), Zoom (50–200%), Zen mode, Full-screen, Customizable shortcuts *(stretch)*, Shortcuts cheat sheet (Ctrl+/), **Command palette** (Ctrl+Shift+P), Context menu, Bubble toolbar, Toast notifications, Onboarding walkthrough, **Tabbed ribbon** (Home/Insert/References/Layout/View), Ruler

**Accessibility** (accessibility-lead)
143–153. Full keyboard nav, Screen reader announcements, Focus management, Visible focus indicators, Reduced motion *(existing)*, High contrast mode, ARIA-live status, Skip links, Landmarks, Touch targets (48px), Voice dictation *(stretch)*

---

### Phase Breakdown

#### Phase 1: Foundation (weeks 1–3)

| Agent | Work | Blocking? |
|-------|------|-----------|
| **product-architect** | ADRs (ProseMirror, CSL-JSON, docx+mammoth, IndexedDB/idb, KaTeX, typo.js). Issue breakdowns. Schema reviews via schema-review-template.md | Starts day 1, unblocked |
| **editor-core** | Add nodes: lists, tables, image, figure, page_break, section_break, footnote_ref/body, citation_ref, bibliography_section, abstract, math. Add marks: superscript, subscript, font_family, font_size, text_color, highlight. Add paragraph attrs: alignment, lineSpacing, spacing, indent. Commands for all. Word count + find & replace plugins. Smart quotes input rule. | Starts day 1, unblocked |
| **dark-theme-ux** | Wire existing toolbar. Build tabbed ribbon shell (Home tab first). Dialog framework. Sidebar shell. Status bar shell. Expand tokens. Theme toggle UI. | Starts day 1 for shell; wiring waits on editor-core commands |
| **backend-sync** | IndexedDB via `idb`. Auto-save. Crash recovery. Document manager CRUD. Preferences (localStorage). | Starts day 1, unblocked |
| **research-features** | Design doc properties + citation data models (TS interfaces, CSL-JSON). Define APA/MLA rules as declarative JSON configs. Design footnote data flow. | Starts day 1 (design); integrates once editor-core nodes land |
| **export-interop** | Set up `docx` npm. Basic DOCX serializer (headings, paragraphs, lists). PDF via print CSS. Basic Markdown serializer. | Scaffolds day 1; full wiring once schema stable |
| **accessibility-lead** | Review Phase 1 output. Define dialog focus patterns per focus-rules.md. Implement aria-live status bar. Update skip links. | Reviews as features land |
| **test-automation** | Schema tests for all new nodes/marks. Command tests. Word count plugin tests. Auto-save round-trip tests. Toolbar integration tests. | Tests as features land |
| **release-reviewer** | Gate PRs. Enforce merge order: schema → commands → UI → persistence. | Reviews as PRs arrive |

#### Phase 2: Academic Features (weeks 3–6)

| Agent | Work |
|-------|------|
| **editor-core** | Spell check plugin (typo.js in Worker). Citation/footnote normalization. Table merge/split. Performance. |
| **research-features** | Document Properties dialog. Citation Manager UI + BibTeX import. In-text citation insertion. APA title page + MLA header generator. Bibliography auto-gen. Footnote UI. TOC generator. Outline panel. Abstract section. |
| **export-interop** | Citations/footnotes/bibliography through DOCX + PDF. Print preview. Print CSS. Export fixture suite per fixture-guidelines.md. |
| **dark-theme-ux** | Remaining ribbon tabs (Insert, References, Layout, View). All dialogs (Link, Image, Table, Page Setup, Print Preview, Find & Replace). Citations sidebar. Bubble toolbar. Context menu. |
| **backend-sync** | Citation library persistence. Templates system. Version history. Migration v1. |
| **accessibility-lead** | Audit: citation flow, footnote nav, all dialogs/panels, print preview. Roving tabindex for ribbon if beneficial. |
| **test-automation** | Academic workflow tests (all 6 scenarios from academic-workflow-scenarios.md). Export fixtures. APA/MLA validation. axe-core integration. |
| **release-reviewer** | Gate all Phase 2 PRs. Verify citation/export fidelity. |

#### Phase 3: Polish & Advanced (weeks 6–9)

| Agent | Work |
|-------|------|
| **editor-core** | Math editor (KaTeX). Grammar rules. Auto-correct. Large doc perf. |
| **research-features** | Chicago preset. Cross-references. Table of Figures/Tables. Dictionary (Free Dictionary API). Thesaurus. Readability score. |
| **export-interop** | DOCX import (mammoth). Markdown import. DOC fallback (RTF). Round-trip suite. Doc limitations. |
| **dark-theme-ux** | Command palette. Zen mode. Full-screen. Shortcuts panel. Ruler. Zoom. Onboarding. Scrollbars. Loading states. Final polish. |
| **backend-sync** | Offline Service Worker. Sync API contracts. Comments + track changes data models (future prep). |
| **accessibility-lead** | Full WCAG 2.2 AA audit per checklist.md. High contrast mode. Voice dictation exploration. |
| **test-automation** | Playwright E2E. Performance benchmarks. Full a11y regression. Import round-trips. Contrast ratio checks. |
| **product-architect** | Phase 3 coordination. Cloud sync architecture spec. v2 roadmap. |

---

### Inter-Agent Dependencies

```
product-architect ──→ all (specs, ADRs, issue breakdowns)
editor-core ──→ research-features (schema nodes before academic UI)
editor-core ──→ export-interop (stable schema before serializers)
editor-core ──→ dark-theme-ux (commands before toolbar wiring)
backend-sync ──→ dark-theme-ux (storage APIs for theme, save status)
backend-sync ──→ research-features (persistence for properties, citations)
dark-theme-ux ──→ accessibility-lead (UI exists before audit)
all ──→ release-reviewer (PRs gated)
```

**Parallel from day 1**: `editor-core`, `dark-theme-ux` (shell), `backend-sync`, and `product-architect` all start simultaneously. `research-features` designs data models in parallel, integrates once schema nodes land. `export-interop` scaffolds in parallel, wires once schema stabilizes.

---

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| DOCX generation | `docx` npm | Mature, typed, complex doc support |
| DOCX import | `mammoth` npm | Clean HTML from DOCX |
| PDF export | Browser print-to-PDF + `jsPDF` fallback | Best formatting fidelity |
| Citation data | CSL-JSON | Interop with Zotero, Mendeley, Scholar |
| Spell check | `typo.js` + Hunspell in Web Worker | Client-side, no API dependency |
| Math | KaTeX | Fast, accessible, lighter than MathJax |
| Persistence | IndexedDB via `idb` | Reliable for large docs |
| Style presets | Declarative JSON configs | Easy to add Chicago/Turabian later |
| DOC format | RTF-based fallback | Full .doc binary too expensive |
| Excluded v1 | Real-time collab server, cloud sync, mail merge, drawing, charts |

---

### Verification

1. `vitest` passes — all schema, command, plugin, persistence tests
2. Every toolbar button dispatches correct ProseMirror command
3. APA sample paper → DOCX + PDF → headings, citations, bibliography survive
4. APA/MLA title pages match expected layout
5. axe-core passes on all views
6. Keyboard-only navigation through every dialog, panel, ribbon tab
7. Close tab mid-edit → reopen → document recovered
8. WCAG AA contrast in both themes (automated checks)
9. Print preview: correct margins, fonts, page numbers, white background
10. 50-page doc typing latency < 16ms
11. All 6 academic workflow scenarios pass
12. All export fixture categories covered

---

### Further Considerations

1. **Style preset architecture**: Declarative JSON rule sets interpreted by a shared formatting engine (recommended) — easier to add Chicago/Turabian without new imperative code.

2. **Citation import**: BibTeX/RIS import recommended for Phase 2 — students constantly export `.bib` from Google Scholar and Zotero.

3. **Toolbar layout**: Tabbed ribbon (Home/Insert/References/Layout/View) with `role="tablist"` recommended — scales better for 150+ features and is more keyboard-accessible than a scrollable bar.
