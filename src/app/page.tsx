'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { asBlob } from 'html-docx-js/dist/html-docx';
import Ribbon from '@/components/Ribbon';
import DocumentEditor, { DocumentSurface } from '@/components/DocumentEditor';
import TitleBar from '@/components/TitleBar/TitleBar';
import { DocumentTextStyle, getStylePresets, StylePreset } from '@/components/Ribbon/ribbonConfig';

type TextAlignment = 'left' | 'center' | 'right' | 'justify';
type CaseMode = 'sentence' | 'lowercase' | 'uppercase' | 'capitalize' | 'toggle';
type TextEffectMode = 'none' | 'shadow' | 'outline' | 'smallCaps' | 'allCaps';

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
  // eslint-disable-next-line
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  const transformCase = useCallback((value: string, mode: CaseMode): string => {
    switch (mode) {
      case 'lowercase':
        return value.toLowerCase();
      case 'uppercase':
        return value.toUpperCase();
      case 'capitalize':
        return value.toLowerCase().replace(/\b\p{L}/gu, (match) => match.toUpperCase());
      case 'toggle':
        return value
          .split('')
          .map((char) => {
            const lower = char.toLowerCase();
            const upper = char.toUpperCase();
            if (char === lower && char !== upper) return upper;
            if (char === upper && char !== lower) return lower;
            return char;
          })
          .join('');
      case 'sentence': {
        const lower = value.toLowerCase();
        let shouldCapitalize = true;
        return lower.replace(/\p{L}|[.!?]/gu, (char) => {
          if (/[.!?]/.test(char)) {
            shouldCapitalize = true;
            return char;
          }
          if (shouldCapitalize) {
            shouldCapitalize = false;
            return char.toUpperCase();
          }
          return char;
        });
      }
      default:
        return value;
    }
  }, []);

  const applyTextEffect = useCallback((mode: TextEffectMode) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const fragment = range.extractContents();
    const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
    let textNode = walker.nextNode();
    while (textNode) {
      const currentNode = textNode as Text;
      if ((currentNode.textContent ?? '').length > 0) {
        const span = document.createElement('span');
        span.textContent = currentNode.textContent;

        if (mode === 'none') {
          span.style.textShadow = 'none';
          span.style.fontVariant = 'normal';
          span.style.textTransform = 'none';
          span.style.removeProperty('-webkit-text-stroke');
        }

        if (mode === 'shadow') {
          span.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.35)';
          span.style.fontVariant = 'normal';
          span.style.textTransform = 'none';
          span.style.removeProperty('-webkit-text-stroke');
        }

        if (mode === 'outline') {
          span.style.textShadow = 'none';
          span.style.fontVariant = 'normal';
          span.style.textTransform = 'none';
          span.style.setProperty('-webkit-text-stroke', '0.6px currentColor');
        }

        if (mode === 'smallCaps') {
          span.style.textShadow = 'none';
          span.style.fontVariant = 'small-caps';
          span.style.textTransform = 'none';
          span.style.removeProperty('-webkit-text-stroke');
        }

        if (mode === 'allCaps') {
          span.style.textShadow = 'none';
          span.style.fontVariant = 'normal';
          span.style.textTransform = 'uppercase';
          span.style.removeProperty('-webkit-text-stroke');
        }

        currentNode.replaceWith(span);
      }
      textNode = walker.nextNode();
    }

    const firstInserted = fragment.firstChild;
    const lastInserted = fragment.lastChild;
    range.insertNode(fragment);

    if (firstInserted && lastInserted) {
      const nextRange = document.createRange();
      nextRange.setStartBefore(firstInserted);
      nextRange.setEndAfter(lastInserted);
      selection.removeAllRanges();
      selection.addRange(nextRange);
    }
  }, []);

  // document.execCommand is the standard mechanism for formatting contentEditable
  // regions. While marked deprecated in the spec, all major browsers continue to
  // support it and there is no equivalent modern replacement for all commands.
  const handleFormat = useCallback((command: string, value?: string) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    const applyStylePresetToSelection = (preset: StylePreset) => {
      const applyTextStyle = (block: HTMLElement, textStyle: DocumentTextStyle) => {
        block.style.fontFamily = textStyle.fontFamily;
        block.style.fontSize = `${textStyle.fontSizePt}pt`;
        block.style.fontWeight = textStyle.fontWeight;
        block.style.fontStyle = textStyle.fontStyle ?? 'normal';
        block.style.color = textStyle.color;
      };

      const getBlockAncestor = (node: Node): HTMLElement | null => {
        let current: Node | null = node;
        while (current && current !== el) {
          if (
            current.nodeType === Node.ELEMENT_NODE &&
            ['P', 'H1', 'H2', 'H3'].includes((current as Element).tagName)
          ) {
            return current as HTMLElement;
          }
          current = current.parentNode;
        }
        return null;
      };

      const selection = window.getSelection();
      if (!selection?.rangeCount) {
        return;
      }

      const range = selection.getRangeAt(0);
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
          const tag = (node as Element).tagName;
          return ['P', 'H1', 'H2', 'H3'].includes(tag)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });

      while (walker.nextNode()) {
        const node = walker.currentNode as HTMLElement;
        if (range.intersectsNode(node)) blocks.add(node);
      }

      blocks.forEach((block) => applyTextStyle(block, preset.textStyle));
    };

    if (command === 'applyStylePreset' && value) {
      try {
        const preset = JSON.parse(value) as StylePreset;
        document.execCommand('formatBlock', false, preset.val);
        applyStylePresetToSelection(preset);
      } catch {
        // Ignore malformed style payloads and keep editor stable.
      }
      return;
    }

    if (command === 'changeCase') {
      const mode = value as CaseMode | undefined;
      if (!mode) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      if (range.collapsed) return;

      const fragment = range.extractContents();
      const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
      let textNode = walker.nextNode();
      while (textNode) {
        textNode.textContent = transformCase(textNode.textContent ?? '', mode);
        textNode = walker.nextNode();
      }

      const firstInserted = fragment.firstChild;
      const lastInserted = fragment.lastChild;
      range.insertNode(fragment);

      if (firstInserted && lastInserted) {
        const nextRange = document.createRange();
        nextRange.setStartBefore(firstInserted);
        nextRange.setEndAfter(lastInserted);
        selection.removeAllRanges();
        selection.addRange(nextRange);
      }

      return;
    }

    if (command === 'textEffect') {
      const mode = value as TextEffectMode | undefined;
      if (!mode) return;
      applyTextEffect(mode);
      return;
    }

    document.execCommand(command, false, value ?? undefined);

    if (command === 'formatBlock' && value) {
      const selectedStyle = getStylePresets(citationStyle).find((style) => style.val === value);
      if (selectedStyle) {
        applyStylePresetToSelection(selectedStyle);
      }
    }

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
  }, [applyTextEffect, citationStyle, transformCase]);

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
      pendingFontSizeRef.current = null;
      const el = editorRef.current;
      if (!el) return;
      el.focus();

      const sel = window.getSelection();
      if (!sel) return;

      let range: Range;
      if (!sel.rangeCount || !el.contains(sel.anchorNode)) {
        range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        range = sel.getRangeAt(0);
      }

      // Collapsed cursor: insert a styled empty span at the caret and place the
      // caret inside it so subsequent typing inherits this exact size.
      if (range.collapsed) {
        const span = document.createElement('span');
        span.style.fontSize = `${size}pt`;
        span.setAttribute('data-pending-font-size', '1');
        range.insertNode(span);

        const caretRange = document.createRange();
        caretRange.setStart(span, 0);
        caretRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(caretRange);

        setFontSize(size);
        return;
      }

      // Range formatting is applied immediately, so no pending caret override is needed.
      pendingFontSizeRef.current = null;

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

    // Keep existing heading and paragraph blocks aligned with the selected citation style.
    getStylePresets(style).forEach((preset) => {
      el.querySelectorAll<HTMLElement>(preset.val).forEach((block) => {
        block.style.fontFamily = preset.textStyle.fontFamily;
        block.style.fontSize = `${preset.textStyle.fontSizePt}pt`;
        block.style.fontWeight = preset.textStyle.fontWeight;
        block.style.fontStyle = preset.textStyle.fontStyle ?? 'normal';
        block.style.color = preset.textStyle.color;
      });
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

    const getDeepestLastNode = (node: Node | null): Node | null => {
      if (!node) return null;
      let current: Node = node;
      while (current.lastChild) current = current.lastChild;
      return current;
    };

    const getPreviousNode = (node: Node, root: Node): Node | null => {
      let current: Node | null = node;
      while (current && current !== root) {
        if (current.previousSibling) return current.previousSibling;
        current = current.parentNode;
      }
      return null;
    };

    const resolveCaretProbeElement = (sel: Selection, root: HTMLElement): Element | null => {
      const anchor = sel.anchorNode;
      if (!anchor) return null;

      if (anchor.nodeType === Node.TEXT_NODE) {
        if (sel.anchorOffset > 0) {
          return (anchor as Text).parentElement;
        }

        const prev = getPreviousNode(anchor, root);
        const probe = getDeepestLastNode(prev);
        return probe
          ? probe.nodeType === Node.TEXT_NODE
            ? (probe as Text).parentElement
            : (probe as Element)
          : (anchor as Text).parentElement;
      }

      const anchorEl = anchor as Element;
      if (sel.anchorOffset > 0) {
        const priorChild = anchor.childNodes[sel.anchorOffset - 1] ?? null;
        const probe = getDeepestLastNode(priorChild);
        if (probe) {
          return probe.nodeType === Node.TEXT_NODE
            ? (probe as Text).parentElement
            : (probe as Element);
        }
      }

      const prev = getPreviousNode(anchor, root);
      const probe = getDeepestLastNode(prev);
      if (probe) {
        return probe.nodeType === Node.TEXT_NODE
          ? (probe as Text).parentElement
          : (probe as Element);
      }

      return anchorEl;
    };

    // Read the computed font at the caret position (collapsed cursor).
    const getComputedAtCaret = (prop: 'fontFamily' | 'fontSize'): string => {
      const sel = window.getSelection();
      const root = editorRef.current;
      if (!sel || !root || !sel.anchorNode) return '';

      const probeElement = resolveCaretProbeElement(sel, root);
      if (!probeElement) return '';

      const computed = window.getComputedStyle(probeElement)[prop];
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

      const range = sel.getRangeAt(0);

      if (range.collapsed) {
        setFontFamily(getComputedAtCaret('fontFamily'));
        // If user picked a size for upcoming typing at a collapsed caret,
        // keep that value visible instead of snapping back to surrounding text.
        setFontSize(pendingFontSizeRef.current ?? getComputedAtCaret('fontSize'));
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
      setFontSize(pendingFontSizeRef.current ?? (sizes.size === 1 ? [...sizes][0] : ''));
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
      document.execCommand('insertHTML', false, `<span style="font-size:${size}pt">${e.data}</span>`);
    };

    const clearPendingSize = () => {
      pendingFontSizeRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Navigation keys indicate explicit caret move; stop forcing a pending size.
      if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === 'PageUp' ||
        e.key === 'PageDown'
      ) {
        clearPendingSize();
      }
    };

    el.addEventListener('beforeinput', onBeforeInput);
    el.addEventListener('mouseup', clearPendingSize);
    el.addEventListener('blur', clearPendingSize);
    el.addEventListener('keydown', onKeyDown);
    return () => {
      el.removeEventListener('beforeinput', onBeforeInput);
      el.removeEventListener('mouseup', clearPendingSize);
      el.removeEventListener('blur', clearPendingSize);
      el.removeEventListener('keydown', onKeyDown);
    };
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

  if (!isHydrated) {
    // Keep server and first client render identical to avoid Carbon tooltip/tab ID mismatches.
    return <div className="word-processor" aria-hidden="true" />;
  }

  return (
    <div className="word-processor">
      <TitleBar
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
      />

      <DocumentSurface
        scaleFactor={scaleFactor}
        toolbar={(
          <Ribbon
            onFormat={handleFormat}
            onNew={() => {
              const el = editorRef.current;
              if (!el) return;
              el.innerHTML = '<div><br></div>';
              el.focus();
              setWordCount(0);
            }}
            onOpen={() => {
              window.alert('Open is not implemented yet.');
            }}
            onDownload={handleSave}
            onPageSetup={() => {
              window.alert('Page Setup is not implemented yet.');
            }}
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
        )}
      >
        <DocumentEditor
          ref={editorRef}
          onWordCountChange={setWordCount}
          onAutosave={handleAutosave}
          onAutosaveStart={handleAutosaveStart}
          autosaveEnabled={autosaveEnabled}
        />
      </DocumentSurface>
    </div>
  );
}
