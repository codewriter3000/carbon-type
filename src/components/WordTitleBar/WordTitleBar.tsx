import { Button, Toggle } from '@carbon/react';
import { Save, Undo, Redo, Printer } from '@carbon/icons-react';

interface WordTitleBarProps {
  documentName: string;
  autosaveEnabled: boolean;
  autosaveStatus: '' | 'saving' | 'saved';
  onAutosaveToggle: (enabled: boolean) => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onPrint: () => void;
}

const WordTitleBar = ({
  documentName,
  autosaveEnabled,
  autosaveStatus,
  onAutosaveToggle,
  onSave,
  onUndo,
  onRedo,
  onPrint,
}: WordTitleBarProps) => (
  <div className="word-title-bar">
    <div className="word-title-bar__quick-access">
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        renderIcon={Save}
        iconDescription="Save"
        tooltipPosition="bottom"
        onClick={onSave}
      />
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        renderIcon={Undo}
        iconDescription="Undo"
        tooltipPosition="bottom"
        onClick={onUndo}
      />
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        renderIcon={Redo}
        iconDescription="Redo"
        tooltipPosition="bottom"
        onClick={onRedo}
      />
    </div>

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
          labelText="Autosave"
          hideLabel
          toggled={autosaveEnabled}
          onToggle={onAutosaveToggle}
        />
      </span>
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        renderIcon={Printer}
        iconDescription="Print"
        tooltipPosition="bottom"
        onClick={onPrint}
      />
    </div>
  </div>
);

export default WordTitleBar;
