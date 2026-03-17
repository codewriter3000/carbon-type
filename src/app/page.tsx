'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { asBlob } from 'html-docx-js/dist/html-docx';
import Ribbon from '@/components/Ribbon/Ribbon';
import DocumentEditor from '@/components/DocumentEditor/DocumentEditor';
import WordTitleBar from '@/components/WordTitleBar/WordTitleBar';
import WordStatusBar from '@/components/WordStatusBar/WordStatusBar';

type TextAlignment = 'left' | 'center' | 'right' | 'justify';

const CITATION_CONFIGS = {
  'APA v7':  { fontFamily: 'Calibri',          fontSize: '11', lineSpacing: '2.0', alignment: 'left' as TextAlignment, firstLineIndent: '0.5in' },
  'APA v6':  { fontFamily: 'Times New Roman',   fontSize: '12', lineSpacing: '2.0', alignment: 'left' as TextAlignment, firstLineIndent: '0.5in' },
  'MLA':     { fontFamily: 'Times New Roman',   fontSize: '12', lineSpacing: '2.0', alignment: 'left' as TextAlignment, firstLineIndent: '0.5in' },
  'Chicago': { fontFamily: 'Times New Roman',   fontSize: '12', lineSpacing: '2.0', alignment: 'left' as TextAlignment, firstLineIndent: '0.5in' },
} as const;

