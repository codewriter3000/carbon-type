# WCAG 2.2 AA Accessibility Audit Checklist

Use this checklist to audit any feature, workflow, screen, component, document interaction, dialog, toolbar, panel, or export flow in this repository.

For faster feature reviews, start with `baseline-checklist.md` and use `keyboard-model.md` plus `focus-rules.md` to define expected interaction behavior before running this full checklist.

This checklist is intended to support conformance with **WCAG 2.2 Level AA**.
For any feature under review, all applicable WCAG 2.2 Level A and Level AA Success Criteria must pass.
If any applicable item fails, the feature is not WCAG 2.2 AA conformant.

Important:
- This checklist supports conformance work, but does not itself guarantee conformance.
- Conformance must be verified against the implemented experience, including real content, states, and interactions.
- If a criterion is not applicable to the feature being audited, mark it N/A and briefly explain why.

---

## Audit result states

Use one of these statuses for every applicable item:
- Pass
- Fail
- Needs manual verification
- Not applicable

A feature should not be considered release-ready if any applicable A or AA criterion is marked Fail.

---

## 0. Audit scope

Document the scope before starting.

- Feature or screen:
- User task:
- Platforms tested:
- Browsers tested:
- Assistive technologies tested:
- Input methods tested:
- Theme tested: dark and light
- Responsive sizes tested:
- Auditor:
- Date:

Confirm the audit covers:
- default state,
- error state,
- loading state,
- empty state,
- success state,
- disabled state,
- keyboard-only use,
- screen-reader use,
- dark-mode use.

---

## 1. Conformance requirement checks

Before reviewing success criteria, confirm these basics:

- The audit identifies the exact feature or set of pages being evaluated.
- The same conformance target is used throughout: WCAG 2.2 Level AA.
- Accessibility-supported technologies are being used.
- Alternative versions are not being used as a shortcut unless WCAG conformance rules actually permit it.
- If the feature depends on user-generated content, evaluate both the authoring UI and representative output.
- If third-party content or integrations are included, note their impact on conformance.

---

## 2. WCAG 2.2 A and AA criteria checklist

Evaluate every applicable criterion below.

# 1. Perceivable

## 1.1 Text Alternatives

### 1.1.1 Non-text Content (Level A)
Check:
- Informative images have appropriate text alternatives.
- Decorative images are marked so they are ignored by assistive technology.
- Icon-only buttons have accessible names.
- Canvas, SVG, charts, previews, and document thumbnails have equivalent accessible labeling where needed.
- CAPTCHAs are avoided where possible; if used, alternatives are provided.

Status:
Notes:

## 1.2 Time-based Media

### 1.2.1 Audio-only and Video-only (Prerecorded) (Level A)
Check if applicable.

Status:
Notes:

### 1.2.2 Captions (Prerecorded) (Level A)
Check if applicable.

Status:
Notes:

### 1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)
Check if applicable.

Status:
Notes:

### 1.2.4 Captions (Live) (Level AA)
Check if applicable.

Status:
Notes:

### 1.2.5 Audio Description (Prerecorded) (Level AA)
Check if applicable.

Status:
Notes:

## 1.3 Adaptable

### 1.3.1 Info and Relationships (Level A)
Check:
- Headings use real heading structure.
- Lists use list semantics.
- Tables use correct table markup where data tables are present.
- Form labels are programmatically associated.
- Required fields are identified accessibly.
- Toolbars, side panels, dialogs, outline views, citation controls, and note structures expose relationships semantically.
- Visual grouping is also available programmatically.

Status:
Notes:

### 1.3.2 Meaningful Sequence (Level A)
Check:
- Reading and interaction order remains meaningful without CSS positioning.
- Focus order matches intended use.
- Sidebars, toolbars, and dialogs do not create confusing sequence changes.
- Export dialogs and citation workflows preserve meaningful order.

Status:
Notes:

### 1.3.3 Sensory Characteristics (Level A)
Check:
- Instructions do not depend only on shape, size, visual location, orientation, or sound.
- Users are not told things like “click the button on the right” without another identifier.

Status:
Notes:

### 1.3.4 Orientation (Level AA)
Check:
- The interface does not lock users into only portrait or only landscape unless essential.

Status:
Notes:

### 1.3.5 Identify Input Purpose (Level AA)
Check if applicable:
- Common user-information fields use correct autocomplete purpose tokens where appropriate.

Status:
Notes:

### 1.3.6 Identify Purpose (Level AAA)
Not required for AA. Do not use for pass/fail.

