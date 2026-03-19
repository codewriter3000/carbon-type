export interface RibbonProps {
  onFormat: (command: string, value?: string) => void;
  onNew?: () => void;
  onOpen?: () => void;
  onDownload?: () => void;
  onPageSetup?: () => void;
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
