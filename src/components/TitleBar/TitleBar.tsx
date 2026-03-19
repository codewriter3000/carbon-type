import { Toggle } from '@carbon/react';

interface TitleBarProps {
  documentName: string;
  autosaveEnabled: boolean;
  autosaveStatus: '' | 'saving' | 'saved';
  onAutosaveToggle: (enabled: boolean) => void;
}

const TitleBar = ({
  documentName,
  autosaveEnabled,
  autosaveStatus,
  onAutosaveToggle,
}: TitleBarProps) => (
  <div className="word-title-bar">
    <div className="word-title-bar__document-title">
      {documentName} - Carbon Type
    </div>

    <div className="word-title-bar__right">
      {autosaveEnabled && autosaveStatus && (
        <span className="word-title-bar__autosave-status">
          {autosaveStatus === 'saving' ? 'Saving...' : 'Autosaved'}
        </span>
      )}
      <span className="word-title-bar__autosave-toggle">
        <span className="word-title-bar__autosave-toggle-label">Autosave</span>
        <Toggle
          id="autosave-toggle"
          size="sm"
          labelText=""
          hideLabel
          toggled={autosaveEnabled}
          onToggle={onAutosaveToggle}
        />
      </span>
    </div>
  </div>
);

export default TitleBar;
