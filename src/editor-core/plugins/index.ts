import { Plugin } from 'prosemirror-state';
import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { gapCursor } from 'prosemirror-gapcursor';
import { inputRules, InputRule } from 'prosemirror-inputrules';
import schema from '../schema';

/**
 * Input rules for common markdown-like shorthand:
 *   *text*   → em
 *   **text** → strong  (checked first — longer pattern takes priority)
 *   `text`   → code
 */
function buildInputRules(): Plugin {
  const rules: InputRule[] = [
    new InputRule(/\*\*([^*\s][^*]*)\*\*$/, (state, match, start, end) => {
      const content = match[1] ?? '';
      if (!content) return null;
      return state.tr.replaceWith(
        start,
        end,
        schema.text(content, [schema.marks.strong.create()])
      );
    }),

    new InputRule(/\*([^*\s][^*]*)\*$/, (state, match, start, end) => {
      const content = match[1] ?? '';
      if (!content) return null;
      return state.tr.replaceWith(
        start,
        end,
        schema.text(content, [schema.marks.em.create()])
      );
    }),

    new InputRule(/`([^`]+)`$/, (state, match, start, end) => {
      const content = match[1] ?? '';
      if (!content) return null;
      return state.tr.replaceWith(
        start,
        end,
        schema.text(content, [schema.marks.code.create()])
      );
    }),
  ];

  return inputRules({ rules });
}

/**
 * Build the complete plugin array for the editor.
 * Plugin order matters: earlier plugins have higher key-binding priority.
 */
export function buildPlugins(): Plugin[] {
  return [
    history(),

    keymap({
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-z': undo,
      'Mod-Shift-z': redo,
      Enter: (state, dispatch) => {
        if (!dispatch) return false;
        dispatch(
          state.tr
            .replaceSelectionWith(schema.nodes.hard_break.create())
            .scrollIntoView()
        );
        return true;
      },
    }),

    keymap(baseKeymap),

    gapCursor(),

    buildInputRules(),
  ];
}
