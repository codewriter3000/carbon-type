import React from 'react';
import styles from './DocumentEditor.module.scss';

interface DocumentSurfaceProps {
  scaleFactor: number;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

const PAGE_BASE_HEIGHT = 1056;

const DocumentSurface = ({ scaleFactor, toolbar, children }: DocumentSurfaceProps) => (
  <div className={styles.canvas}>
    {toolbar && <div className={styles.toolbarSlot}>{toolbar}</div>}
    <div className={styles.canvasStack}>
      <div
        className={styles.page}
        style={{
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top center',
          // Keep scrollbar height in sync with scaled page size.
          marginBottom: `${(scaleFactor - 1) * PAGE_BASE_HEIGHT}px`,
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

export default DocumentSurface;
