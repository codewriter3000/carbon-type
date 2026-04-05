---
name: editor-schema
description: Guide schema design and structural editing decisions for the word processor, including document model integrity, academic document elements, serialization boundaries, and change safety.
user-invocable: true
---

# Editor Schema

Use this skill when the task involves:
- editor model design,
- schema updates,
- node or mark definitions,
- normalization rules,
- selection-sensitive structure changes,
- document serialization,
- academic document elements such as citations, footnotes, bibliography anchors, headings, and page structure.

This repository is building a word processor for accessible academic writing.
The schema must support long-form structured documents, not just rich text.

## Schema priorities

Always optimize for:
1. Structural correctness.
2. Predictable editing behavior.
3. Safe serialization and persistence.
4. Compatibility with export and research-paper workflows.
5. Long-term maintainability.

## Core schema principles

- Model meaning, not just appearance.
- Prefer structured nodes and attributes over brittle text conventions.
- Preserve academic semantics such as heading level, citation identity, note references, and bibliography structure.
- Avoid schema choices that make export or migration unnecessarily difficult.
- Avoid ambiguous states that are hard to normalize.
- Keep invariants explicit.

## Questions to answer before changing schema

Before you add or modify nodes, marks, or attributes, answer:

1. What user-visible behavior requires this schema change?
2. Is this a semantic structure or only a presentation concern?
3. How will this be serialized?
4. How will this be persisted?
5. How will this export to PDF, DOCX, Markdown, or print-oriented flows?
6. How will keyboard editing interact with it?
7. How will undo/redo behave?
8. What invalid states can occur?
9. How will normalization repair them?
10. What tests will prove the invariant?

## Expected document concepts

Assume the schema will likely need to support some or all of the following:
- paragraphs,
- headings,
- lists,
- block quotes,
- code or preformatted blocks if in scope,
- tables if in scope,
- citations,
- footnotes or endnotes,
- bibliography or works-cited structures,
- page breaks or print-layout markers where supported,
- document metadata or front matter where supported.

For research-paper workflows, prefer explicit structure for:
- citation references,
- source identifiers,
- note references,
- bibliography entries or bibliography placeholders,
- heading hierarchy,
- page-format metadata when needed.

## Change workflow

When making schema changes, follow this sequence:

1. Read the current schema and surrounding editing commands.
2. Identify all affected areas:
   - rendering,
   - selection behavior,
   - keyboard commands,
   - serialization,
   - persistence,
   - export,
   - tests.
3. Define the new invariant clearly.
4. Update schema definitions with minimal disruption.
5. Update transforms, commands, and normalization rules.
6. Update serializers and parsers if required.
7. Add or update fixtures and tests.
8. Document migration or compatibility risk if stored documents are affected.

## Academic document guidance

### Citations
Treat citations as structured references, not just styled text.
Prefer storing:
- a stable citation identifier,
- source linkage,
- style-relevant metadata outside the visible inline text if appropriate.

Citations should remain identifiable across:
- editing,
- copy/paste where possible,
- persistence,
- export.

### Footnotes and endnotes
Footnote behavior should be structurally safe.
Avoid implementations that make note references easy to orphan or duplicate accidentally.

### Bibliography
If bibliography behavior is generated or managed, maintain a clean separation between:
- source metadata,
- citation references,
- rendered bibliography output.

### Headings and outline
Heading levels should be explicit and stable.
Do not fake outline structure with visual-only formatting.

## Normalization guidance

Normalization should:
- repair invalid states conservatively,
- preserve user intent where practical,
- avoid destructive fixes unless necessary,
- remain deterministic.

Common bad signs:
- schema allows impossible nesting,
- node attributes can contradict each other,
- multiple code paths serialize the same concept differently,
- export depends on guessing semantics from styled text.

## Anti-patterns

Avoid:
- storing semantic meaning only in CSS classes,
- using plain text tokens when structured nodes or attributes are required,
- mixing persistence-specific and UI-specific fields without clear boundaries,
- schema changes without migration consideration,
- hidden bidirectional coupling between editor rendering and export logic.

## Output format

When analyzing or proposing schema changes, prefer this structure:

### Current model
- Relevant nodes, marks, and attributes.
- Existing invariant or limitation.

### Proposed change
- What changes structurally.
- Why it is needed.

### Editing impact
- Selection, commands, normalization, undo/redo.

### Serialization impact
- Persistence and storage effects.
- Parser or serializer changes.

### Export impact
- PDF, DOCX, Markdown, or print implications.

### Test plan
- Fixtures to add.
- Edge cases to cover.
- Regression scenarios.

## Definition of done

A schema task is not done until:
- the structural invariant is clear,
- affected command and normalization behavior is updated,
- persistence and export implications are addressed,
- tests cover the new model,
- migration or compatibility risk is called out when relevant.