'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Button } from '@carbon/react';
import {
  TextBold,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  ListBulleted,
  ListNumbered,
  Cut,
  Copy,
  Paste,
  Undo,
  Redo,
  Search,
  Table,
  Image,
  Link,
  TextIndentMore,
  TextIndentLess,
  TextSubscript,
  TextSuperscript,
  TextHighlight,
  TextClearFormat,
  TextLineSpacing,
  SpellCheck,
  ZoomIn,
  ZoomOut,
  Printer,
  ChevronDown,
} from '@carbon/icons-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RibbonProps {
  onFormat: (command: string, value?: string) => void;
  fontSize: string;
  fontFamily: string;
  onFontSizeChange: (size: string) => void;
  onFontFamilyChange: (family: string) => void;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isUnorderedList: boolean;
  isOrderedList: boolean;
  alignment: string;
  onPrint: () => void;
  onZoom: (delta: number) => void;
  lineSpacing: string;
  onLineSpacingChange: (spacing: string) => void;
  citationStyle: string;
  onCitationStyleChange: (style: string) => void;
}

// ─── Helper sub-components ────────────────────────────────────────────────────

const RibbonChunk = ({
  label,
  children,
  launcher,
}: {
  label: string;
  children: React.ReactNode;
  launcher?: React.ReactNode;
}) => (
  <div className="ribbon-chunk">
    <div className="ribbon-chunk__controls">{children}</div>
    <div className="ribbon-chunk__label">
      <span>{label}</span>
      {launcher && <span className="ribbon-chunk__launcher">{launcher}</span>}
    </div>
  </div>
);

const RibbonDivider = () => <div className="ribbon-divider" />;

// ─── Dialog Launcher Icon ────────────────────────────────────────────────────

const DialogLauncherIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1" stroke="currentColor" strokeWidth="1" />
    <path
      d="M3.5 3.5 L6.5 6.5 M6.5 6.5 L4.5 6.5 M6.5 6.5 L6.5 4.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Citation Style Dropdown ─────────────────────────────────────────────────

const CITATION_STYLE_OPTIONS = ['APA v7', 'APA v6', 'MLA', 'Chicago'] as const;

interface CitationStyleDropdownProps {
  value: string;
  onChange: (style: string) => void;
}

