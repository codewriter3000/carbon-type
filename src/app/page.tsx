'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@carbon/react';
import { Save, Undo, Redo, Printer } from '@carbon/icons-react';
import Ribbon from '@/components/Ribbon/Ribbon';
import DocumentEditor from '@/components/DocumentEditor/DocumentEditor';

export default function WordProcessor() {
  const editorRef = useRef<HTMLDivElement>(null);

  const [documentName] = useState('Document1');
  const [wordCount, setWordCount] = useState(0);
  const [fontFamily, setFontFamily] = useState('Calibri');
  const [fontSize, setFontSize] = useState('12');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState('left');
  const [zoom, setZoom] = useState(100);

  // document.execCommand is the standard mechanism for formatting contentEditable
  // regions. While marked deprecated in the spec, all major browsers continue to
  // support it and there is no equivalent modern replacement for all commands.
  const handleFormat = useCallback((command: string, value?: string) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    document.execCommand(command, false, value ?? undefined);

    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));

    if (document.queryCommandState('justifyCenter')) setAlignment('center');
    else if (document.queryCommandState('justifyRight')) setAlignment('right');
    else if (document.queryCommandState('justifyFull')) setAlignment('justify');
    else setAlignment('left');
  }, []);

  const handleFontFamilyChange = useCallback(
    (family: string) => {
      setFontFamily(family);
      handleFormat('fontName', family);
    },
    [handleFormat]
  );

  const handleFontSizeChange = useCallback(
    (size: string) => {
      setFontSize(size);
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = `${size}pt`;
        try {
          range.surroundContents(span);
        } catch {
          document.execCommand(
            'insertHTML',
            false,
            `<span style="font-size:${size}pt">${selection.toString()}</span>`
          );
        }
      }
    },
    []
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setZoom((prev) => {
      if (delta === 0) return 100;
      return Math.min(200, Math.max(50, prev + delta));
    });
  }, []);

  // Scale factor as a fraction (e.g. 0.8 for 80%)
  const scaleFactor = zoom / 100;

  return (
    <div className="word-processor">
      {/* Title Bar */}
      <div className="word-title-bar">
        <div className="word-title-bar__quick-access">
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Save}
            iconDescription="Save"
            tooltipPosition="bottom"
          />
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Undo}
            iconDescription="Undo"
            tooltipPosition="bottom"
            onClick={() => handleFormat('undo')}
          />
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Redo}
            iconDescription="Redo"
            tooltipPosition="bottom"
            onClick={() => handleFormat('redo')}
          />
        </div>

        <div className="word-title-bar__document-title">
          {documentName} — Carbon Type
        </div>

        <div className="word-title-bar__right">
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Printer}
            iconDescription="Print"
            tooltipPosition="bottom"
            onClick={handlePrint}
          />
        </div>
      </div>

      {/* Ribbon */}
      <Ribbon
        onFormat={handleFormat}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onFontSizeChange={handleFontSizeChange}
        onFontFamilyChange={handleFontFamilyChange}
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        alignment={alignment}
        onPrint={handlePrint}
        onZoom={handleZoom}
      />

      {/* Document Canvas — grey background, scrollable */}
      <div className="document-canvas">
        {/* Document Page — white paper, scaled for zoom */}
        <div
          className="document-page"
          style={{
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'top center',
            // Compensate layout space so the canvas scrollbar reflects true content height
            marginBottom: `${(scaleFactor - 1) * 1056}px`,
          }}
        >
          <DocumentEditor
            ref={editorRef}
            fontSize={fontSize}
            fontFamily={fontFamily}
            onWordCountChange={setWordCount}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="word-status-bar">
        <span>Page 1 of 1</span>
        <span className="word-status-bar__divider">|</span>
        <span>Words: {wordCount}</span>
        <span className="word-status-bar__divider">|</span>
        <span>Zoom: {zoom}%</span>
      </div>
    </div>
  );
}
