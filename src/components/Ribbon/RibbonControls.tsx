import React from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, TextLineSpacing } from '@carbon/icons-react';
import {
  CASE_OPTIONS,
  CITATION_STYLE_OPTIONS,
  FONT_COLOR_OPTIONS,
  HIGHLIGHT_COLOR_OPTIONS,
  LINE_SPACINGS,
  TEXT_EFFECT_OPTIONS,
} from './ribbonConfig';

export const RibbonMobileContext = React.createContext(false);

export const useMobileRibbon = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 815px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
};

export const RibbonChunk = ({
  label,
  children,
  launcher,
}: {
  label: string;
  children: React.ReactNode;
  launcher?: React.ReactNode;
}) => {
  const isMobile = React.useContext(RibbonMobileContext);
  const [open, setOpen] = React.useState(false);
  const [menuPos, setMenuPos] = React.useState({ top: 0, left: 0 });
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!btnRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  if (isMobile) {
    const handleToggle = () => {
      if (!open && btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setMenuPos({ top: rect.bottom + 2, left: Math.max(8, rect.left) });
      }
      setOpen((o) => !o);
    };

    return (
      <>
        <button
          ref={btnRef}
          type="button"
          className={`ribbon-chunk-mobile-btn${open ? ' ribbon-chunk-mobile-btn--open' : ''}`}
          onClick={handleToggle}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {label}
          <ChevronDown size={12} />
        </button>
        {open && typeof document !== 'undefined' && ReactDOM.createPortal(
          <div
            ref={menuRef}
            className="ribbon-chunk-mobile-dropdown"
            style={{
              top: menuPos.top,
              left: menuPos.left,
              maxHeight: `calc(100vh - ${menuPos.top}px - 8px)`,
            }}
          >
            {children}
            {launcher && <div className="ribbon-chunk-mobile-dropdown__launcher">{launcher}</div>}
          </div>,
          document.body
        )}
      </>
    );
  }

  return (
    <div className="ribbon-chunk">
      <div className="ribbon-chunk__controls">{children}</div>
      <div className="ribbon-chunk__label">
        <span>{label}</span>
        {launcher && <span className="ribbon-chunk__launcher">{launcher}</span>}
      </div>
    </div>
  );
};

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

export const ChangeCaseDropdown = ({ onChange }: { onChange: (mode: string) => void }) => {
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
    <div ref={wrapperRef} className="change-case-dropdown">
      <button
        ref={btnRef}
        type="button"
        className="change-case-btn"
        onClick={handleToggle}
        aria-label="Change case"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change case"
      >
        <span className="change-case-btn__text">Aa</span>
        <ChevronDown size={12} />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="change-case-menu"
          role="listbox"
          aria-label="Change case options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {CASE_OPTIONS.map((option) => (
            <li key={option.value} role="option" aria-selected={false}>
              <button
                type="button"
                className="change-case-menu-item"
                onClick={() => { onChange(option.value); setOpen(false); }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

export const TextEffectsDropdown = ({ onChange }: { onChange: (effect: string) => void }) => {
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
    <div ref={wrapperRef} className="text-effects-dropdown">
      <button
        ref={btnRef}
        type="button"
        className="text-effects-btn"
        onClick={handleToggle}
        aria-label="Text effects and typography"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Text effects and typography"
      >
        <span className="text-effects-btn__text">A</span>
        <ChevronDown size={12} />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="text-effects-menu"
          role="listbox"
          aria-label="Text effects and typography options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {TEXT_EFFECT_OPTIONS.map((option) => (
            <li key={option.value} role="option" aria-selected={false}>
              <button
                type="button"
                className="text-effects-menu-item"
                onClick={() => { onChange(option.value); setOpen(false); }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

const ColorSwatch = ({ color }: { color: string }) => (
  <span
    className="color-option-swatch"
    style={{ backgroundColor: color === 'transparent' ? '#ffffff' : color }}
    aria-hidden="true"
  />
);

export const FontColorDropdown = ({ onChange }: { onChange: (color: string) => void }) => {
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
    <div ref={wrapperRef} className="font-color-dropdown">
      <button
        ref={btnRef}
        type="button"
        className="font-color-btn"
        onClick={handleToggle}
        aria-label="Font color"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Font color"
      >
        <span className="font-color-btn__glyph" aria-hidden="true">
          <span className="font-color-btn__text">A</span>
          <span className="font-color-btn__bar" />
        </span>
        <ChevronDown size={12} />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="font-color-menu"
          role="listbox"
          aria-label="Font color options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {FONT_COLOR_OPTIONS.map((option) => (
            <li key={option.value} role="option" aria-selected={false}>
              <button
                type="button"
                className="font-color-menu-item"
                onClick={() => { onChange(option.value); setOpen(false); }}
              >
                <ColorSwatch color={option.value} />
                <span>{option.label}</span>
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

export const HighlightColorDropdown = ({ onChange }: { onChange: (color: string) => void }) => {
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
    <div ref={wrapperRef} className="highlight-color-dropdown">
      <button
        ref={btnRef}
        type="button"
        className="highlight-color-btn"
        onClick={handleToggle}
        aria-label="Text highlight color"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Text highlight color"
      >
        <span className="highlight-color-btn__glyph" aria-hidden="true">
          <span className="highlight-color-btn__text">ab</span>
          <span className="highlight-color-btn__bar" />
        </span>
        <ChevronDown size={12} />
      </button>
      {open && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ul
          ref={menuRef}
          className="highlight-color-menu"
          role="listbox"
          aria-label="Text highlight options"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {HIGHLIGHT_COLOR_OPTIONS.map((option) => (
            <li key={option.value} role="option" aria-selected={false}>
              <button
                type="button"
                className="highlight-color-menu-item"
                onClick={() => { onChange(option.value); setOpen(false); }}
              >
                <ColorSwatch color={option.value} />
                <span>{option.label}</span>
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};
