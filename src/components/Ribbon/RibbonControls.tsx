import React from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, TextLineSpacing } from '@carbon/icons-react';
import { CITATION_STYLE_OPTIONS, LINE_SPACINGS } from './ribbonConfig';

export const RibbonChunk = ({
  label,
  children,
  launcher,
}: {
  label: string;
  children: React.ReactNode;
  launcher?: React.ReactNode;
}) => (
  <div className="ribbon-chunk">
    <div className="ribbon-chunk__controls">{children}</div>
    <div className="ribbon-chunk__label">
      <span>{label}</span>
      {launcher && <span className="ribbon-chunk__launcher">{launcher}</span>}
    </div>
  </div>
);

export const RibbonDivider = () => <div className="ribbon-divider" />;

export const FormatButton = ({
  active = false,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    className={`format-btn${active ? ' format-btn--active' : ''}`}
    onClick={onClick}
    title={title}
    aria-label={title}
    aria-pressed={active}
  >
    {children}
  </button>
);

const DialogLauncherIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1" stroke="currentColor" strokeWidth="1" />
    <path
      d="M3.5 3.5 L6.5 6.5 M6.5 6.5 L4.5 6.5 M6.5 6.5 L6.5 4.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CitationStyleDropdown = ({ value, onChange }: { value: string; onChange: (style: string) => void }) => {
  const [open, setOpen] = React.useState(false);
  const [menuPos, setMenuPos] = React.useState({ top: 0, left: 0 });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!wrapperRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 2, left: rect.left });
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={wrapperRef} className="citation-style-launcher">
      <button
        ref={btnRef}
        type="button"
        className="citation-style-launcher-btn"
        onClick={handleToggle}
        aria-label="Citation and document style"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Citation &amp; Document Style"
      >
        <DialogLauncherIcon />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="citation-style-menu"
          role="listbox"
          aria-label="Citation style options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {CITATION_STYLE_OPTIONS.map((s) => (
            <li key={s} role="option" aria-selected={s === value}>
              <button
                type="button"
                className={`citation-style-menu-item${s === value ? ' citation-style-menu-item--active' : ''}`}
                onClick={() => { onChange(s); setOpen(false); }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

export const LineSpacingDropdown = ({ value, onChange }: { value: string; onChange: (spacing: string) => void }) => {
  const [open, setOpen] = React.useState(false);
  const [menuPos, setMenuPos] = React.useState({ top: 0, left: 0 });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!wrapperRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom, left: rect.left });
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={wrapperRef} className="line-spacing-dropdown">
      <button
        ref={btnRef}
        type="button"
        className="line-spacing-btn"
        onClick={handleToggle}
        aria-label="Line Spacing"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <TextLineSpacing size={16} />
        <ChevronDown size={12} />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="line-spacing-menu"
          role="listbox"
          aria-label="Line spacing options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {LINE_SPACINGS.map((s) => (
            <li key={s} role="option" aria-selected={s === value}>
              <button
                type="button"
                className={`line-spacing-menu-item${s === value ? ' line-spacing-menu-item--active' : ''}`}
                onClick={() => { onChange(s); setOpen(false); }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};
