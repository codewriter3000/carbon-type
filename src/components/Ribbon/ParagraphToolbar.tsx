import { Button } from '@carbon/react';
import {
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  ListBulleted,
  ListNumbered,
  TextIndentMore,
  TextIndentLess,
} from '@carbon/icons-react';
import { LineSpacingDropdown } from './RibbonControls';
import { RibbonProps } from './types';

type ParagraphToolbarProps = Pick<
  RibbonProps,
  | 'onFormat'
  | 'isUnorderedList'
  | 'isOrderedList'
  | 'alignment'
  | 'lineSpacing'
  | 'onLineSpacingChange'
> & {
  newStyleMode?: boolean;
};

const ParagraphToolbar = ({
  onFormat,
  isUnorderedList,
  isOrderedList,
  alignment,
  lineSpacing,
  onLineSpacingChange,
  newStyleMode = false,
}: ParagraphToolbarProps) => {
  const fmt = (cmd: string, val?: string) => () => onFormat(cmd, val);

  return (
    <div className={`paragraph-toolbar${newStyleMode ? ' new-style' : ''}`} role="toolbar" aria-label="Paragraph toolbar">
      <div className="paragraph-toolbar__inner">
        <div className="ribbon-row">
          {!newStyleMode ? (
            <>
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
            </>
          ) : null}
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

          <span className="paragraph-toolbar__divider" aria-hidden="true" />

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
      </div>
    </div>
  );
};

export default ParagraphToolbar;
