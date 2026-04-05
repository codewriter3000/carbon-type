---
name: export-regression
description: Validate and protect document export, import, print, and interchange behavior with fixture-driven checks focused on academic document fidelity.
user-invocable: true
---

# Export Regression

Use this skill when the task involves:
- export bugs,
- import/export regressions,
- PDF fidelity,
- DOCX compatibility,
- Markdown export behavior,
- print preview or print CSS,
- round-trip validation,
- fixture creation for document interchange.

This repository treats export and interoperability as core features.
A document is not truly usable if it looks fine in the editor but breaks when exported.

## Primary goals

Always optimize for:
1. Preservation of academic document structure.
2. Predictable export behavior.
3. Clear documentation of limitations.
4. Strong regression coverage using representative fixtures.
5. Early detection of fidelity loss.

## What to protect

Export and import work should preserve as much of the following as possible:
- heading hierarchy,
- paragraphs and lists,
- citations,
- footnotes and endnotes,
- bibliography structure,
- page breaks where supported,
- numbering,
- basic metadata where supported,
- readable layout intent.

When perfect fidelity is impossible:
- preserve structure before cosmetic details,
- document the loss explicitly,
- add a regression fixture that locks in expected behavior.

## Regression workflow

When working on export or import behavior, follow this sequence:

1. Identify the affected format and user flow.
2. Reproduce the issue with the smallest realistic document.
3. Create or update a fixture representing the case.
4. Check whether the issue is:
   - structural loss,
   - formatting loss,
   - metadata loss,
   - parser failure,
   - serializer failure,
   - print-layout issue.
5. Fix the implementation.
6. Add or update regression tests.
7. Document known limitations if exact fidelity remains impossible.

## Fixture design

Prefer small but realistic fixtures.

Include cases such as:
- short paper with title and headings,
- multi-section paper with citations,
- document with footnotes or endnotes,
- bibliography or works-cited section,
- page breaks and page numbering where supported,
- mixed formatting that should survive export,
- edge cases like empty bibliography, repeated citations, nested lists, or imported unknown styles.

Fixture sets should be understandable and named clearly.

## Academic fidelity guidance

For research-paper workflows, pay close attention to:
- citation placement,
- citation identity or metadata preservation,
- note numbering,
- bibliography ordering and separation,
- heading levels,
- page structure and margins where relevant,
- print readability.

A visually similar result is not enough if citations, notes, or structure are corrupted.

## Round-trip thinking

When practical, think in both directions:
- editor -> export,
- import -> editor,
- editor -> export -> import.

Ask:
- What structure survives?
- What changes format but keeps meaning?
- What is lost?
- Is the loss acceptable and documented?

## Output format

When reporting export issues or fixes, prefer:

### Scenario
- Source document type.
- Target format.
- User-visible expectation.

### Observed problem
- What changed or broke.
- Whether the loss is structural, visual, or both.

### Root cause
- Parser, serializer, mapping, print CSS, unsupported feature, or schema mismatch.

### Fix
- What was changed.

### Regression coverage
- Fixture added or updated.
- Test scope.
- Remaining limitations.

## Anti-patterns

Avoid:
- testing only screenshots while ignoring structure,
- relying on one oversized fixture for every case,
- fixing export visually while leaving semantic corruption,
- silently dropping unsupported content,
- hiding lossy behavior from users or developers.

## Definition of done

An export task is not done until:
- the issue is reproduced clearly,
- fixture coverage exists or is updated,
- expected output is defined,
- structural impact is understood,
- any remaining fidelity gap is documented.