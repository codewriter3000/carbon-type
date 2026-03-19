'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import styles from './DocumentEditor.module.scss';

const AUTOSAVE_KEY = 'carbon-type-autosave';
const AUTOSAVE_DEBOUNCE_MS = 1000;

interface DocumentEditorProps {
  onWordCountChange?: (count: number) => void;
  onAutosave?: () => void;
  onAutosaveStart?: () => void;
  autosaveEnabled?: boolean;
}

const INITIAL_CONTENT = '';
const BLOCK_LEVEL_TAGS = new Set([
  'DIV',
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  'PRE',
  'TABLE',
  'HR',
]);

const isBlockNode = (node: Node): boolean =>
  node.nodeType === Node.ELEMENT_NODE && BLOCK_LEVEL_TAGS.has((node as Element).tagName);

const ensureRootContainer = (el: HTMLDivElement) => {
  // Guarantee at least one child container under the editable surface.
  if (!el.firstChild) {
    const line = document.createElement('div');
    line.appendChild(document.createElement('br'));
    el.appendChild(line);
    return;
  }

  // If content is inline/text at the root level, keep it in one inline parent
  // to avoid creating a new block line on each keystroke.
  const hasBlockChild = Array.from(el.childNodes).some((child) => isBlockNode(child));
  if (!hasBlockChild) {
    const isSingleInlineWrapper =
      el.childNodes.length === 1 &&
      el.firstChild?.nodeType === Node.ELEMENT_NODE &&
      (el.firstChild as Element).tagName === 'SPAN';

    if (!isSingleInlineWrapper) {
      const wrapper = document.createElement('span');
      wrapper.setAttribute('data-root-inline', '1');
      while (el.firstChild) {
        wrapper.appendChild(el.firstChild);
      }
      el.appendChild(wrapper);
    }
  }
};

const DocumentEditor = forwardRef<HTMLDivElement, DocumentEditorProps>(
  ({ onWordCountChange, onAutosave, onAutosaveStart, autosaveEnabled = true }, ref) => {
    const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Restore from localStorage on mount; fall back to empty content.
    useEffect(() => {
      const el = ref && typeof ref !== 'function' ? ref.current : null;
      if (!el) return;

      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        el.innerHTML = saved;
        ensureRootContainer(el);
        const text = el.innerText;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        onWordCountChange?.(words);
      } else if (!el.innerHTML) {
        el.innerHTML = INITIAL_CONTENT;
        ensureRootContainer(el);
      }

      // Flush any pending save and persist the current content on unmount.
      return () => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        const html = el.innerHTML;
        if (html) localStorage.setItem(AUTOSAVE_KEY, html);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    // Scroll the cursor into view when the soft keyboard opens on mobile.
    // The Visual Viewport API fires a "resize" event whenever the visible area
    // shrinks (e.g. keyboard appearing). If the cursor ends up below the new
    // viewport bottom we nudge it back into view.
    useEffect(() => {
      const vv = window.visualViewport;
      if (!vv) return;

      const scrollCursorIntoView = () => {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;

        const rects = sel.getRangeAt(0).getClientRects();
        if (!rects.length) return;
        const cursorRect = rects[rects.length - 1];

        if (cursorRect.bottom > vv.offsetTop + vv.height) {
          const focusEl =
            sel.focusNode?.nodeType === Node.TEXT_NODE
              ? sel.focusNode.parentElement
              : (sel.focusNode as Element | null);
          focusEl?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      };

      vv.addEventListener('resize', scrollCursorIntoView);
      return () => vv.removeEventListener('resize', scrollCursorIntoView);
    }, []);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const text = el.innerText;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      onWordCountChange?.(words);

      if (!autosaveEnabled) return;

      // Signal that a save is now pending (debounce ticking).
      onAutosaveStart?.();

      // Debounced autosave: read the latest innerHTML when the timer fires.
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        const editorEl = ref && typeof ref !== 'function' ? ref.current : null;
        if (editorEl) {
          localStorage.setItem(AUTOSAVE_KEY, editorEl.innerHTML);
          onAutosave?.();
        }
      }, AUTOSAVE_DEBOUNCE_MS);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertHTML', false, '<span data-tab="1">\u00a0\u00a0\u00a0\u00a0</span>');
        return;
      }

      if (e.key === 'Backspace') {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount || !sel.isCollapsed) return;

        const { startContainer, startOffset } = sel.getRangeAt(0);

        // Case 1: caret is inside a data-tab span (Chrome places caret here after insertion).
        const anchor =
          startContainer.nodeType === Node.TEXT_NODE
            ? startContainer.parentElement
            : (startContainer as Element);
        const tabSpan = anchor?.closest('[data-tab]');
        if (tabSpan) {
          e.preventDefault();
          tabSpan.parentNode?.removeChild(tabSpan);
          return;
        }

        // Case 2: caret is in the parent element immediately after a data-tab span.
        let prevNode: Node | null = null;
        if (startOffset === 0) {
          prevNode = startContainer.previousSibling;
        } else if (startContainer.nodeType === Node.ELEMENT_NODE) {
          prevNode = (startContainer as Element).childNodes[startOffset - 1];
        }
        if (
          prevNode?.nodeType === Node.ELEMENT_NODE &&
          (prevNode as Element).hasAttribute('data-tab')
        ) {
          e.preventDefault();
          prevNode.parentNode?.removeChild(prevNode);
        }
      }
    };

    return (
      <div
        ref={ref}
        className={styles.content}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

DocumentEditor.displayName = 'DocumentEditor';

export default DocumentEditor;
