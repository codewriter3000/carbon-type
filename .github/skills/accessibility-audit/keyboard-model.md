# Keyboard Interaction Model

Use this model when designing or reviewing keyboard behavior for the editor and related paper-writing workflows.

## Core rules

- Tab and Shift+Tab move between major controls, regions, and form fields.
- Enter and Space activate buttons, menu items, and other standard controls.
- Escape closes the current transient surface and returns focus logically.
- Arrow keys are used only inside composite widgets or structured navigation patterns.
- Text inputs and the editor preserve expected native text-editing keys.
- Keyboard shortcuts must not depend on single-character commands unless they are active only when the relevant surface has focus.

## Region model

The product should expose predictable keyboard movement across these areas when present:

1. global navigation,
2. document toolbar,
3. primary editor,
4. outline or side panels,
5. contextual dialogs or popovers,
6. export or settings flows.

Tab should move in and out of each area in DOM order.
Arrow-key movement inside an area must not replace Tab for leaving that area.

## Editor

- Focus enters the editor at the active caret or a sensible insertion point.
- Standard text-editing navigation remains intact.
- Editor shortcuts must not break screen-reader browse or forms modes unnecessarily.
- Opening related UI from the editor must preserve enough context to return the user to the same writing location.

## Toolbar

- Use real buttons.
- Toolbar buttons are in the Tab order unless a well-implemented roving tabindex model is clearly better.
- Toggle buttons expose pressed state.
- If arrow-key movement is supported within a toolbar, Tab and Shift+Tab must still enter and leave the toolbar predictably.

## Outline navigation

- Use a structured list or tree pattern only if the hierarchy requires it.
- Up and Down move between visible headings.
- Left and Right collapse, expand, or move across hierarchy only when a tree-style interaction is implemented.
- Enter or Space jumps to the selected section.
- Focus remains on the outline until the user activates navigation or tabs away.

## Citation workflows

- A keyboard user must be able to open citation UI from the editor or toolbar.
- Focus lands on the first useful field, typically search or source selection.
- Up and Down move through suggestion or results lists.
- Enter confirms the highlighted result when that interaction is disclosed.
- Escape closes the citation UI and returns focus to the invoking location.
- After insertion, focus returns to the editor at the citation location or next typing position.

## Footnotes and endnotes

- Inserting a note must have an explicit keyboard path.
- If focus moves into note content, that movement must be intentional and announced by structure.
- Provide a predictable keyboard path back to the note reference or main document.
- Returning from note editing must not lose the user’s place.

## Bibliography and source management

- Source rows, cards, or list items must be keyboard reachable.
- Editable source fields follow normal form navigation with Tab and Shift+Tab.
- Reordering or selection actions cannot depend only on drag interactions.
- Regenerate or refresh actions must be keyboard operable and announce completion or failure.

## Dialogs, menus, and popovers

- Focus enters on open.
- Modal dialogs contain focus until dismissed.
- Non-modal popovers must not trap focus.
- Escape closes the active surface unless there is a stronger, well-documented reason not to.
- Closing returns focus to the invoker or the most logical workflow continuation point.

## Export flow

- Opening export options moves focus to the export dialog or panel title or first control.
- Format selection, options, and confirmation actions are fully keyboard operable.
- Progress, success, and failure states are announced without disorienting focus movement.
- On close, focus returns to the export trigger unless the next workflow step requires a different destination.
