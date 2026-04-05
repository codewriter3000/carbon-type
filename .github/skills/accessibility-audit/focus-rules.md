# Focus Management Rules

Use these rules for every interactive surface in the product.

## 1. Focus must always be intentional

- Never move focus unless the user triggered an action or a well-defined accessibility rule requires it.
- Never drop focus onto `body`, a non-interactive wrapper, or an off-screen element.
- Never remove the currently focused element without placing focus somewhere logical next.

## 2. Define focus entry, movement, exit, and cancel

For each dialog, panel, toolbar, menu, editor control, citation flow, note flow, or export flow, document:

- where focus lands when the surface opens,
- how focus moves within the surface,
- how focus exits,
- what Escape does,
- where focus returns after close or cancel.

If this cannot be described clearly, the interaction is not ready.

## 3. Opening behavior

- Modal dialogs move focus inside the dialog immediately.
- Non-modal panels move focus only when the user needs to interact with the panel right away.
- Menus and listboxes move focus to the first selected or first actionable item.
- Validation summaries may receive focus only when they are the clearest way to help the user recover.

## 4. Containment rules

- Modal dialogs contain focus until dismissed.
- Background content behind a modal must not remain keyboard reachable.
- Non-modal panels, sidebars, and inspectors must not trap focus.
- Composite widgets may manage internal arrow-key movement, but Tab must still allow exit.

## 5. Closing and restoration

- Closing a transient surface returns focus to the invoking control unless workflow continuity requires a different target.
- If the invoking control no longer exists, return focus to the closest logical successor.
- After inserting a citation, focus returns to the editor at the insertion point or next typing location.
- After finishing note work, focus returns to the note reference or intended writing location.
- After export completion, do not steal focus unless the user must immediately respond to an error.

## 6. Visibility and dark-mode requirements

- Every focused element must show a clear indicator with strong contrast on dark surfaces.
- Focus indicators must remain visible when elements are hovered, selected, pressed, disabled, or invalid.
- Focus must not be clipped by overflow, hidden under sticky UI, or disguised as a subtle color shift.
- Scrolling an element into view must account for sticky headers, toolbars, and floating controls.

## 7. Error and status behavior

- Inline validation should keep focus on the affected field unless moving focus is necessary for recovery.
- Error messages must be programmatically associated with the field.
- Status messages such as autosave, sync, export, and citation insertion confirmations should be announced without moving focus.
- Do not shift focus to toast notifications.

## 8. Screen-reader considerations

- Focus targets must have meaningful accessible names.
- Dialog focus should land where the title and purpose are understandable.
- When focus moves into structured content such as outline items, note bodies, or bibliography entries, the surrounding structure must remain clear.
- Avoid focus movement that causes screen-reader users to lose their place in the writing workflow.

## 9. Anti-patterns

Do not ship interactions that:

- open a surface without moving focus appropriately,
- move focus on hover,
- trap focus in a non-modal panel,
- reset focus to the top of the page after save or insert actions,
- rely on color alone to show the focused element,
- hide the focused item under sticky chrome,
- require pointer positioning to discover where focus went.
