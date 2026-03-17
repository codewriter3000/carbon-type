'use client';

import { Tabs, Tab, TabList, TabPanels, TabPanel, Button } from '@carbon/react';
import {
  Table,
  Image,
  Link,
  TextIndentMore,
  TextIndentLess,
  SpellCheck,
  ZoomIn,
  ZoomOut,
  Printer,
} from '@carbon/icons-react';
import HelpTabPanel from './HelpTabPanel';
import HomeTabPanel from './HomeTabPanel';
import { RibbonChunk, RibbonDivider, RibbonMobileContext, useMobileRibbon } from './RibbonControls';
import { RibbonProps } from './types';

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
  const isMobile = useMobileRibbon();

  const openHelpLink = (url: string) => () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <RibbonMobileContext.Provider value={isMobile}>
    <div className={`word-ribbon${isMobile ? ' word-ribbon--mobile' : ''}`}>
      <Tabs>
        <TabList aria-label="Ribbon tabs">
          <Tab>Home</Tab>
          <Tab>Help</Tab>
          {/* <Tab>Insert</Tab>
          <Tab>Page Layout</Tab>
          <Tab>References</Tab>
          <Tab>Review</Tab>
          <Tab>View</Tab> */}
        </TabList>

        <TabPanels>
          <HomeTabPanel
            onFormat={onFormat}
            fontSize={fontSize}
            fontFamily={fontFamily}
            onFontSizeChange={onFontSizeChange}
            onFontFamilyChange={onFontFamilyChange}
            isBold={isBold}
            isItalic={isItalic}
            isUnderline={isUnderline}
            isStrikethrough={isStrikethrough}
            isSubscript={isSubscript}
            isSuperscript={isSuperscript}
            isUnorderedList={isUnorderedList}
            isOrderedList={isOrderedList}
            alignment={alignment}
            lineSpacing={lineSpacing}
            onLineSpacingChange={onLineSpacingChange}
            citationStyle={citationStyle}
            onCitationStyleChange={onCitationStyleChange}
          />

          <HelpTabPanel
            onFeatureRequest={openHelpLink('https://github.com/codewriter3000/carbon-type/issues/new?template=feature_request.md')}
            onBug={openHelpLink('https://github.com/codewriter3000/carbon-type/issues/new?template=bug_report.md')}
            onContribute={openHelpLink('https://github.com/codewriter3000/carbon-type')}
          />

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
                    onClick={() => onFormat('indent')}
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TextIndentLess}
                    iconDescription="Decrease Indent"
                    tooltipPosition="bottom"
                    onClick={() => onFormat('outdent')}
                  />
                </div>
              </RibbonChunk>
            </div>
          </TabPanel>

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
    </RibbonMobileContext.Provider>
  );
};

export default Ribbon;