## 1.4 Distinguishable

### 1.4.1 Use of Color (Level A)
Check:
- Color is not the only means of conveying errors, selection, required status, active formatting, citation state, comment status, or validation status.

Status:
Notes:

### 1.4.2 Audio Control (Level A)
Check if applicable.

Status:
Notes:

### 1.4.3 Contrast (Minimum) (Level AA)
Check:
- Text and images of text meet minimum contrast.
- Normal text is at least 4.5:1.
- Large text is at least 3:1.
- Placeholder text, helper text, note text, metadata, toolbar labels, panel labels, and muted text still meet required contrast when they convey information.
- Dark mode is tested independently; do not assume contrast is acceptable because light mode passes.

Status:
Notes:

### 1.4.4 Resize Text (Level AA)
Check:
- Text can be resized up to 200 percent without loss of content or functionality.
- Reflowed dialogs, panels, menus, citations, bibliography tools, and editor controls remain usable.

Status:
Notes:

### 1.4.5 Images of Text (Level AA)
Check:
- Text is real text unless a specific exception applies.

Status:
Notes:

### 1.4.10 Reflow (Level AA)
Check:
- At 320 CSS pixels wide or 256 CSS pixels high, content reflows without requiring two-dimensional scrolling except where allowed.
- Toolbars, side panels, citation editors, outline views, settings pages, and export controls remain usable.
- Critical actions are not hidden off-screen.

Status:
Notes:

### 1.4.11 Non-text Contrast (Level AA)
Check:
- UI components and graphical objects needed to understand or operate the interface have at least 3:1 contrast against adjacent colors.
- Focus indicators, input borders when needed, selected states, toggle states, icons conveying meaning, chart elements if essential, and drag handles if used meet contrast requirements.
- Dark-theme borders and dividers are visible enough when they convey control boundaries.

Status:
Notes:

### 1.4.12 Text Spacing (Level AA)
Check:
- Content remains usable when line height, paragraph spacing, letter spacing, and word spacing are increased to WCAG-specified values.
- No clipping, overlap, or lost controls occur.

Status:
Notes:

### 1.4.13 Content on Hover or Focus (Level AA)
Check:
- Hover or focus-triggered content is dismissible, hoverable, and persistent as required.
- Tooltips, menus, popovers, formatting help, citation suggestions, and inline help do not disappear unexpectedly.
- Users can move pointer into revealed content without it vanishing.
- Escape or equivalent dismissal is available where appropriate.

Status:
Notes:

---

# 2. Operable

## 2.1 Keyboard Accessible

### 2.1.1 Keyboard (Level A)
Check:
- All functionality is operable by keyboard.
- Rich text editing, toolbar actions, citation workflows, footnote workflows, outline navigation, settings, and export flows all work without a mouse.
- No pointer-only interactions are required.

Status:
Notes:

### 2.1.2 No Keyboard Trap (Level A)
Check:
- Users can move focus away from any component using standard keyboard methods or are told how.
- Modals, editors, menus, and composite widgets do not trap focus improperly.

Status:
Notes:

### 2.1.3 Keyboard (No Exception) (Level AAA)
Not required for AA.

### 2.1.4 Character Key Shortcuts (Level A)
Check if single-character shortcuts exist:
- They can be turned off, remapped, or are active only on focus.

Status:
Notes:

## 2.2 Enough Time

### 2.2.1 Timing Adjustable (Level A)
Check if time limits exist.

Status:
Notes:

### 2.2.2 Pause, Stop, Hide (Level A)
Check:
- Auto-updating or moving content can be paused, stopped, or hidden where required.

Status:
Notes:

## 2.3 Seizures and Physical Reactions

### 2.3.1 Three Flashes or Below Threshold (Level A)
Check if applicable.

Status:
Notes:

## 2.4 Navigable

### 2.4.1 Bypass Blocks (Level A)
Check:
- Skip links, landmarks, or equivalent bypass mechanisms exist.
- Repeated navigation, toolbars, and side panels can be bypassed.

Status:
Notes:

### 2.4.2 Page Titled (Level A)
Check:
- Screens, documents, dialogs, and major contexts have meaningful titles where applicable.

Status:
Notes:

### 2.4.3 Focus Order (Level A)
Check:
- Focus order preserves meaning and operability.
- Opening a citation dialog, footnote editor, or export panel does not create disorienting focus jumps.

Status:
Notes:

### 2.4.4 Link Purpose (In Context) (Level A)
Check:
- Link purpose is clear from link text or context.

