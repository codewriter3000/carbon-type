# Accessibility Baseline Checklist

Use this checklist for feature design reviews, implementation reviews, and PR reviews before running the full WCAG 2.2 AA checklist.

If any baseline item fails in a core workflow, treat the feature as not ready.

## 1. Scope and workflow

- Define the exact user task being reviewed.
- Identify every interactive element in the flow.
- Confirm the flow works in dark mode first, then light mode.
- Confirm the flow covers keyboard-only use, screen-reader use, error handling, and recovery.
- Confirm the flow is realistic for research-paper work such as headings, outline, citations, notes, bibliography, save, or export.

## 2. Semantic structure

- Use native interactive elements before ARIA-based custom widgets.
- Expose page, panel, dialog, toolbar, navigation, and main-content landmarks where appropriate.
- Use real heading hierarchy.
- Associate every form field with a visible label.
- Give every icon-only control an accessible name.
- Expose lists, tables, and grouped controls with correct semantics.

## 3. Keyboard operability

- Every action is reachable and usable without a pointer.
- Tab and Shift+Tab move predictably between controls and regions.
- Enter and Space activate controls in a standard way.
- Escape dismisses dialogs, menus, popovers, or transient UI consistently.
- Arrow keys are reserved for composite widgets and structured navigation.
- No step in the workflow depends on hover-only or drag-only behavior.
- No keyboard trap exists unless intentional modal containment is active.

## 4. Focus behavior

- Focus order matches the visual and task order.
- Focus is always visible and obvious in dark mode.
- Focus is never hidden behind sticky toolbars, headers, or overlays.
- Opening a dialog or popover places focus on the correct starting element.
- Closing transient UI restores focus to a logical triggering element or workflow location.
- Focus does not jump unexpectedly on validation, autosave, or status updates.
- The current location remains understandable after insertions like citations or footnotes.

## 5. Screen-reader clarity

- Controls expose a clear name, role, and state.
- Formatting toggles expose pressed/selected state when applicable.
- Dialogs and panels expose a clear title.
- Status changes such as save, export, and validation are announced without stealing focus.
- Instructions are available for workflows that have non-obvious keyboard behavior.
- Structural relationships are clear for outline items, note references, and bibliography entries.

## 6. Errors, help, and recovery

- Required fields and invalid fields are identified accessibly.
- Error messages explain what went wrong and how to fix it.
- Error text is associated with the affected control.
- Destructive actions are clearly named and, when needed, confirmed.
- Save, sync, and export failures are surfaced accessibly.
- Recovery paths do not require starting over or re-entering avoidable data.

## 7. Dark-mode usability

- Informational text, helper text, and metadata meet contrast requirements.
- Borders, dividers, and field boundaries remain visible on dark surfaces.
- Focus rings, selected states, and active states are clearly distinguishable.
- State changes are not conveyed by color alone.
- Carets, selections, and insertion indicators remain visible in the editor.

## 8. Academic workflow checks

Confirm a keyboard and screen-reader user can complete the relevant workflow:

- create and navigate headings,
- open and use outline navigation,
- insert and review citations,
- insert a footnote or endnote and return to the document,
- review or update bibliography content,
- understand save state,
- export the paper and understand success or failure.

## 9. Release gate

Do not approve the feature if any of these are true:

- a core action is not keyboard operable,
- focus is missing, obscured, or lost,
- a control lacks an accessible name,
- the workflow depends on pointer-only behavior,
- dark-mode contrast makes the workflow hard to use,
- a citation, note, outline, bibliography, save, or export step is inaccessible,
- errors or status messages are not understandable without vision.
