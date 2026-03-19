import { Button } from '@carbon/react';
import {
  Cut,
  Copy,
  Paste,
  TextClearFormat,
  Undo,
  Redo,
  DocumentAdd,
  FolderOpen,
  DocumentDownload,
} from '@carbon/icons-react';
import { FONTS, SIZES } from './ribbonConfig';
import {
  ChangeCaseDropdown,
  FontColorDropdown,
  FormatButton,
  HighlightColorDropdown,
  TextEffectsDropdown,
} from './RibbonControls';
import { RibbonProps } from './types';

type FontToolbarProps = Pick<
  RibbonProps,
  | 'onFormat'
  | 'fontSize'
  | 'fontFamily'
  | 'onFontSizeChange'
  | 'onFontFamilyChange'
  | 'onNew'
  | 'onOpen'
  | 'onDownload'
  | 'isBold'
  | 'isItalic'
  | 'isUnderline'
  | 'isStrikethrough'
  | 'isSubscript'
  | 'isSuperscript'
> & {
  newStyleMode?: boolean;
  isMobile?: boolean;
};

const FontToolbar = ({
  onFormat,
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange,
  onNew,
  onOpen,
  onDownload,
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  newStyleMode = false,
  isMobile = false,
}: FontToolbarProps) => {
  const fmt = (cmd: string, val?: string) => () => onFormat(cmd, val);
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
    <div className={`font-toolbar${newStyleMode ? ' new-style' : ''}`} role="toolbar" aria-label="Font toolbar">
      <div className="font-toolbar__inner">
        <div className="ribbon-row">
          {isMobile ? (
            <>
              <Button
                className="items-center"
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={DocumentAdd}
                iconDescription="New"
                tooltipPosition="bottom"
                onClick={onNew}
              />
              <Button
                className="items-center"
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={FolderOpen}
                iconDescription="Open"
                tooltipPosition="bottom"
                onClick={onOpen}
              />
              <Button
                className="items-center"
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={DocumentDownload}
                iconDescription="Download"
                tooltipPosition="bottom"
                onClick={onDownload}
              />
              <span className="font-toolbar__divider" aria-hidden="true" />
            </>
          ) : null}

          <Button
            className="items-center"
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Undo}
            iconDescription="Undo"
            tooltipPosition="bottom"
            onClick={fmt('undo')}
          />
          <Button
            className="items-center"
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Redo}
            iconDescription="Redo"
            tooltipPosition="bottom"
            onClick={fmt('redo')}
          />

          <span className="font-toolbar__divider" aria-hidden="true" />

          {!newStyleMode ? (
            <>
              <div className="font-toolbar__clipboard">
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

              <span className="font-toolbar__divider" aria-hidden="true" />
            </>
          ) : null}

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

          <span className="font-toolbar__divider" aria-hidden="true" />

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
      </div>
    </div>
  );
};

export default FontToolbar;
