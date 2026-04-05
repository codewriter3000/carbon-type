# Schema Review Template

Use this template when proposing or reviewing a document model or schema change.

## Summary

- Feature or bug:
- Why this schema change is needed:
- User-visible goal:

## Current model

- Relevant nodes:
- Relevant marks:
- Relevant attributes:
- Existing normalization behavior:
- Current serialization path:
- Known limitations:

## Proposed change

- New or modified nodes:
- New or modified marks:
- New or modified attributes:
- Structural invariant to preserve:
- Why this is the right representation:

## Editing impact

- Cursor or selection impact:
- Command impact:
- Undo/redo impact:
- Copy/paste impact:
- Normalization impact:
- Potential invalid states:

## Persistence impact

- Storage changes:
- Migration risk:
- Backward compatibility considerations:
- Any new required defaults:

## Export and import impact

- PDF implications:
- DOCX implications:
- Markdown implications:
- Print-layout implications:
- Risks of structural loss:

## Research-paper implications

- Heading hierarchy:
- Citation structure:
- Footnotes or endnotes:
- Bibliography linkage:
- Page-structure behavior if relevant:

## Accessibility implications

- Keyboard behavior changes:
- Screen-reader implications:
- Toolbar or command discoverability changes:

## Test plan

- Unit tests:
- Integration tests:
- Regression fixtures:
- Edge cases:
- Failure cases:

## Reviewer questions

- Does the schema model meaning instead of appearance?
- Is the invariant explicit?
- Is normalization deterministic?
- Will this age well as the document model grows?
- Did we introduce hidden coupling to styling or export code?