'use client';

import React, { useEffect, forwardRef } from 'react';

interface DocumentEditorProps {
  fontSize: string;
  fontFamily: string;
  onWordCountChange?: (count: number) => void;
}

const INITIAL_CONTENT =
  '<p style="font-size:12pt;font-family:Calibri,sans-serif">Start typing your document here\u2026</p>';

const DocumentEditor = forwardRef<HTMLDivElement, DocumentEditorProps>(
  ({ fontSize, fontFamily, onWordCountChange }, ref) => {
    useEffect(() => {
      const el = ref && typeof ref !== 'function' ? ref.current : null;
      if (el && !el.innerHTML) {
        el.innerHTML = INITIAL_CONTENT;
      }
    }, [ref]);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const text = e.currentTarget.innerText;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      onWordCountChange?.(words);
    };

    return (
      <div
        ref={ref}
        className="document-content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{ fontFamily, fontSize: `${fontSize}pt` }}
      />
    );
  }
);

DocumentEditor.displayName = 'DocumentEditor';

export default DocumentEditor;