Status:
Notes:

### 2.4.5 Multiple Ways (Level AA)
Check if applicable:
- Users have more than one way to locate pages or content, except where the page is a step in a process.
- In-app navigation, outline, search, or menus provide discoverability where relevant.

Status:
Notes:

### 2.4.6 Headings and Labels (Level AA)
Check:
- Headings and labels describe topic or purpose clearly.
- Citation controls, note controls, export controls, and formatting options are named clearly.

Status:
Notes:

### 2.4.7 Focus Visible (Level A in WCAG 2.2)
Check:
- Keyboard focus is always visible.

Status:
Notes:

### 2.4.11 Focus Not Obscured (Minimum) (Level AA)
Check:
- When an element receives keyboard focus, it is not entirely hidden by sticky headers, sticky toolbars, floating panels, or overlays.
- Scrolling logic does not place the focused item behind persistent UI.

Status:
Notes:

### 2.4.12 Focus Not Obscured (Enhanced) (Level AAA)
Not required for AA.

### 2.4.13 Focus Appearance (Level AA)
Check:
- The focus indicator is sufficiently visible and meets WCAG 2.2 focus appearance requirements.
- It has adequate contrast against unfocused states and surrounding colors.
- Tiny or ambiguous focus treatments are not used.

Status:
Notes:

## 2.5 Input Modalities

### 2.5.1 Pointer Gestures (Level A)
Check if applicable:
- Complex multipoint or path-based gestures have a simple alternative.

Status:
Notes:

### 2.5.2 Pointer Cancellation (Level A)
Check:
- Down-event activation is avoided or safely reversible where required.

Status:
Notes:

### 2.5.3 Label in Name (Level A)
Check:
- Visible labels match or are included in accessible names.

Status:
Notes:

### 2.5.4 Motion Actuation (Level A)
Check if applicable.

Status:
Notes:

### 2.5.7 Dragging Movements (Level AA)
Check if applicable:
- Any dragging interaction has a single-pointer or non-drag alternative.
- Reordering, selection, panel movement, or media controls do not require drag only.

Status:
Notes:

### 2.5.8 Target Size (Minimum) (Level AA)
Check:
- Pointer targets meet minimum size requirements unless a WCAG exception applies.
- Toolbar buttons, menus, icon controls, disclosure controls, note references, and touch actions are large enough.

Status:
Notes:

---

# 3. Understandable

## 3.1 Readable

### 3.1.1 Language of Page (Level A)
Check:
- The page language is programmatically identified.

Status:
Notes:

### 3.1.2 Language of Parts (Level AA)
Check if applicable:
- Passages in another language are identified programmatically.

Status:
Notes:

## 3.2 Predictable

### 3.2.1 On Focus (Level A)
Check:
- Components do not trigger unexpected context changes on focus.

Status:
Notes:

### 3.2.2 On Input (Level A)
Check:
- Input does not trigger unexpected major changes without warning.

Status:
Notes:

### 3.2.3 Consistent Navigation (Level AA)
Check:
- Repeated navigation patterns stay consistent across the app.

Status:
Notes:

### 3.2.4 Consistent Identification (Level AA)
Check:
- Components with the same function are identified consistently.

Status:
Notes:

### 3.2.6 Consistent Help (Level A)
Check if help mechanisms exist:
- Help appears in a consistent location/order across the experience.

Status:
Notes:

## 3.3 Input Assistance

### 3.3.1 Error Identification (Level A)
Check:
- Input errors are identified clearly.

Status:
Notes:

### 3.3.2 Labels or Instructions (Level A)
Check:
- Inputs and workflows provide needed labels or instructions.

Status:
Notes:

### 3.3.3 Error Suggestion (Level AA)
Check:
- When an input error is detected and suggestions are known, the suggestions are provided.

Status:
Notes:

### 3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)
Check if applicable:
- Important submissions are reversible, checked, or confirmed as required.

Status:
Notes:

### 3.3.7 Redundant Entry (Level A)
Check if applicable:
- Previously entered information is reused or selectable instead of requiring re-entry, unless exceptions apply.

Status:
Notes:

### 3.3.8 Accessible Authentication (Minimum) (Level AA)
Check if authentication exists:
- Authentication does not rely on a cognitive function test unless an allowed exception applies.
- Password managers, paste, and assistive technologies are supported where applicable.

Status:
Notes:

---

# 4. Robust

## 4.1 Compatible

