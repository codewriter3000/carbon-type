import { Button, TabPanel } from '@carbon/react';
import { FormEvent, useState } from 'react';

export interface NewStyleFormValues {
  styleName: string;
  styleType: string;
  baseStyle: 'Normal' | 'Heading 1' | 'Heading 2' | 'Heading 3';
  followingParagraphStyle: string;
}

interface NewStyleTabPanelProps {
  onSaveStyle: (values: NewStyleFormValues) => void;
}

const NewStyleTabPanel = ({ onSaveStyle }: NewStyleTabPanelProps) => {
  const [styleName, setStyleName] = useState('');
  const [styleType, setStyleType] = useState('Linked (paragraph and character)');
  const [baseStyle, setBaseStyle] = useState('Normal');
  const [followingParagraphStyle, setFollowingParagraphStyle] = useState('Normal');
  const [previewText, setPreviewText] = useState('The quick brown fox jumped over the lazy dog.');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveStyle({
      styleName: styleName.trim(),
      styleType,
      baseStyle: baseStyle as NewStyleFormValues['baseStyle'],
      followingParagraphStyle,
    });
  };

  return (
    <TabPanel>
      <div className="ribbon-panel new-style-panel">
        <form className="new-style-form" onSubmit={handleSubmit}>
          <div className="new-style-form-grid">
            <label htmlFor="new-style-name">Style name</label>
            <input
              id="new-style-name"
              value={styleName}
              onChange={(event) => setStyleName(event.target.value)}
              placeholder="My Custom Style"
            />

            <label htmlFor="new-style-type">Style type</label>
            <select
              id="new-style-type"
              value={styleType}
              onChange={(event) => setStyleType(event.target.value)}
            >
              <option value="Paragraph">Paragraph</option>
              <option value="Character">Character</option>
              <option value="Linked (paragraph and character)">Linked (paragraph and character)</option>
            </select>

            <label htmlFor="new-style-base">Style based on</label>
            <select
              id="new-style-base"
              value={baseStyle}
              onChange={(event) => setBaseStyle(event.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="Heading 1">Heading 1</option>
              <option value="Heading 2">Heading 2</option>
              <option value="Heading 3">Heading 3</option>
            </select>

            <label htmlFor="new-style-following">Style for following paragraph</label>
            <select
              id="new-style-following"
              value={followingParagraphStyle}
              onChange={(event) => setFollowingParagraphStyle(event.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="Body">Body</option>
              <option value="Heading 1">Heading 1</option>
              <option value="Heading 2">Heading 2</option>
            </select>
          </div>

          <div className="new-style-preview" aria-live="polite">
            <textarea
              id="new-style-preview-input"
              className="new-style-preview__input"
              value={previewText}
              onChange={(event) => setPreviewText(event.target.value)}
              rows={3}
              style={{ resize: 'none', maxWidth: '440px', maxHeight: '128px' }}
            />
          </div>

          <div className="new-style-form__actions">
            <Button type="submit" size="sm">
              Save Style
            </Button>
          </div>
        </form>
      </div>
    </TabPanel>
  );
};

export default NewStyleTabPanel;
