import { Button, TabPanel } from '@carbon/react';
import {
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  ListBulleted,
  ListNumbered,
  Cut,
  Copy,
  Paste,
  TextIndentMore,
  TextIndentLess,
  TextClearFormat,
} from '@carbon/icons-react';
import { FONTS, SIZES, getStylePresets, toPreviewStyle } from './ribbonConfig';
import {
  ChangeCaseDropdown,
  CitationStyleDropdown,
  FontColorDropdown,
  FormatButton,
  HighlightColorDropdown,
  LineSpacingDropdown,
  RibbonChunk,
  RibbonDivider,
  TextEffectsDropdown,
} from './RibbonControls';
import { RibbonProps } from './types';

type HomeTabPanelProps = Pick<
  RibbonProps,
  | 'onFormat'
  | 'fontSize'
  | 'fontFamily'
  | 'onFontSizeChange'
  | 'onFontFamilyChange'
  | 'isBold'
  | 'isItalic'
  | 'isUnderline'
  | 'isStrikethrough'
  | 'isSubscript'
  | 'isSuperscript'
  | 'isUnorderedList'
  | 'isOrderedList'
  | 'alignment'
  | 'lineSpacing'
  | 'onLineSpacingChange'
  | 'citationStyle'
  | 'onCitationStyleChange'
>;

const HomeTabPanel = ({
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
  lineSpacing,
  onLineSpacingChange,
  citationStyle,
  onCitationStyleChange,
}: HomeTabPanelProps) => {
  const fmt = (cmd: string, val?: string) => () => onFormat(cmd, val);
  const styles = getStylePresets(citationStyle);
  const parsedFontSize = Number.parseInt(fontSize, 10);

  const getClosestFontSizeIndex = (targetSize: number): number => {
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    SIZES.forEach((size, index) => {
      const current = Number.parseInt(size, 10);
      const distance = Math.abs(current - targetSize);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    return bestIndex;
  };

  const stepFontSize = (delta: -1 | 1) => {
    const currentIndex = Number.isNaN(parsedFontSize)
      ? 0
      : getClosestFontSizeIndex(parsedFontSize);
    const nextIndex = Math.max(0, Math.min(SIZES.length - 1, currentIndex + delta));
    onFontSizeChange(SIZES[nextIndex]);
  };

  return (
    <TabPanel>
      <div className="ribbon-panel">
        <RibbonChunk label="Clipboard">
          <div className="ribbon-clipboard">
            <div className="ribbon-clipboard__paste">
              <Button
                className="items-center"
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={Paste}
                iconDescription="Paste"
                tooltipPosition="bottom"
                onClick={fmt('paste')}
              />
            </div>
            <div className="ribbon-clipboard__small">
              <Button
                className="items-center"
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={Cut}
                iconDescription="Cut"
                tooltipPosition="bottom"
                onClick={fmt('cut')}
              />
              <Button
                className="items-center"
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
            <FormatButton onClick={() => stepFontSize(1)} title="Increase Font Size">
              <span className="format-btn__label">A+</span>
            </FormatButton>
            <FormatButton onClick={() => stepFontSize(-1)} title="Decrease Font Size">
              <span className="format-btn__label">A-</span>
            </FormatButton>
            <ChangeCaseDropdown onChange={(caseType) => onFormat('changeCase', caseType)} />
          </div>
          <div className="ribbon-row">
            <FormatButton active={isBold} onClick={fmt('bold')} title="Bold">
              <span className="format-btn__label format-btn__label--bold">B</span>
            </FormatButton>
            <FormatButton active={isItalic} onClick={fmt('italic')} title="Italic">
              <span className="format-btn__label format-btn__label--italic">I</span>
            </FormatButton>
            <FormatButton active={isUnderline} onClick={fmt('underline')} title="Underline">
              <span className="format-btn__label format-btn__label--underline">U</span>
            </FormatButton>
            <FormatButton active={isStrikethrough} onClick={fmt('strikeThrough')} title="Strikethrough">
              <span className="format-btn__label format-btn__label--strikethrough">S</span>
            </FormatButton>
            <FormatButton active={isSubscript} onClick={fmt('subscript')} title="Subscript">
              <span className="format-btn__label">X<sub>2</sub></span>
            </FormatButton>
            <FormatButton active={isSuperscript} onClick={fmt('superscript')} title="Superscript">
              <span className="format-btn__label">X<sup>2</sup></span>
            </FormatButton>
            <TextEffectsDropdown onChange={(effect) => onFormat('textEffect', effect)} />
            <FontColorDropdown onChange={(color) => onFormat('foreColor', color)} />
            <HighlightColorDropdown onChange={(color) => onFormat('hiliteColor', color)} />
            <Button
              className="items-center"
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

        <RibbonChunk label="Paragraph">
          <div className="ribbon-row">
            <Button
              className="items-center"
              kind={isUnorderedList ? 'primary' : 'ghost'}
              size="sm"
              hasIconOnly
              renderIcon={ListBulleted}
              iconDescription="Bulleted List"
              tooltipPosition="bottom"
              onClick={fmt('insertUnorderedList')}
            />
            <Button
              className="items-center"
              kind={isOrderedList ? 'primary' : 'ghost'}
              size="sm"
              hasIconOnly
              renderIcon={ListNumbered}
              iconDescription="Numbered List"
              tooltipPosition="bottom"
              onClick={fmt('insertOrderedList')}
            />
            <Button
              className="items-center"
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={TextIndentLess}
              iconDescription="Decrease Indent"
              tooltipPosition="bottom"
              onClick={fmt('outdent')}
            />
            <Button
              className="items-center"
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
            <Button
              className="items-center"
              kind={alignment === 'left' ? 'primary' : 'ghost'}
              size="sm"
              hasIconOnly
              renderIcon={TextAlignLeft}
              iconDescription="Align Left"
              tooltipPosition="top"
              onClick={fmt('justifyLeft')}
            />
            <Button
              className="items-center"
              kind={alignment === 'center' ? 'primary' : 'ghost'}
              size="sm"
              hasIconOnly
              renderIcon={TextAlignCenter}
              iconDescription="Center"
              tooltipPosition="top"
              onClick={fmt('justifyCenter')}
            />
            <Button
              className="items-center"
              kind={alignment === 'right' ? 'primary' : 'ghost'}
              size="sm"
              hasIconOnly
              renderIcon={TextAlignRight}
              iconDescription="Align Right"
              tooltipPosition="top"
              onClick={fmt('justifyRight')}
            />
            <Button
              className="items-center"
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
            {styles.map((style) => (
              <Button
                key={style.label}
                kind="ghost"
                size="sm"
                className="ribbon-style-btn items-center"
                onClick={() => onFormat(style.cmd, style.val)}
              >
                <span style={toPreviewStyle(style.textStyle)}>{style.label}</span>
              </Button>
            ))}
          </div>
        </RibbonChunk>
      </div>
    </TabPanel>
  );
};

export default HomeTabPanel;
