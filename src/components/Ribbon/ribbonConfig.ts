import React from 'react';

export const FONTS = [
  'Calibri',
  'Arial',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Tahoma',
  'Impact',
];

export const SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'];

export const LINE_SPACINGS = ['1.0', '1.15', '1.5', '2.0', '2.5', '3.0'];

export const CASE_OPTIONS = [
  { label: 'Sentence case', value: 'sentence' },
  { label: 'lowercase', value: 'lowercase' },
  { label: 'UPPERCASE', value: 'uppercase' },
  { label: 'Capitalize Each Word', value: 'capitalize' },
  { label: 'tOGGLE cASE', value: 'toggle' },
] as const;

export const TEXT_EFFECT_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shadow', value: 'shadow' },
  { label: 'Outline', value: 'outline' },
  { label: 'Small caps', value: 'smallCaps' },
  { label: 'All caps', value: 'allCaps' },
] as const;

export const FONT_COLOR_OPTIONS = [
  { label: 'Automatic', value: '#161616' },
  { label: 'Black', value: '#000000' },
  { label: 'Blue', value: '#0f62fe' },
  { label: 'Red', value: '#da1e28' },
  { label: 'Green', value: '#198038' },
  { label: 'Orange', value: '#ff832b' },
  { label: 'Purple', value: '#8a3ffc' },
] as const;

export const HIGHLIGHT_COLOR_OPTIONS = [
  { label: 'No color', value: 'transparent' },
  { label: 'Yellow', value: '#ffff00' },
  { label: 'Green', value: '#c6f6d5' },
  { label: 'Cyan', value: '#9ef0f0' },
  { label: 'Pink', value: '#ffd6e8' },
  { label: 'Orange', value: '#ffe0cc' },
] as const;

export const CITATION_STYLE_OPTIONS = ['APA v7', 'APA v6', 'MLA', 'Chicago'] as const;

type CitationStyleKey = (typeof CITATION_STYLE_OPTIONS)[number];

export interface DocumentTextStyle {
  fontFamily: string;
  fontSizePt: number;
  fontWeight: string;
  fontStyle?: 'normal' | 'italic';
  color: string;
}

export interface StylePreset {
  label: string;
  cmd: 'formatBlock';
  val: 'p' | 'h1' | 'h2' | 'h3';
  textStyle: DocumentTextStyle;
}

const createStyleSet = (fontFamily: string, fontSizePt: number): StylePreset[] => [
  {
    label: 'Normal',
    cmd: 'formatBlock',
    val: 'p',
    textStyle: {
      fontFamily,
      fontSizePt,
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#161616',
    },
  },
  {
    label: 'Heading 1',
    cmd: 'formatBlock',
    val: 'h1',
    textStyle: {
      fontFamily,
      fontSizePt,
      fontWeight: '700',
      fontStyle: 'normal',
      color: '#161616',
    },
  },
  {
    label: 'Heading 2',
    cmd: 'formatBlock',
    val: 'h2',
    textStyle: {
      fontFamily,
      fontSizePt,
      fontWeight: '700',
      fontStyle: 'normal',
      color: '#161616',
    },
  },
  {
    label: 'Heading 3',
    cmd: 'formatBlock',
    val: 'h3',
    textStyle: {
      fontFamily,
      fontSizePt,
      fontWeight: '700',
      fontStyle: 'italic',
      color: '#161616',
    },
  },
];

const STYLES_BY_CITATION: Record<CitationStyleKey, StylePreset[]> = {
  'APA v7': createStyleSet('Calibri', 11),
  'APA v6': createStyleSet('Times New Roman', 12),
  MLA: createStyleSet('Times New Roman', 12),
  Chicago: createStyleSet('Times New Roman', 12),
};

const DEFAULT_STYLES = createStyleSet('Calibri', 11);

export const getStylePresets = (citationStyle: string): StylePreset[] =>
  STYLES_BY_CITATION[citationStyle as CitationStyleKey] ?? DEFAULT_STYLES;

export const toPreviewStyle = (textStyle: DocumentTextStyle): React.CSSProperties => ({
  fontFamily: textStyle.fontFamily,
  fontSize: `${textStyle.fontSizePt}pt`,
  fontWeight: textStyle.fontWeight,
  fontStyle: textStyle.fontStyle ?? 'normal',
  color: textStyle.color,
});
