'use client';

import React from 'react';
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
  alignment: string;
  onPrint: () => void;
  onZoom: (delta: number) => void;
}

// ─── Helper sub-components ────────────────────────────────────────────────────

const RibbonChunk = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="ribbon-chunk">
    <div className="ribbon-chunk__controls">{children}</div>
    <div className="ribbon-chunk__label">{label}</div>
  </div>
);

const RibbonDivider = () => <div className="ribbon-divider" />;

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

const Ribbon = ({
  onFormat,
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange,
  isBold,
  isItalic,
  isUnderline,
  alignment,
  onPrint,
  onZoom,
}: RibbonProps) => {
  const fmt = (cmd: string, val?: string) => () => onFormat(cmd, val);

  return (
    <div className="word-ribbon">
      <Tabs>
        <TabList aria-label="Ribbon tabs">
          <Tab>Home</Tab>
          <Tab>Insert</Tab>
          <Tab>Page Layout</Tab>
          <Tab>References</Tab>
          <Tab>Review</Tab>
          <Tab>View</Tab>
        </TabList>

        <TabPanels>
          {/* ── Home ─────────────────────────────────────────────────────── */}
          <TabPanel>
            <div className="ribbon-panel">
              {/* Clipboard */}
              <RibbonChunk label="Clipboard">
                <div className="ribbon-clipboard">
                  <div className="ribbon-clipboard__paste">
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={Paste}
                      iconDescription="Paste"
                      onClick={fmt('paste')}
                    >
                      Paste
                    </Button>
                  </div>
                  <div className="ribbon-clipboard__small">
                    <Button
                      kind="ghost"
                      size="sm"
                      hasIconOnly
                      renderIcon={Cut}
                      iconDescription="Cut"
                      tooltipPosition="bottom"
                      onClick={fmt('cut')}
                    />
                    <Button
                      kind="ghost"
                      size="sm"
                      hasIconOnly
                      renderIcon={Copy}
                      iconDescription="Copy"
                      tooltipPosition="bottom"
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
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ribbon-row">
                  <Button
                    kind={isBold ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextBold}
                    iconDescription="Bold"
                    tooltipPosition="bottom"
                    onClick={fmt('bold')}
                  />
                  <Button
                    kind={isItalic ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextItalic}
                    iconDescription="Italic"
                    tooltipPosition="bottom"
                    onClick={fmt('italic')}
                  />
                  <Button
                    kind={isUnderline ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextUnderline}
                    iconDescription="Underline"
                    tooltipPosition="bottom"
                    onClick={fmt('underline')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextStrikethrough}
                    iconDescription="Strikethrough"
                    tooltipPosition="bottom"
                    onClick={fmt('strikeThrough')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextSubscript}
                    iconDescription="Subscript"
                    tooltipPosition="bottom"
                    onClick={fmt('subscript')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextSuperscript}
                    iconDescription="Superscript"
                    tooltipPosition="bottom"
                    onClick={fmt('superscript')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextHighlight}
                    iconDescription="Highlight"
                    tooltipPosition="bottom"
                    onClick={fmt('hiliteColor', '#FFFF00')}
                  />
                  <Button
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
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={ListBulleted}
                    iconDescription="Bulleted List"
                    tooltipPosition="bottom"
                    onClick={fmt('insertUnorderedList')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={ListNumbered}
                    iconDescription="Numbered List"
                    tooltipPosition="bottom"
                    onClick={fmt('insertOrderedList')}
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
                    renderIcon={TextLineSpacing}
                    iconDescription="Line Spacing"
                    tooltipPosition="bottom"
                  />
                </div>
                <div className="ribbon-row">
                  <Button
                    kind={alignment === 'left' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignLeft}
                    iconDescription="Align Left"
                    tooltipPosition="bottom"
                    onClick={fmt('justifyLeft')}
                  />
                  <Button
                    kind={alignment === 'center' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignCenter}
                    iconDescription="Center"
                    tooltipPosition="bottom"
                    onClick={fmt('justifyCenter')}
                  />
                  <Button
                    kind={alignment === 'right' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignRight}
                    iconDescription="Align Right"
                    tooltipPosition="bottom"
                    onClick={fmt('justifyRight')}
                  />
                  <Button
                    kind={alignment === 'justify' ? 'primary' : 'ghost'}
                    size="sm"
                    hasIconOnly
                    renderIcon={TextAlignJustify}
                    iconDescription="Justify"
                    tooltipPosition="bottom"
                    onClick={fmt('justifyFull')}
                  />
                </div>
              </RibbonChunk>
              <RibbonDivider />

              {/* Styles */}
              <RibbonChunk label="Styles">
                <div className="ribbon-styles">
                  {STYLES.map((style) => (
                    <Button
                      key={style.label}
                      kind="ghost"
                      size="sm"
                      className="ribbon-style-btn"
                      onClick={() => onFormat(style.cmd, style.val)}
                    >
                      {style.label}
                    </Button>
                  ))}
                </div>
              </RibbonChunk>
              <RibbonDivider />

              {/* Editing */}
              <RibbonChunk label="Editing">
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
              </RibbonChunk>
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