const CitationStyleDropdown = ({ value, onChange }: CitationStyleDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [menuPos, setMenuPos] = React.useState({ top: 0, left: 0 });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!wrapperRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 2, left: rect.left });
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={wrapperRef} className="citation-style-launcher">
      <button
        ref={btnRef}
        type="button"
        className="citation-style-launcher-btn"
        onClick={handleToggle}
        aria-label="Citation and document style"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Citation &amp; Document Style"
      >
        <DialogLauncherIcon />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="citation-style-menu"
          role="listbox"
          aria-label="Citation style options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {CITATION_STYLE_OPTIONS.map((s) => (
            <li key={s} role="option" aria-selected={s === value}>
              <button
                type="button"
                className={`citation-style-menu-item${s === value ? ' citation-style-menu-item--active' : ''}`}
                onClick={() => { onChange(s); setOpen(false); }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

// ─── Ribbon ───────────────────────────────────────────────────────────────────

const FONTS = [
  'Calibri',
  'Arial',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Tahoma',
  'Impact',
];
const SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'];

const STYLES: { label: string; cmd: string; val: string }[] = [
  { label: 'Normal', cmd: 'formatBlock', val: 'p' },
  { label: 'Heading 1', cmd: 'formatBlock', val: 'h1' },
  { label: 'Heading 2', cmd: 'formatBlock', val: 'h2' },
  { label: 'Heading 3', cmd: 'formatBlock', val: 'h3' },
];

const LINE_SPACINGS = ['1.0', '1.15', '1.5', '2.0', '2.5', '3.0'];

interface LineSpacingDropdownProps {
  value: string;
  onChange: (spacing: string) => void;
}

const LineSpacingDropdown = ({ value, onChange }: LineSpacingDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [menuPos, setMenuPos] = React.useState({ top: 0, left: 0 });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!wrapperRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom, left: rect.left });
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={wrapperRef} className="line-spacing-dropdown">
      <button
        ref={btnRef}
        type="button"
        className="line-spacing-btn"
        onClick={handleToggle}
        aria-label="Line Spacing"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <TextLineSpacing size={16} />
        <ChevronDown size={12} />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="line-spacing-menu"
          role="listbox"
          aria-label="Line spacing options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {LINE_SPACINGS.map((s) => (
            <li key={s} role="option" aria-selected={s === value}>
              <button
                type="button"
                className={`line-spacing-menu-item${s === value ? ' line-spacing-menu-item--active' : ''}`}
                onClick={() => { onChange(s); setOpen(false); }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

const Ribbon = ({
  onFormat,
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange,
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  isUnorderedList,
  isOrderedList,
  alignment,
  onPrint,
  onZoom,
  lineSpacing,
  onLineSpacingChange,
  citationStyle,
  onCitationStyleChange,
}: RibbonProps) => {
  const fmt = (cmd: string, val?: string) => () => onFormat(cmd, val);

  return (
    <div className="word-ribbon">
      <Tabs>
        <TabList aria-label="Ribbon tabs">
          <Tab>Home</Tab>
          {/* <Tab>Insert</Tab>
          <Tab>Page Layout</Tab>
          <Tab>References</Tab>
          <Tab>Review</Tab>
          <Tab>View</Tab> */}
        </TabList>

        <TabPanels>
          {/* ── Home ─────────────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              {/* Clipboard */}
              <RibbonChunk label="Clipboard">
                <div className="ribbon-clipboard">
                  <div className="ribbon-clipboard__paste">
                    <Button className="items-center"
                      kind="ghost"
                      size="sm"
                      hasIconOnly
                      renderIcon={Paste}
                      iconDescription="Paste"
                      tooltipPosition="bottom"
                      onClick={fmt('paste')}
                    >
                    </Button>
                  </div>
                  <div className="ribbon-clipboard__small">
                    <Button className="items-center"
                      kind="ghost"
                      size="sm"
                      hasIconOnly
                      renderIcon={Cut}
                      iconDescription="Cut"
                      tooltipPosition="bottom"
                      onClick={fmt('cut')}
                    />
                    <Button className="items-center"
                      kind="ghost"
                      size="sm"
                      hasIconOnly
                      renderIcon={Copy}
                      iconDescription="Copy"
                      tooltipPosition="top"
                      onClick={fmt('copy')}
                    />
                  </div>
                </div>
              </RibbonChunk>
              <RibbonDivider />

              {/* Font */}
              <RibbonChunk label="Font">
                <div className="ribbon-row">
                  <select
                    className="ribbon-select"
                    value={fontFamily}
                    onChange={(e) => onFontFamilyChange(e.target.value)}
                    aria-label="Font family"
                  >
                    <option value="" />
                    {FONTS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <select
                    className="ribbon-select ribbon-select--size"
                    value={fontSize}
                    onChange={(e) => onFontSizeChange(e.target.value)}
                    aria-label="Font size"
                  >
                    <option value="" />
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ribbon-row">
                  <Button className="items-center"
                    kind={isBold ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextBold}
                    iconDescription="Bold"
                    tooltipPosition="bottom"
                    onClick={fmt('bold')}
                  />
                  <Button className="items-center"
                    kind={isItalic ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextItalic}
                    iconDescription="Italic"
                    tooltipPosition="bottom"
                    onClick={fmt('italic')}
                  />
                  <Button className="items-center"
                    kind={isUnderline ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextUnderline}
                    iconDescription="Underline"
                    tooltipPosition="bottom"
                    onClick={fmt('underline')}
                  />
                  <Button className="items-center"
                    kind={isStrikethrough ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextStrikethrough}
                    iconDescription="Strikethrough"
                    tooltipPosition="bottom"
                    onClick={fmt('strikeThrough')}
                  />
                  <Button className="items-center"
                    kind={isSubscript ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextSubscript}
                    iconDescription="Subscript"
                    tooltipPosition="bottom"
                    onClick={fmt('subscript')}
                  />
                  <Button className="items-center"
                    kind={isSuperscript ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextSuperscript}
                    iconDescription="Superscript"
                    tooltipPosition="bottom"
                    onClick={fmt('superscript')}
                  />
                  <Button className="items-center"
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextHighlight}
                    iconDescription="Highlight"
                    tooltipPosition="bottom"
                    onClick={fmt('hiliteColor', '#FFFF00')}
                  />
                  <Button className="items-center"
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextClearFormat}
                    iconDescription="Clear Formatting"
                    tooltipPosition="bottom"
                    onClick={fmt('removeFormat')}
                  />
                </div>
              </RibbonChunk>
              <RibbonDivider />

              {/* Paragraph */}
              <RibbonChunk label="Paragraph">
                <div className="ribbon-row">
                  <Button className="items-center"
                    kind={isUnorderedList ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={ListBulleted}
                    iconDescription="Bulleted List"
                    tooltipPosition="bottom"
                    onClick={fmt('insertUnorderedList')}
                  />
                  <Button className="items-center"
                    kind={isOrderedList ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={ListNumbered}
                    iconDescription="Numbered List"
                    tooltipPosition="bottom"
                    onClick={fmt('insertOrderedList')}
                  />
                  <Button className="items-center"
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextIndentLess}
                    iconDescription="Decrease Indent"
                    tooltipPosition="bottom"
                    onClick={fmt('outdent')}
                  />
                  <Button className="items-center"
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextIndentMore}
                    iconDescription="Increase Indent"
                    tooltipPosition="bottom"
                    onClick={fmt('indent')}
                  />
                  <LineSpacingDropdown value={lineSpacing} onChange={onLineSpacingChange} />
                </div>
                <div className="ribbon-row">
                  <Button className="items-center"
                    kind={alignment === 'left' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignLeft}
                    iconDescription="Align Left"
                    tooltipPosition="top"
                    onClick={fmt('justifyLeft')}
                  />
                  <Button className="items-center"
                    kind={alignment === 'center' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignCenter}
                    iconDescription="Center"
                    tooltipPosition="top"
                    onClick={fmt('justifyCenter')}
                  />
                  <Button className="items-center"
                    kind={alignment === 'right' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignRight}
                    iconDescription="Align Right"
                    tooltipPosition="top"
                    onClick={fmt('justifyRight')}
                  />
                  <Button className="items-center"
                    kind={alignment === 'justify' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignJustify}
                    iconDescription="Justify"
                    tooltipPosition="top"
                    onClick={fmt('justifyFull')}
                  />
                </div>
              </RibbonChunk>
              <RibbonDivider />

              {/* Styles */}
              <RibbonChunk
                label="Styles"
                launcher={
                  <CitationStyleDropdown
                    value={citationStyle}
                    onChange={onCitationStyleChange}
                  />
                }
              >
                <div className="ribbon-styles">
                  {STYLES.map((style) => (
                    <Button
                      key={style.label}
                      kind="ghost"
                      size="sm"
                      className="ribbon-style-btn items-center"
                      onClick={() => onFormat(style.cmd, style.val)}
                    >
                      {style.label}
                    </Button>
                  ))}
                </div>
              </RibbonChunk>
              <RibbonDivider />

              {/* Editing */}
              {/* <RibbonChunk label="Editing">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Search}
                    iconDescription="Find"
                    onClick={fmt('find')}
                  >
                    Find
                  </Button>
                </div>
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Undo}
                    iconDescription="Undo"
                    onClick={fmt('undo')}
                  >
                    Undo
                  </Button>
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Redo}
                    iconDescription="Redo"
                    onClick={fmt('redo')}
                  >
                    Redo
                  </Button>
                </div>
              </RibbonChunk> */}
            </div>
          </TabPanel>

          {/* ── Insert ───────────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              <RibbonChunk label="Tables">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Table}
                    iconDescription="Insert Table"
                  >
                    Table
                  </Button>
                </div>
              </RibbonChunk>
              <RibbonDivider />
              <RibbonChunk label="Illustrations">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Image}
                    iconDescription="Picture"
                  >
                    Picture
                  </Button>
                </div>
              </RibbonChunk>
              <RibbonDivider />
              <RibbonChunk label="Links">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Link}
                    iconDescription="Hyperlink"
                  >
                    Hyperlink
                  </Button>
                </div>
              </RibbonChunk>
              <RibbonDivider />
              <RibbonChunk label="Print">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Printer}
                    iconDescription="Print"
                    onClick={onPrint}
                  >
                    Print
                  </Button>
                </div>
              </RibbonChunk>
            </div>
          </TabPanel>

          {/* ── Page Layout ──────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              <RibbonChunk label="Page Setup">
                <div className="ribbon-row">
                  <Button kind="ghost" size="sm">
                    Margins
                  </Button>
                  <Button kind="ghost" size="sm">
                    Orientation
                  </Button>
                  <Button kind="ghost" size="sm">
                    Size
                  </Button>
                </div>
              </RibbonChunk>
              <RibbonDivider />
              <RibbonChunk label="Paragraph">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextIndentMore}
                    iconDescription="Increase Indent"
                    tooltipPosition="bottom"
                    onClick={fmt('indent')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextIndentLess}
                    iconDescription="Decrease Indent"
                    tooltipPosition="bottom"
                    onClick={fmt('outdent')}
                  />
                </div>
              </RibbonChunk>
            </div>
          </TabPanel>

          {/* ── References ───────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              <RibbonChunk label="Table of Contents">
                <div className="ribbon-row">
                  <Button kind="ghost" size="sm">
                    Table of Contents
                  </Button>
                </div>
              </RibbonChunk>
              <RibbonDivider />
              <RibbonChunk label="Footnotes">
                <div className="ribbon-row">
                  <Button kind="ghost" size="sm">
                    Insert Footnote
                  </Button>
                </div>
              </RibbonChunk>
            </div>
          </TabPanel>

          {/* ── Review ───────────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              <RibbonChunk label="Proofing">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={SpellCheck}
                    iconDescription="Spelling &amp; Grammar"
                  >
                    Spelling &amp; Grammar
                  </Button>
                </div>
              </RibbonChunk>
            </div>
          </TabPanel>

          {/* ── View ─────────────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              <RibbonChunk label="Zoom">
                <div className="ribbon-row">
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={ZoomOut}
                    iconDescription="Zoom Out"
                    tooltipPosition="bottom"
                    onClick={() => onZoom(-10)}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={ZoomIn}
                    iconDescription="Zoom In"
                    tooltipPosition="bottom"
                    onClick={() => onZoom(10)}
                  />
                  <Button kind="ghost" size="sm" onClick={() => onZoom(0)}>
                    100%
                  </Button>
                </div>
              </RibbonChunk>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Ribbon;
