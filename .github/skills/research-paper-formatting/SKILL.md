---
name: research-paper-formatting
description: Guide implementation and review of academic writing features such as citation workflows, bibliography structure, title-page conventions, headings, notes, and paper-oriented formatting behavior.
user-invocable: true
---

# Research Paper Formatting

Use this skill when the task involves:
- research-paper templates,
- academic formatting behavior,
- title pages,
- heading structure,
- citations,
- footnotes or endnotes,
- bibliography or works-cited generation,
- document layout choices aimed at student papers,
- review of whether a feature supports real college writing workflows.

This repository prioritizes college research papers.
Optimize for practical academic writing over generic office-document patterns.

## Primary goals

Always optimize for:
1. Real usefulness for student research papers.
2. Structured academic content instead of manual formatting hacks.
3. Reduced formatting friction and fewer user mistakes.
4. Accessibility in all academic workflows.
5. Stable persistence and export of academic structure.

## Product mindset

Assume the user is writing a serious paper, not a flyer, newsletter, or marketing brochure.
The application should help them:
- structure their paper,
- manage sources,
- insert references,
- maintain notes,
- generate or maintain bibliography sections,
- keep formatting consistent,
- export a credible finished document.

## Feature areas

### Document structure
Support or plan for:
- title and subtitle,
- author and course metadata where in scope,
- heading hierarchy,
- outline navigation,
- section-aware formatting where relevant,
- page numbers and page settings where supported.

### Citation workflows
Treat citations as structured data.
A good citation workflow should:
- let the user create or select a source,
- insert a citation predictably,
- preserve linkage to the underlying source,
- support editing without corrupting surrounding text,
- remain compatible with export.

### Notes
Footnotes and endnotes should be:
- easy to insert,
- easy to navigate,
- numbered consistently,
- structurally preservable,
- accessible to keyboard and assistive-technology users.

### Bibliography or works cited
Bibliography behavior should:
- be deterministic,
- preserve source metadata cleanly,
- avoid duplicate confusion where possible,
- remain export-aware,
- reflect the document’s citation model.

### Templates and presets
If style presets such as MLA, APA, or Chicago are implemented:
- keep formatting rules explicit,
- separate style logic from raw editor content where practical,
- avoid baking visual style into plain text irreversibly,
- preserve enough structure to re-render consistently.

## Review questions

Before implementing or approving an academic-formatting feature, ask:

1. Does this help a user write a real research paper?
2. Is the structure explicit or only visual?
3. Can the user navigate it efficiently with keyboard only?
4. Will the metadata survive save and export?
5. Can the feature scale from a short essay to a longer paper?
6. Does the UI reduce repetitive formatting work?
7. Does it create fewer ways for the user to accidentally break the paper?

## Accessibility guidance

Academic formatting features must remain accessible.
Check:
- citation dialogs have labels and clear focus behavior,
- note references are understandable and navigable,
- bibliography controls are screen-reader friendly,
- outline navigation is keyboard operable,
- formatting presets do not depend on visual recognition alone.

## Output format

When designing or reviewing a research-paper feature, prefer:

### User goal
- What academic task the user is trying to complete.

### Proposed behavior
- What the feature does.
- What structure it stores.

### Writing workflow impact
- How it reduces friction or mistakes.

### Accessibility impact
- Keyboard and screen-reader considerations.

### Persistence and export impact
- What must survive save, reload, and export.

### Test plan
- User scenarios.
- Edge cases.
- Regression checks.

## Anti-patterns

Avoid:
- treating citations as plain styled text only,
- fake headings created only with font size changes,
- footnote behavior that can easily desynchronize numbering,
- bibliography generation that cannot trace source identity,
- workflows that require heavy manual formatting for common paper tasks,
- UI flows that are technically possible but impractical for real student use.

## Definition of done

A research-paper-formatting task is not done until:
- the academic use case is explicit,
- the structure is represented safely,
- accessibility has been considered,
- persistence and export implications are addressed,
- tests cover the core workflow.