### 4.1.2 Name, Role, Value (Level A)
Check:
- Custom components expose correct name, role, and value/state.
- Formatting toggles, dialogs, disclosure widgets, tabs, menus, and editor controls expose proper state.

Status:
Notes:

### 4.1.3 Status Messages (Level AA)
Check:
- Important status messages are programmatically determinable without moving focus.
- Save status, sync status, export completion/failure, validation messages, and citation-inserted confirmations are announced appropriately.

Status:
Notes:

---

## 3. Cross-cutting product checks

These are not substitutes for WCAG criteria. They are product-specific checks to help catch likely failures.

### Keyboard-only writing workflow
Confirm a user can:
- create a document,
- enter text,
- apply headings,
- navigate outline,
- insert citation,
- insert footnote,
- review bibliography,
- save or autosave,
- export a paper,
all without a mouse.

Status:
Notes:

### Dark-mode AA review
Confirm in dark theme:
- text contrast passes 1.4.3,
- non-text contrast passes 1.4.11,
- focus visibility passes 2.4.7 and 2.4.13,
- focus is not obscured under sticky UI per 2.4.11,
- controls remain understandable without relying on color alone.

Status:
Notes:

### Reflow and zoom review
Confirm at 200% zoom and narrow viewport:
- no loss of content,
- no loss of functionality,
- no clipped dialogs or menus,
- no inaccessible off-screen controls.

Status:
Notes:

### Error recovery review
Confirm:
- errors are identified,
- suggestions are given where known,
- critical submissions are reversible or confirmed when required,
- save and export failures are surfaced accessibly.

Status:
Notes:

---

## 4. Test evidence

Record how the audit was performed.

### Manual testing
- Keyboard only:
- Screen reader:
- Zoom/reflow:
- Dark mode:
- Reduced motion:
- Touch/pointer:

### Automated testing
List tools and results:
- Linting:
- Accessibility scanners:
- Contrast checks:
- End-to-end tests:

### Issues found
- Blocking:
- High:
- Medium:
- Low:

---

## 5. Release decision

A feature, flow, or screen passes this checklist only when:
- all applicable WCAG 2.2 Level A and Level AA success criteria pass,
- no applicable item is marked Fail,
- all "Needs manual verification" items have been resolved to Pass or documented as Not applicable with justification,
- dark mode and light mode have both been evaluated where the feature supports both,
- core keyboard workflows pass end to end,
- screen-reader-critical flows have been manually checked where applicable,
- no blocking accessibility defects remain in any step of a complete user process,
- findings, exceptions, and residual risks are documented.

### Decision statuses

#### Pass
Use **Pass** only when:
- all applicable WCAG 2.2 A and AA criteria pass,
- there are no open accessibility defects for the audited scope,
- the feature is release-ready for the audited scope.

#### Conditional pass
Use **Conditional pass** only when:
- no known A or AA failures remain,
- minor non-blocking follow-up work exists that does not affect conformance,
- the remaining work is documented, scheduled, and does not create a user-facing accessibility barrier.

Do **not** use Conditional pass to defer:
- an A or AA failure,
- missing keyboard support,
- missing focus visibility,
- missing labels or names,
- contrast failures,
- broken screen-reader behavior in a core flow,
- inaccessible steps in a required process.

#### Fail
Use **Fail** when:
- any applicable WCAG 2.2 Level A or Level AA criterion fails,
- any required step in a complete user process fails conformance,
- accessibility evidence is incomplete for a high-risk feature,
- a keyboard-only user cannot complete the task,
- a screen-reader user cannot reliably understand or complete the task,
- dark-mode implementation introduces an A or AA failure,
- a required manual verification item remains unresolved.

### Blocking conditions

The release must be marked **Fail** if any of the following are true:
- focus is not visible,
- focus is obscured by sticky or floating UI,
- a core action is not keyboard operable,
- a dialog, menu, or popover traps focus incorrectly,
- text contrast fails AA thresholds,
- non-text contrast fails for required controls or indicators,
- a control lacks an accessible name,
- status messages required for understanding task completion are not programmatically exposed,
- a required form step lacks error identification or usable instruction,
- a core academic workflow such as headings, citations, notes, bibliography, save, or export is inaccessible,
- a page in a multi-step required process fails conformance.

### Required follow-up record

- Decision:
- Scope audited:
- Conformance target: WCAG 2.2 Level AA
- Auditor:
- Date:
- Blocking issues:
- Non-blocking follow-ups:
- Manual checks performed:
- Assistive technologies used:
- Browsers/platforms tested:
- Final recommendation:
