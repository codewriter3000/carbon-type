import { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import schema from './schema';
import { buildPlugins } from './plugins';
import styles from './EditorCore.module.css';

interface EditorCoreProps {
  /** Optional extra class name applied to the editor container. */
  className?: string;
}

/**
 * EditorCore — the ProseMirror editing surface.
 *
 * Accessibility contract:
 *  - The outer container div carries role="textbox", aria-multiline, and
 *    aria-label so that assistive technology identifies the editing region.
 *  - The inner ProseMirror contenteditable div does not repeat those
 *    attributes (controlled via the EditorView `attributes` option) to
 *    prevent duplicate ARIA exposure.
 *
 * Keyboard behaviour (via plugins):
 *  - Mod-b  → bold, Mod-i → italic
 *  - Mod-z  → undo, Mod-Shift-z → redo
 *  - Enter  → insert hard break (inline line break within a block)
 *  - All standard ProseMirror navigation keys
 */
export function EditorCore({ className }: EditorCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Minimal valid initial document: one empty title + one empty paragraph.
    const initialDoc = schema.node('doc', null, [
      schema.node('title', null, []),
      schema.node('paragraph', null, []),
    ]);

    const state = EditorState.create({
      schema,
      plugins: buildPlugins(),
      doc: initialDoc,
    });

    const view = new EditorView(containerRef.current, {
      state,
      // ARIA is handled on the outer container div.
      // This option prevents accidental duplication on the inner
      // ProseMirror contenteditable element.
      attributes: {
        'data-editor-content': '',
      },
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[styles.editor, className].filter(Boolean).join(' ')}
      role="textbox"
      aria-multiline="true"
      aria-label="Document editor"
    />
  );
}
