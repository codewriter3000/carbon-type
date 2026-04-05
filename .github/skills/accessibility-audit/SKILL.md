---
name: accessibility-audit
description: Audit and improve accessibility for the academic word processor, with emphasis on keyboard use, screen readers, semantic structure, focus behavior, and dark-mode usability.
user-invocable: true
---

# Accessibility Audit

Use this skill when the task involves:
- auditing accessibility,
- reviewing keyboard behavior,
- checking focus management,
- validating semantic HTML,
- reviewing dialogs, menus, toolbars, forms, or editor controls,
- improving screen-reader support,
- checking dark-theme readability or contrast,
- evaluating research-paper workflows for accessibility.

This repository builds a word processor where ADA accessibility is a core product goal.
Treat accessibility as a release requirement, not a polish task.

## Primary goals

Always optimize for:
1. Keyboard-only usability.
2. Screen-reader clarity.
3. Semantic document and UI structure.
4. Visible focus and state clarity in dark mode.
5. Accessible research-paper workflows such as citations, notes, outline navigation, and export.

## Audit procedure

When asked to audit or improve a feature, follow this sequence:

1. Identify the user-facing flow.
2. List all interactive elements involved.
3. Check semantics before checking ARIA.
4. Check keyboard navigation and focus order.
5. Check focus visibility and active state visibility.
6. Check accessible labels, names, and instructions.
7. Check screen-reader implications.
8. Check contrast and dark-theme legibility.
9. Check motion, timing, and dismissal behavior where applicable.
10. Add or update automated tests when practical.

## What to inspect

### Semantics
Prefer native elements wherever possible:
- `button` for button actions,
- `a` for navigation,
- `input`, `textarea`, `select`, `label`,
- `dialog` only if used correctly and consistently,
- headings in proper hierarchy,
- landmarks such as `header`, `nav`, `main`, `aside`, `footer`.

Do not use clickable `div` or `span` patterns unless there is a compelling reason and keyboard semantics are fully restored.

### Keyboard behavior
Check:
- Tab order,
- Shift+Tab reverse order,
- Enter and Space behavior,
- Escape behavior,
- Arrow-key behavior for composite widgets,
- focus return after closing overlays,
- no keyboard traps unless intentionally managed in modal contexts.

For each interactive component, define:
- how focus enters,
- how focus moves,
- how focus exits,
- what keys activate actions,
- what happens on cancel.

### Focus visibility
Every interactive element must have a visible focus indicator that remains obvious in dark mode.
Do not accept:
- barely visible outlines,
- focus hidden by overflow or clipping,
- focus states distinguishable only by tiny color shifts.

### Labels and instructions
Check:
- every form field has a label,
- icon buttons have accessible names,
- dialogs have titles,
- destructive or ambiguous actions are clearly named,
- inline validation messages are understandable and associated with the right control.

### Screen-reader behavior
Check whether the feature exposes meaningful names, roles, and states.
Pay special attention to:
- toolbar controls,
- formatting toggles,
- citation insertion dialogs,
- footnote/endnote controls,
- outline navigation,
- comments or side panels,
- export options,
- save/sync status messages.

Use native semantics first.
Use ARIA to clarify, not to patch poor structure unless necessary.

### Dark-mode accessibility
Dark mode is a primary target in this repository.
Check:
- body text readability,
- muted text readability,
- icon contrast,
- border and divider visibility,
- selected and active states,
- editor caret visibility,
- highlighted text and comment color clarity,
- focus rings against dark surfaces.

Avoid low-contrast gray-on-charcoal patterns.

### Motion and timing
Respect reduced-motion expectations.
Avoid interactions that:
- depend on animation for comprehension,
- auto-dismiss critical information too quickly,
- hide content changes from keyboard or assistive-tech users.

## Special guidance for this product

This is not a generic CRUD application.
Audit academic-writing flows carefully:
- creating headings,
- navigating by outline,
- inserting citations,
- editing source metadata,
- creating footnotes,
- reviewing bibliography entries,
- exporting a paper,
- recovering drafts.

A feature is not accessible if the basic UI is accessible but the writing workflow is still confusing or impractical with keyboard or assistive technology.

## Output format

When producing an accessibility audit, prefer this structure:

### Accessibility findings
- Severity: blocker, high, medium, or low.
- Area affected.
- What the issue is.
- Why it matters.
- How to fix it.

### Keyboard notes
- Expected keyboard model.
- Current gaps.
- Recommended fixes.

### Screen-reader notes
- Missing names, roles, states, or announcements.
- Structural problems.
- Suggested semantic improvements.

### Dark-mode notes
- Contrast or visibility issues.
- State clarity issues.
- Token or styling fixes.

### Test coverage
- Existing tests that help.
- Missing test coverage.
- Recommended automated regression tests.

## Severity guidance

Use these defaults:
- **Blocker**: prevents keyboard use, screen-reader comprehension, or core document workflow completion.
- **High**: major friction in an important writing flow or severe contrast/focus issue.
- **Medium**: important but not workflow-blocking issue.
- **Low**: polish or minor consistency issue.

## Definition of done

An accessibility task is not done until:
- the issue is fixed or clearly documented,
- keyboard behavior is explicit,
- semantics are improved where needed,
- dark-mode usability has been checked,
- relevant automated tests are added or updated when practical.