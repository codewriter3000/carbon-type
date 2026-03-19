'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Tabs, Tab, TabList, TabPanels } from '@carbon/react';
import HelpTabPanel from './HelpTabPanel';
import StyleTabPanel from './StyleTabPanel';
import FileTabPanel from './FileTabPanel';
import NewStyleTabPanel, { NewStyleFormValues } from './NewStyleTabPanel';
import FontToolbar from './FontToolbar';
import ParagraphToolbar from './ParagraphToolbar';
import RibbonSecondaryPanels from './RibbonSecondaryPanels';
import { RibbonMobileContext, useMobileRibbon } from './RibbonChunk';
import { StylePreset } from './ribbonConfig';
import { RibbonProps } from './types';
import styles from './Ribbon.module.scss';

const Ribbon = ({
  onFormat,
  onNew,
  onOpen,
  onDownload,
  onPageSetup,
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isCreatingNewStyle, setIsCreatingNewStyle] = useState(false);
  const [outsideClickCount, setOutsideClickCount] = useState(0);
  const [showCancelHint, setShowCancelHint] = useState(false);
  const [newStyleFontSize, setNewStyleFontSize] = useState(fontSize);
  const [newStyleFontFamily, setNewStyleFontFamily] = useState(fontFamily);
  const [newStyleIsBold, setNewStyleIsBold] = useState(false);
  const [newStyleIsItalic, setNewStyleIsItalic] = useState(false);
  const [newStyleIsUnderline, setNewStyleIsUnderline] = useState(false);
  const [newStyleIsStrikethrough, setNewStyleIsStrikethrough] = useState(false);
  const [newStyleIsSubscript, setNewStyleIsSubscript] = useState(false);
  const [newStyleIsSuperscript, setNewStyleIsSuperscript] = useState(false);
  const [newStyleAlignment, setNewStyleAlignment] = useState<string>('left');
  const [newStyleLineSpacing, setNewStyleLineSpacing] = useState(lineSpacing);
  const [newStyleTextColor, setNewStyleTextColor] = useState('#161616');
  const [customStylesByCitation, setCustomStylesByCitation] = useState<Record<string, StylePreset[]>>({});
  const newStyleScopeRef = useRef<HTMLDivElement | null>(null);

  const openHelpLink = (url: string) => () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const cancelNewStyleCreation = useCallback(() => {
    setIsCreatingNewStyle(false);
    setOutsideClickCount(0);
    setShowCancelHint(false);
    setSelectedIndex(1);
  }, []);

  const startNewStyleCreation = useCallback(() => {
    setIsCreatingNewStyle(true);
    setOutsideClickCount(0);
    setShowCancelHint(false);
    setSelectedIndex(3);
    setNewStyleFontSize(fontSize);
    setNewStyleFontFamily(fontFamily);
    setNewStyleIsBold(false);
    setNewStyleIsItalic(false);
    setNewStyleIsUnderline(false);
    setNewStyleIsStrikethrough(false);
    setNewStyleIsSubscript(false);
    setNewStyleIsSuperscript(false);
    setNewStyleAlignment('left');
    setNewStyleLineSpacing(lineSpacing);
    setNewStyleTextColor('#161616');
  }, [fontFamily, fontSize, lineSpacing]);

  const mapBaseStyleToBlock = (baseStyle: NewStyleFormValues['baseStyle']): StylePreset['val'] => {
    if (baseStyle === 'Heading 1') {
      return 'h1';
    }
    if (baseStyle === 'Heading 2') {
      return 'h2';
    }
    if (baseStyle === 'Heading 3') {
      return 'h3';
    }
    return 'p';
  };

  const handleSaveNewStyle = useCallback((values: NewStyleFormValues) => {
    if (!values.styleName) {
      return;
    }

    const parsedSize = Number.parseInt(newStyleFontSize, 10);
    const clampedSize = Number.isNaN(parsedSize) ? 11 : Math.min(48, parsedSize);
    const nextStyle: StylePreset = {
      label: values.styleName,
      cmd: 'formatBlock',
      val: mapBaseStyleToBlock(values.baseStyle),
      textStyle: {
        fontFamily: newStyleFontFamily || fontFamily,
        fontSizePt: clampedSize,
        fontWeight: newStyleIsBold ? '700' : '400',
        fontStyle: newStyleIsItalic ? 'italic' : 'normal',
        color: newStyleTextColor,
      },
    };

    setCustomStylesByCitation((prev) => {
      const currentStyles = prev[citationStyle] ?? [];
      const stylesWithoutSameName = currentStyles.filter((style) => style.label !== nextStyle.label);

      return {
        ...prev,
        [citationStyle]: [...stylesWithoutSameName, nextStyle],
      };
    });

    cancelNewStyleCreation();
  }, [cancelNewStyleCreation, citationStyle, fontFamily, newStyleFontFamily, newStyleFontSize, newStyleIsBold, newStyleIsItalic, newStyleTextColor]);

  const getNewStylePreviewInput = () => {
    const input = document.getElementById('new-style-preview-input');
    return input instanceof HTMLTextAreaElement ? input : null;
  };

  const setPreviewValue = (input: HTMLTextAreaElement, nextValue: string) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
    if (setter) {
      setter.call(input, nextValue);
    } else {
      input.value = nextValue;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const applyNewStyleFormat = useCallback((command: string, value?: string) => {
    const input = getNewStylePreviewInput();
    if (!input) {
      return;
    }

    const currentDecorations = new Set(
      (input.style.textDecoration || '')
        .split(' ')
        .map((token) => token.trim())
        .filter(Boolean),
    );

    switch (command) {
      case 'bold': {
        setNewStyleIsBold((prev) => {
          const next = !prev;
          input.style.fontWeight = next ? '700' : '400';
          return next;
        });
        return;
      }
      case 'italic': {
        setNewStyleIsItalic((prev) => {
          const next = !prev;
          input.style.fontStyle = next ? 'italic' : 'normal';
          return next;
        });
        return;
      }
      case 'underline': {
        setNewStyleIsUnderline((prev) => {
          const next = !prev;
          if (next) {
            currentDecorations.add('underline');
          } else {
            currentDecorations.delete('underline');
          }
          input.style.textDecoration = Array.from(currentDecorations).join(' ');
          return next;
        });
        return;
      }
      case 'strikeThrough': {
        setNewStyleIsStrikethrough((prev) => {
          const next = !prev;
          if (next) {
            currentDecorations.add('line-through');
          } else {
            currentDecorations.delete('line-through');
          }
          input.style.textDecoration = Array.from(currentDecorations).join(' ');
          return next;
        });
        return;
      }
      case 'subscript': {
        setNewStyleIsSubscript((prev) => {
          const next = !prev;
          if (next) {
            setNewStyleIsSuperscript(false);
            input.style.verticalAlign = 'sub';
          } else {
            input.style.verticalAlign = 'baseline';
          }
          return next;
        });
        return;
      }
      case 'superscript': {
        setNewStyleIsSuperscript((prev) => {
          const next = !prev;
          if (next) {
            setNewStyleIsSubscript(false);
            input.style.verticalAlign = 'super';
          } else {
            input.style.verticalAlign = 'baseline';
          }
          return next;
        });
        return;
      }
      case 'justifyLeft':
        setNewStyleAlignment('left');
        input.style.textAlign = 'left';
        return;
      case 'justifyCenter':
        setNewStyleAlignment('center');
        input.style.textAlign = 'center';
        return;
      case 'justifyRight':
        setNewStyleAlignment('right');
        input.style.textAlign = 'right';
        return;
      case 'justifyFull':
        setNewStyleAlignment('justify');
        input.style.textAlign = 'justify';
        return;
      case 'foreColor':
        setNewStyleTextColor(value ?? '#161616');
        input.style.color = value ?? '';
        return;
      case 'hiliteColor':
        input.style.backgroundColor = value ?? '';
        return;
      case 'textEffect': {
        if (value === 'shadow') {
          input.style.textShadow = '1px 1px 0 rgba(0, 0, 0, 0.28)';
          input.style.fontVariant = 'normal';
          input.style.textTransform = 'none';
          input.style.webkitTextStroke = '';
          return;
        }
        if (value === 'outline') {
          input.style.webkitTextStroke = '0.4px currentColor';
          input.style.textShadow = 'none';
          input.style.fontVariant = 'normal';
          input.style.textTransform = 'none';
          return;
        }
        if (value === 'smallCaps') {
          input.style.fontVariant = 'small-caps';
          input.style.textShadow = 'none';
          input.style.webkitTextStroke = '';
          input.style.textTransform = 'none';
          return;
        }
        if (value === 'allCaps') {
          input.style.textTransform = 'uppercase';
          input.style.fontVariant = 'normal';
          input.style.textShadow = 'none';
          input.style.webkitTextStroke = '';
          return;
        }
        input.style.textShadow = 'none';
        input.style.webkitTextStroke = '';
        input.style.fontVariant = 'normal';
        input.style.textTransform = 'none';
        return;
      }
      case 'changeCase': {
        const text = input.value;
        let nextText = text;
        if (value === 'uppercase') {
          nextText = text.toUpperCase();
        } else if (value === 'lowercase') {
          nextText = text.toLowerCase();
        } else if (value === 'capitalize') {
          nextText = text.replace(/\b\w/g, (match) => match.toUpperCase());
        } else if (value === 'toggle') {
          nextText = text
            .split('')
            .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
            .join('');
        }
        setPreviewValue(input, nextText);
        return;
      }
      case 'removeFormat': {
        setNewStyleIsBold(false);
        setNewStyleIsItalic(false);
        setNewStyleIsUnderline(false);
        setNewStyleIsStrikethrough(false);
        setNewStyleIsSubscript(false);
        setNewStyleIsSuperscript(false);
        setNewStyleAlignment('left');
        input.style.fontWeight = '400';
        input.style.fontStyle = 'normal';
        input.style.textDecoration = 'none';
        input.style.verticalAlign = 'baseline';
        input.style.textAlign = 'left';
        input.style.color = '';
        setNewStyleTextColor('#161616');
        input.style.backgroundColor = '';
        input.style.textShadow = 'none';
        input.style.webkitTextStroke = '';
        input.style.fontVariant = 'normal';
        input.style.textTransform = 'none';
        return;
      }
      default:
        return;
    }
  }, []);

  const handleToolbarFormat = useCallback((command: string, value?: string) => {
    if (isCreatingNewStyle) {
      applyNewStyleFormat(command, value);
      return;
    }
    onFormat(command, value);
  }, [applyNewStyleFormat, isCreatingNewStyle, onFormat]);

  const handleToolbarFontSizeChange = useCallback((size: string) => {
    if (isCreatingNewStyle) {
      const parsedSize = Number.parseInt(size, 10);
      const clampedSize = Number.isNaN(parsedSize) ? 11 : Math.min(48, parsedSize);
      setNewStyleFontSize(String(clampedSize));
      const input = getNewStylePreviewInput();
      if (input) {
        input.style.fontSize = `${clampedSize}pt`;
      }
      return;
    }
    onFontSizeChange(size);
  }, [isCreatingNewStyle, onFontSizeChange]);

  const handleToolbarFontFamilyChange = useCallback((family: string) => {
    if (isCreatingNewStyle) {
      setNewStyleFontFamily(family);
      const input = getNewStylePreviewInput();
      if (input) {
        input.style.fontFamily = family;
      }
      return;
    }
    onFontFamilyChange(family);
  }, [isCreatingNewStyle, onFontFamilyChange]);

  const handleToolbarLineSpacingChange = useCallback((spacing: string) => {
    if (isCreatingNewStyle) {
      setNewStyleLineSpacing(spacing);
      const input = getNewStylePreviewInput();
      if (input) {
        input.style.lineHeight = spacing;
      }
      return;
    }
    onLineSpacingChange(spacing);
  }, [isCreatingNewStyle, onLineSpacingChange]);

  useEffect(() => {
    if (!isCreatingNewStyle) {
      return;
    }

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        setOutsideClickCount(0);
        setShowCancelHint(false);
        return;
      }

      const targetElement = target instanceof Element
        ? target
        : (target.parentNode instanceof Element ? target.parentNode : null);

      if (!targetElement) {
        return;
      }

      if (targetElement.closest('.new-style-tab')) {
        setOutsideClickCount(0);
        setShowCancelHint(false);
        return;
      }

      if (targetElement.closest('.new-style-panel, .new-style-warning')) {
        setOutsideClickCount(0);
        setShowCancelHint(false);
        return;
      }

      if (targetElement?.closest('.font-toolbar, .paragraph-toolbar')) {
        setOutsideClickCount(0);
        setShowCancelHint(false);
        return;
      }

      if (outsideClickCount === 0) {
        setOutsideClickCount(1);
        setShowCancelHint(true);
        return;
      }

      cancelNewStyleCreation();
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
    };
  }, [cancelNewStyleCreation, isCreatingNewStyle, outsideClickCount]);

  const handleTabChange = ({ selectedIndex: nextIndex }: { selectedIndex: number }) => {
    if (!isCreatingNewStyle) {
      setSelectedIndex(nextIndex);
      return;
    }

    if (nextIndex === 3) {
      setSelectedIndex(nextIndex);
    }
  };

  return (
    <RibbonMobileContext.Provider value={isMobile}>
      {isCreatingNewStyle ? <div className={styles.newStyleBackdrop} aria-hidden="true" /> : null}
      <div
        className={`${styles.ribbonRoot} word-ribbon${isMobile ? ' word-ribbon--mobile' : ''}${isCreatingNewStyle ? ' word-ribbon--creating-style' : ''}`}
      >
        <div className={`${styles.ribbonFrame} flex flex-col`}>
          {!isMobile ? (
            <div ref={newStyleScopeRef}>
              <Tabs selectedIndex={selectedIndex} onChange={handleTabChange}>
              <TabList aria-label="Ribbon tabs">
                <Tab>File</Tab>
                <Tab>Style</Tab>
                <Tab>Help</Tab>
                {isCreatingNewStyle ? <Tab className="new-style-tab">New Style</Tab> : null}
                {/* <Tab>Insert</Tab>
                <Tab>Page Layout</Tab>
                <Tab>References</Tab>
                <Tab>Review</Tab>
                <Tab>View</Tab>*/}
              </TabList>

              <TabPanels>
                <FileTabPanel
                  onNew={onNew}
                  onOpen={onOpen}
                  onDownload={onDownload}
                  onPageSetup={onPageSetup}
                  onPrint={onPrint}
                />

                <StyleTabPanel
                  onFormat={onFormat}
                  citationStyle={citationStyle}
                  onCitationStyleChange={onCitationStyleChange}
                  onStartNewStyle={startNewStyleCreation}
                  customStyles={customStylesByCitation[citationStyle] ?? []}
                />

                <HelpTabPanel
                  onFeatureRequest={openHelpLink('https://github.com/codewriter3000/carbon-type/issues/new?template=feature_request.md')}
                  onBug={openHelpLink('https://github.com/codewriter3000/carbon-type/issues/new?template=bug_report.md')}
                  onContribute={openHelpLink('https://github.com/codewriter3000/carbon-type')}
                />
                {isCreatingNewStyle ? <NewStyleTabPanel onSaveStyle={handleSaveNewStyle} /> : null}
                <RibbonSecondaryPanels onFormat={onFormat} onPrint={onPrint} onZoom={onZoom} />
              </TabPanels>
              </Tabs>
            </div>
          ) : null}

          <FontToolbar
            onFormat={handleToolbarFormat}
            fontSize={isCreatingNewStyle ? newStyleFontSize : fontSize}
            fontFamily={isCreatingNewStyle ? newStyleFontFamily : fontFamily}
            onFontSizeChange={handleToolbarFontSizeChange}
            onFontFamilyChange={handleToolbarFontFamilyChange}
            onNew={onNew}
            onOpen={onOpen}
            onDownload={onDownload}
            isBold={isCreatingNewStyle ? newStyleIsBold : isBold}
            isItalic={isCreatingNewStyle ? newStyleIsItalic : isItalic}
            isUnderline={isCreatingNewStyle ? newStyleIsUnderline : isUnderline}
            isStrikethrough={isCreatingNewStyle ? newStyleIsStrikethrough : isStrikethrough}
            isSubscript={isCreatingNewStyle ? newStyleIsSubscript : isSubscript}
            isSuperscript={isCreatingNewStyle ? newStyleIsSuperscript : isSuperscript}
            newStyleMode={isCreatingNewStyle}
            isMobile={isMobile}
          />

          <ParagraphToolbar
            onFormat={handleToolbarFormat}
            isUnorderedList={isUnorderedList}
            isOrderedList={isOrderedList}
            alignment={isCreatingNewStyle ? newStyleAlignment : alignment}
            lineSpacing={isCreatingNewStyle ? newStyleLineSpacing : lineSpacing}
            onLineSpacingChange={handleToolbarLineSpacingChange}
            newStyleMode={isCreatingNewStyle}
          />

          {showCancelHint ? (
            <p className="new-style-warning">Click again outside the tab to cancel new style creation</p>
          ) : null}
        </div>
      </div>
    </RibbonMobileContext.Provider>
  );
};

export default Ribbon;
