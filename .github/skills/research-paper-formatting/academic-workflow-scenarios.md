# Academic Workflow Scenarios

Use these scenarios to design, review, or test research-paper-focused features.

## Scenario 1: Start a new paper

### User goal
A student starts a new research paper and wants a sensible academic structure without manually formatting everything.

### Expected workflow
- Open a new paper.
- Enter title and optional metadata.
- Start writing with accessible default paragraph and heading behavior.
- Add sections through heading tools or keyboard commands.
- Navigate the outline.

### Product expectations
- The paper starts from a structure suited to academic writing.
- Headings are semantic, not only visual.
- Keyboard users can create and navigate sections efficiently.

## Scenario 2: Insert a citation while writing

### User goal
A student is drafting a paragraph and needs to insert a citation without losing writing flow.

### Expected workflow
- Open citation insertion UI from keyboard or toolbar.
- Search or create a source.
- Insert the citation at the cursor.
- Continue typing without broken punctuation or awkward cursor behavior.

### Product expectations
- Citation insertion is predictable.
- The citation is stored as structured data where supported.
- The user does not have to manually rebuild formatting after insertion.
- The workflow is accessible to screen readers.

## Scenario 3: Add a footnote

### User goal
A student wants to add supporting information as a footnote.

### Expected workflow
- Insert footnote from keyboard or toolbar.
- Move into note content intentionally.
- Return to the main text intentionally.
- Preserve numbering and note linkage across edits.

### Product expectations
- Note references and note bodies stay synchronized.
- Navigation between note reference and note body is understandable.
- Export preserves the note structure as well as possible.

## Scenario 4: Review the paper outline

### User goal
A student wants to scan and reorganize a long paper by heading structure.

### Expected workflow
- Open outline view.
- Move through headings with keyboard.
- Jump to a section.
- Understand the nesting level of sections.

### Product expectations
- Heading levels are exposed structurally.
- The outline is accessible and readable.
- The current section and selected section are clearly distinguishable.

## Scenario 5: Build or update the bibliography

### User goal
A student wants the bibliography or works-cited section to reflect the sources used.

### Expected workflow
- Review existing source entries.
- Update source metadata if needed.
- Generate or refresh bibliography output where supported.
- Verify ordering and content.

### Product expectations
- Bibliography logic is deterministic.
- Repeated sources do not create confusing duplication.
- The workflow preserves source identity and remains export-aware.

## Scenario 6: Continue after interruption

### User goal
A student refreshes the page or returns later and expects work to be intact.

### Expected workflow
- Reopen the document.
- Recover the latest valid content.
- Preserve citations, notes, headings, and document preferences.
- Resume writing without confusion.

### Product expectations
- Autosave and restore are trustworthy.
- The recovered document is structurally valid.
- Theme and accessibility preferences persist where intended.

## Scenario 7: Export the finished paper

### User goal
A student wants to submit the paper as a finished document.

### Expected workflow
- Open export or print options.
- Choose a target format such as PDF or DOCX.
- Export with headings, citations, notes, bibliography, and page intent preserved as much as possible.
- Understand any limitations if they exist.

### Product expectations
- Export is understandable and predictable.
- Failures are surfaced clearly.
- Structural fidelity matters more than cosmetic mimicry.

## Scenario 8: Use the app entirely by keyboard

### User goal
A user writes, formats, cites, navigates, and exports without using a mouse.

### Expected workflow
- Navigate all major areas with keyboard.
- Trigger commands and dialogs from keyboard.
- Move between editor, outline, citations, notes, and export controls.
- Keep track of focus and current location at all times.

### Product expectations
- Keyboard workflows are first-class.
- Focus is visible in dark mode.
- Modal and panel behavior is consistent.
- No critical workflow depends on pointer-only actions.

## Review questions for any scenario

- Is the workflow realistic for an actual student paper?
- Does the user perform the task with minimal manual formatting?
- Is the structure explicit and preservable?
- Is the flow accessible?
- Can the behavior be tested and exported reliably?