import { Button, TabPanel } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import { CITATION_STYLE_OPTIONS, getStylePresets, StylePreset, toPreviewStyle } from './ribbonConfig';
import { RibbonChunk } from './RibbonChunk';
import { RibbonProps } from './types';

type StyleTabPanelProps = Pick<
  RibbonProps,
  | 'onFormat'
  | 'citationStyle'
  | 'onCitationStyleChange'
> & {
  onStartNewStyle: () => void;
  customStyles?: StylePreset[];
};

const StyleTabPanel = ({
  onFormat,
  citationStyle,
  onCitationStyleChange,
  onStartNewStyle,
  customStyles = [],
}: StyleTabPanelProps) => {
  const styles = [...getStylePresets(citationStyle), ...customStyles];

  return (
    <TabPanel>
      <div className="ribbon-panel ribbon-panel--style">
        <div className="ribbon-style-controls">
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Add}
            iconDescription="Create New Style"
            tooltipPosition="bottom"
            className="ribbon-style-new-icon-btn"
            onClick={onStartNewStyle}
          />
          <div className="ribbon-style-selector">
            <label htmlFor="citation-style-listbox">Citation style</label>
            <select
              id="citation-style-listbox"
              className="ribbon-style-listbox"
              size={4}
              value={citationStyle}
              onChange={(event) => onCitationStyleChange(event.target.value)}
            >
              {CITATION_STYLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <RibbonChunk label="Styles">
          <div className="ribbon-styles">
            {styles.map((style) => (
              <Button
                key={style.label}
                kind="ghost"
                size="sm"
                className="ribbon-style-btn items-center"
                onClick={() => onFormat('applyStylePreset', JSON.stringify(style))}
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

export default StyleTabPanel;
