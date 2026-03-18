import { Button, TabPanel } from '@carbon/react';
import { RibbonChunk } from './RibbonChunk';

interface HelpTabPanelProps {
  onFeatureRequest: () => void;
  onBug: () => void;
  onContribute: () => void;
}

const HelpTabPanel = ({ onFeatureRequest, onBug, onContribute }: HelpTabPanelProps) => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="Support">
        <div className="ribbon-row">
          <Button kind="ghost" size="sm" onClick={onFeatureRequest}>
            Feature Request
          </Button>
          <Button kind="ghost" size="sm" onClick={onBug}>
            Bug
          </Button>
          <Button kind="ghost" size="sm" onClick={onContribute}>
            Contribute
          </Button>
        </div>
      </RibbonChunk>
    </div>
  </TabPanel>
);

export default HelpTabPanel;