export default function WordProcessor() {
  const editorRef = useRef<HTMLDivElement>(null);
  // Holds a font size to apply to the next typed character (collapsed-cursor case).
  // Using a ref avoids re-renders and is cleared either on first keystroke or cursor move.
  const pendingFontSizeRef = useRef<string | null>(null);

  const [documentName] = useState('Document1');
  const [wordCount, setWordCount] = useState(0);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  const [autosaveStatus, setAutosaveStatus] = useState<'' | 'saving' | 'saved'>('');
  const autosaveClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAutosaveStart = useCallback(() => {
    if (autosaveClearTimerRef.current) clearTimeout(autosaveClearTimerRef.current);
    setAutosaveStatus('saving');
  }, []);

  const handleAutosave = useCallback(() => {
    setAutosaveStatus('saved');
    autosaveClearTimerRef.current = setTimeout(() => setAutosaveStatus(''), 2000);
  }, []);
  const [fontFamily, setFontFamily] = useState('Calibri');
  const [fontSize, setFontSize] = useState('12');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [lineSpacing, setLineSpacing] = useState('1.5');
  const [citationStyle, setCitationStyle] = useState('');
  const [alignment, setAlignment] = useState('left');
  const [zoom, setZoom] = useState(100);

  // Convert <font face="..."> tags (created by execCommand) to <span style="font-family: '...'"> so
  // that Word's HTML renderer handles multi-word font names (e.g. Times New Roman) reliably.
  const sanitizeForExport = useCallback((html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    doc.querySelectorAll('font[face]').forEach((el) => {
      const span = doc.createElement('span');
      span.style.fontFamily = `'${el.getAttribute('face')}'`;
      while (el.firstChild) span.appendChild(el.firstChild);
      el.replaceWith(span);
    });
    return doc.body.firstElementChild?.innerHTML ?? html;
  }, []);

  const handleSave = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const content = sanitizeForExport(el.innerHTML);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: '${fontFamily}'; font-size: ${fontSize}pt;">${content}</body></html>`;
    const docx = asBlob(html);
    const url = URL.createObjectURL(docx);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentName}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  }, [documentName, fontFamily, fontSize, sanitizeForExport]);

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
    setIsStrikethrough(document.queryCommandState('strikeThrough'));
    setIsSubscript(document.queryCommandState('subscript'));
    setIsSuperscript(document.queryCommandState('superscript'));
    setIsUnorderedList(document.queryCommandState('insertUnorderedList'));
    setIsOrderedList(document.queryCommandState('insertOrderedList'));

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
      if (!size) return;
      setFontSize(size);
      const el = editorRef.current;
      if (!el) return;
      el.focus();

      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;

      // Collapsed cursor: don't touch the DOM at all — that would inflate the line
      // height and potentially move the cursor. Instead, store the size as pending;
      // the beforeinput handler will wrap the first typed character in a span.
      if (sel.isCollapsed) {
        pendingFontSizeRef.current = size;
        // Re-assert setFontSize so it wins over any selectionchange-triggered reset
        // that fires synchronously inside el.focus() above (React 19 batches both).
        setFontSize(size);
        return;
      }

      // Non-collapsed selection: use execCommand('fontSize', '7') as a structural
      // marker — the browser handles all cross-element selection edge cases —
      // then replace every inserted <font size="7"> with a proper inline span.
      document.execCommand('fontSize', false, '7');

      el.querySelectorAll('font[size="7"]').forEach((font) => {
        const span = document.createElement('span');
        span.style.fontSize = `${size}pt`;
        span.append(...Array.from(font.childNodes));
        font.replaceWith(span);

        // Strip nested font-size overrides so the new size cascades down uniformly.
        span.querySelectorAll<HTMLElement>('[style]').forEach((child) => {
          child.style.removeProperty('font-size');
          if (!child.getAttribute('style')?.trim()) {
            child.removeAttribute('style');
          }
        });
      });
    },
    []
  );

  const handleLineSpacingChange = useCallback((spacing: string) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      setLineSpacing(spacing);
      return;
    }

    const range = sel.getRangeAt(0);
    const BLOCK_TAGS = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE']);

    const getBlockAncestor = (node: Node): HTMLElement | null => {
      let n: Node | null = node;
      while (n && n !== el) {
        if (n.nodeType === Node.ELEMENT_NODE && BLOCK_TAGS.has((n as Element).tagName)) {
          return n as HTMLElement;
        }
        n = n.parentNode;
      }
      return null;
    };

    if (range.collapsed) {
      const block = getBlockAncestor(sel.anchorNode!);
      const target = block ?? el;
      target.style.lineHeight = spacing;
    } else {
      const blocks = new Set<HTMLElement>();
      const startBlock = getBlockAncestor(range.startContainer);
      const endBlock = getBlockAncestor(range.endContainer);
      if (startBlock) blocks.add(startBlock);
      if (endBlock) blocks.add(endBlock);

      const ancestor = range.commonAncestorContainer;
      const walkerRoot =
        ancestor.nodeType === Node.ELEMENT_NODE
          ? (ancestor as Element)
          : (ancestor.parentElement ?? el);

      const walker = document.createTreeWalker(walkerRoot, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
          return BLOCK_TAGS.has((node as Element).tagName)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });
      while (walker.nextNode()) {
        const node = walker.currentNode as HTMLElement;
        if (range.intersectsNode(node)) blocks.add(node);
      }

      if (blocks.size === 0) {
        el.style.lineHeight = spacing;
      } else {
        blocks.forEach((b) => { b.style.lineHeight = spacing; });
      }
    }

    setLineSpacing(spacing);
  }, []);

  const handleCitationStyleChange = useCallback((style: string) => {
    const el = editorRef.current;
    if (!el) return;
    const config = CITATION_CONFIGS[style as keyof typeof CITATION_CONFIGS];
    if (!config) return;

    el.focus();

    // Save current selection so we can restore it after select-all.
    const sel = window.getSelection();
    const savedRange = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;

    // Select all, then apply font family and size to the entire document.
    document.execCommand('selectAll');
    document.execCommand('fontName', false, config.fontFamily);

    // Font-size via the size-7 marker technique (same as handleFontSizeChange).
    document.execCommand('fontSize', false, '7');
    el.querySelectorAll('font[size="7"]').forEach((font) => {
      const span = document.createElement('span');
      span.style.fontSize = `${config.fontSize}pt`;
      span.append(...Array.from(font.childNodes));
      font.replaceWith(span);
      span.querySelectorAll<HTMLElement>('[style]').forEach((child) => {
        child.style.removeProperty('font-size');
        if (!child.getAttribute('style')?.trim()) child.removeAttribute('style');
      });
    });

    // Alignment.
    const alignCmd: string =
      config.alignment === 'center'  ? 'justifyCenter' :
      config.alignment === 'right'   ? 'justifyRight'  :
      config.alignment === 'justify' ? 'justifyFull'   : 'justifyLeft';
    document.execCommand(alignCmd);

    // Restore saved selection.
    if (sel) {
      sel.removeAllRanges();
      if (savedRange) sel.addRange(savedRange);
    }

    // Apply line spacing and first-line paragraph indent to all block elements.
    el.querySelectorAll<HTMLElement>('p, h1, h2, h3, h4, h5, h6, li').forEach((block) => {
      block.style.lineHeight = config.lineSpacing;
      block.style.textIndent = config.firstLineIndent;
    });
    // Set font, size, and line-height on the editor root so new paragraphs
    // inherit them and so getComputedStyle at any cursor position returns the
    // correct values (prevents selectionchange from snapping font back to the
    // CSS-class default of Calibri).
    el.style.fontFamily = config.fontFamily;
    el.style.fontSize = `${config.fontSize}pt`;
    el.style.lineHeight = config.lineSpacing;
    // Store on the element so CSS can also key off the chosen style.
    el.dataset.citationStyle = style;

    // Sync UI state.
    setCitationStyle(style);
    setFontFamily(config.fontFamily);
    setFontSize(config.fontSize);
    setLineSpacing(config.lineSpacing);
    setAlignment(config.alignment);
  }, []);

  // Sync both font dropdowns to wherever the cursor/selection is.
  useEffect(() => {
    const pxToPt = (px: string) => String(Math.round(parseFloat(px) * 0.75));

    // Walk every text node within a range and collect unique values of a computed CSS property.
    const getComputedValuesInRange = (range: Range, prop: 'fontFamily' | 'fontSize'): Set<string> => {
      const values = new Set<string>();
      const root = range.commonAncestorContainer;
      const startEl =
        root.nodeType === Node.TEXT_NODE ? root.parentElement! : (root as Element);
      const walker = document.createTreeWalker(startEl, NodeFilter.SHOW_TEXT);
      let node: Node | null = walker.nextNode();
      while (node) {
        if (range.intersectsNode(node)) {
          const parent = node.parentElement;
          if (parent) {
            const raw = window.getComputedStyle(parent)[prop];
            const value =
              prop === 'fontFamily'
                ? raw.split(',')[0].trim().replace(/^["']|["']$/g, '')
                : pxToPt(raw);
            if (value) values.add(value);
          }
        }
        node = walker.nextNode();
      }
      return values;
    };

    // Read the computed font at a single element (collapsed cursor).
    const getComputedAtCaret = (prop: 'fontFamily' | 'fontSize'): string => {
      const raw = document.queryCommandValue(
        prop === 'fontFamily' ? 'fontName' : 'fontSize'
      );
      // For fontName Chrome returns the actual name; for fontSize it returns 1-7 legacy values.
      // Use computed style on the anchor node's parent instead for accuracy.
      const sel = window.getSelection();
      if (!sel || !sel.anchorNode) return '';
      const parent =
        sel.anchorNode.nodeType === Node.TEXT_NODE
          ? sel.anchorNode.parentElement
          : (sel.anchorNode as Element);
      if (!parent) return raw;
      const computed = window.getComputedStyle(parent)[prop];
      return prop === 'fontFamily'
        ? computed.split(',')[0].trim().replace(/^["']|["']$/g, '')
        : pxToPt(computed);
    };

    const onSelectionChange = () => {
      const el = editorRef.current;
      if (!el) return;
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;
      if (!el.contains(sel.anchorNode)) return;

      // Cursor moved — any pending font-size no longer applies to future typing.
      pendingFontSizeRef.current = null;

      const range = sel.getRangeAt(0);

      if (range.collapsed) {
        setFontFamily(getComputedAtCaret('fontFamily'));
        setFontSize(getComputedAtCaret('fontSize'));
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
        setIsStrikethrough(document.queryCommandState('strikeThrough'));
        setIsSubscript(document.queryCommandState('subscript'));
        setIsSuperscript(document.queryCommandState('superscript'));
        setIsUnorderedList(document.queryCommandState('insertUnorderedList'));
        setIsOrderedList(document.queryCommandState('insertOrderedList'));
        return;
      }

      const fonts = getComputedValuesInRange(range, 'fontFamily');
      setFontFamily(fonts.size === 1 ? [...fonts][0] : '');

      const sizes = getComputedValuesInRange(range, 'fontSize');
      setFontSize(sizes.size === 1 ? [...sizes][0] : '');
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
      setIsUnderline(document.queryCommandState('underline'));
      setIsStrikethrough(document.queryCommandState('strikeThrough'));
      setIsSubscript(document.queryCommandState('subscript'));
      setIsSuperscript(document.queryCommandState('superscript'));
      setIsUnorderedList(document.queryCommandState('insertUnorderedList'));
      setIsOrderedList(document.queryCommandState('insertOrderedList'));
    };

    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
  }, []);

  // Apply pending font size to the first character typed after a collapsed-cursor size change.
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const onBeforeInput = (e: InputEvent) => {
      if (e.inputType !== 'insertText' || !pendingFontSizeRef.current || !e.data) return;
      e.preventDefault();
      const size = pendingFontSizeRef.current;
      pendingFontSizeRef.current = null;
      document.execCommand('insertHTML', false, `<span style="font-size:${size}pt">${e.data}</span>`);
    };
    el.addEventListener('beforeinput', onBeforeInput);
    return () => el.removeEventListener('beforeinput', onBeforeInput);
  }, []);

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
      <WordTitleBar
        documentName={documentName}
        autosaveEnabled={autosaveEnabled}
        autosaveStatus={autosaveStatus}
        onAutosaveToggle={(checked: boolean) => {
          setAutosaveEnabled(checked);
          if (!checked) {
            if (autosaveClearTimerRef.current) clearTimeout(autosaveClearTimerRef.current);
            setAutosaveStatus('');
          }
        }}
        onSave={handleSave}
        onUndo={() => handleFormat('undo')}
        onRedo={() => handleFormat('redo')}
        onPrint={handlePrint}
      />

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
        isStrikethrough={isStrikethrough}
        isSubscript={isSubscript}
        isSuperscript={isSuperscript}
        isUnorderedList={isUnorderedList}
        isOrderedList={isOrderedList}
        alignment={alignment}
        onPrint={handlePrint}
        onZoom={handleZoom}
        lineSpacing={lineSpacing}
        onLineSpacingChange={handleLineSpacingChange}
        citationStyle={citationStyle}
        onCitationStyleChange={handleCitationStyleChange}
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
            onWordCountChange={setWordCount}
            onAutosave={handleAutosave}
            onAutosaveStart={handleAutosaveStart}
            autosaveEnabled={autosaveEnabled}
          />
        </div>
      </div>

      <WordStatusBar wordCount={wordCount} zoom={zoom} />
    </div>
  );
}
