import React from 'react';
import { ChevronDown } from '@carbon/icons-react';

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

interface RibbonChunkProps {
  label: string;
  children: React.ReactNode;
  launcher?: React.ReactNode;
}

export const RibbonChunk = ({
  label,
  children,
  launcher,
}: RibbonChunkProps) => {
  const isMobile = React.useContext(RibbonMobileContext);
  const [open, setOpen] = React.useState(false);
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
    const handleToggle = () => setOpen((o) => !o);

    return (
      <div className="ribbon-chunk-mobile">
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
        {open && (
          <div
            ref={menuRef}
            className="ribbon-chunk-mobile-dropdown"
          >
            {children}
            {launcher && <div className="ribbon-chunk-mobile-dropdown__launcher">{launcher}</div>}
          </div>
        )}
      </div>
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
