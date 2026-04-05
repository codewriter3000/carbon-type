import { Command } from 'prosemirror-state';
import { toggleMark, setBlockType } from 'prosemirror-commands';
import schema from '../schema';

/** Toggle the em (italic) mark on the current selection. */
export const toggleItalic: Command = toggleMark(schema.marks.em);

/** Toggle the strong (bold) mark on the current selection. */
export const toggleBold: Command = toggleMark(schema.marks.strong);

/** Toggle the inline code mark on the current selection. */
export const toggleCode: Command = toggleMark(schema.marks.code);

/** Toggle the underline mark on the current selection. */
export const toggleUnderline: Command = toggleMark(schema.marks.underline);

/**
 * Set the current block to a heading of the given level (1–6).
 * Returns a Command so callers can bind it to a key or toolbar button.
 */
export function setHeading(level: 1 | 2 | 3 | 4 | 5 | 6): Command {
  return setBlockType(schema.nodes.heading, { level });
}

/**
 * Insert a hard line break (<br>) at the cursor position.
 * This breaks the line within the same block without creating a new paragraph.
 */
export const insertHardBreak: Command = (state, dispatch) => {
  if (!dispatch) return false;
  dispatch(
    state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView()
  );
  return true;
};
