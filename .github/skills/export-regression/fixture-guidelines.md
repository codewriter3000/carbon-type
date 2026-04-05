# Export Regression Fixture Guidelines

Use these guidelines when creating or reviewing fixtures for export, import, print, and round-trip tests.

## Goals

Fixtures should:
- represent realistic academic writing cases,
- be small enough to understand quickly,
- isolate one or two important invariants per fixture when possible,
- protect against structural loss as well as visual regressions.

## Fixture naming

Use descriptive names that reflect the behavior under test.

Examples:
- `paper-basic-headings`
- `paper-citation-inline-single`
- `paper-footnotes-multiple`
- `paper-bibliography-generated`
- `paper-page-breaks-basic`
- `paper-docx-import-unknown-style`
- `paper-roundtrip-citation-footnote`

## Fixture categories

### 1. Basic structure fixtures
Cover:
- title,
- paragraphs,
- headings,
- lists,
- simple section flow.

### 2. Citation fixtures
Cover:
- single citation,
- repeated citation,
- multiple citations in one paragraph,
- citation near punctuation,
- citation edit scenarios,
- citation-linked bibliography behavior where supported.

### 3. Notes fixtures
Cover:
- single footnote,
- multiple footnotes,
- note ordering,
- note content with formatting,
- note references around edits.

### 4. Bibliography fixtures
Cover:
- generated bibliography,
- manual bibliography-linked metadata where supported,
- empty bibliography edge case,
- repeated source usage,
- ordering stability.

### 5. Page and print fixtures
Cover:
- page breaks,
- margins if represented,
- page-number presence,
- print-preview-specific layout expectations.

### 6. Import fixtures
Cover:
- clean DOCX import,
- DOCX with unsupported styling,
- inconsistent heading styles,
- missing metadata,
- malformed or unexpected content.

### 7. Round-trip fixtures
Cover:
- editor -> export,
- import -> editor,
- editor -> export -> import where feasible.

## What each fixture should document

Each fixture or its adjacent notes should make clear:
- what the source structure is,
- what output format is targeted,
- what invariant is being protected,
- what loss is acceptable if any,
- what loss is unacceptable.

## What to verify

For each fixture, verify as relevant:
- heading levels survive,
- citation identity or placement survives,
- note numbering survives,
- bibliography structure survives,
- page intent survives where supported,
- plain text remains readable even if richer formatting changes,
- unsupported features fail clearly rather than silently disappearing.

## Keep fixtures understandable

Prefer:
- a few paragraphs,
- a small number of headings,
- a small number of citations or notes,
- clearly intentional content.

Avoid:
- giant fixtures that test everything at once,
- meaningless lorem ipsum where structure is the real point,
- fixtures with unclear expected behavior,
- brittle fixture formatting that obscures what is being tested.

## Suggested minimal fixture set

A strong minimal set includes:
1. Basic paper with headings.
2. Paper with inline citations.
3. Paper with footnotes.
4. Paper with bibliography.
5. Paper with page break behavior.
6. DOCX import sample.
7. Round-trip sample with citations and notes.

## Regression reporting template

- Fixture name:
- Format path:
- Protected invariant:
- Observed failure:
- Fix applied:
- Remaining limitation if any: