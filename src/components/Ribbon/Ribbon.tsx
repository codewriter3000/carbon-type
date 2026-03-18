'use client';

import { Tabs, Tab, TabList, TabPanels } from '@carbon/react';
import HelpTabPanel from './HelpTabPanel';
import HomeTabPanel from './HomeTabPanel';
import RibbonSecondaryPanels from './RibbonSecondaryPanels';
import { RibbonMobileContext, useMobileRibbon } from './RibbonChunk';
import { RibbonProps } from './types';
import styles from './Ribbon.module.scss';

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
    <div className={`${styles.ribbonRoot} word-ribbon${isMobile ? ' word-ribbon--mobile' : ''}`}>
      <Tabs>
        <TabList aria-label="Ribbon tabs">
          <Tab>Home</Tab>
          <Tab>Help</Tab>
          {/* <Tab>Insert</Tab>
          <Tab>Page Layout</Tab>
          <Tab>References</Tab>
          <Tab>Review</Tab>
          <Tab>View</Tab>*/}
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
          <RibbonSecondaryPanels onFormat={onFormat} onPrint={onPrint} onZoom={onZoom} />
        </TabPanels>
      </Tabs>
    </div>
    </RibbonMobileContext.Provider>
  );
};

export default Ribbon;
