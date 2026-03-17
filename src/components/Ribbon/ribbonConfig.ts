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

export const STYLES: { label: string; cmd: string; val: string; previewStyle: React.CSSProperties }[] = [
  {
    label: 'Normal',
    cmd: 'formatBlock',
    val: 'p',
    previewStyle: {
      fontFamily: 'Calibri, sans-serif',
      fontSize: '11px',
      fontWeight: '400',
      color: '#161616',
    },
  },
  {
    label: 'Heading 1',
    cmd: 'formatBlock',
    val: 'h1',
    previewStyle: {
      fontFamily: "'Calibri Light', Calibri, sans-serif",
      fontSize: '15px',
      fontWeight: '700',
      color: '#2e74b5',
    },
  },
  {
    label: 'Heading 2',
    cmd: 'formatBlock',
    val: 'h2',
    previewStyle: {
      fontFamily: "'Calibri Light', Calibri, sans-serif",
      fontSize: '13px',
      fontWeight: '700',
      color: '#2e74b5',
    },
  },
  {
    label: 'Heading 3',
    cmd: 'formatBlock',
    val: 'h3',
    previewStyle: {
      fontFamily: "'Calibri Light', Calibri, sans-serif",
      fontSize: '12px',
      fontWeight: '700',
      fontStyle: 'italic',
      color: '#1f3864',
    },
  },
];

export const LINE_SPACINGS = ['1.0', '1.15', '1.5', '2.0', '2.5', '3.0'];

export const CITATION_STYLE_OPTIONS = ['APA v7', 'APA v6', 'MLA', 'Chicago'] as const;
