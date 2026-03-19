import { Button, TabPanel } from '@carbon/react';
import { DocumentAdd, FolderOpen, DocumentDownload, SettingsAdjust, Printer } from '@carbon/icons-react';
import { RibbonChunk, RibbonDivider } from './RibbonChunk';

interface FileTabPanelProps {
  onNew?: () => void;
  onOpen?: () => void;
  onDownload?: () => void;
  onPageSetup?: () => void;
  onPrint: () => void;
}

const FileTabPanel = ({
  onNew,
  onOpen,
  onDownload,
  onPageSetup,
  onPrint,
}: FileTabPanelProps) => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="File">
        <div className="ribbon-row">
          <Button
            className="items-center file-op-btn"
            kind="ghost"
            size="sm"
            renderIcon={DocumentAdd}
            iconDescription="New"

            onClick={onNew}
          >
            New
          </Button>
          <Button
            className="items-center file-op-btn"
            kind="ghost"
            size="sm"
            renderIcon={FolderOpen}
            iconDescription="Open"

            onClick={onOpen}
          >
            Open
          </Button>
          <Button
            className="items-center file-op-btn"
            kind="ghost"
            size="sm"
            renderIcon={DocumentDownload}
            iconDescription="Download"

            onClick={onDownload}
          >
            Download
          </Button>
        </div>
      </RibbonChunk>
      <RibbonDivider />
      <RibbonChunk label="Page">
        <div className="ribbon-row">
          <Button
            className="items-center file-op-btn"
            kind="ghost"
            size="sm"
            renderIcon={SettingsAdjust}
            iconDescription="Page Setup"

            onClick={onPageSetup}
          >
            Page Setup
          </Button>
          <Button
            className="items-center file-op-btn"
            kind="ghost"
            size="sm"
            renderIcon={Printer}
            iconDescription="Print"

            onClick={onPrint}
          >
            Print
          </Button>
        </div>
      </RibbonChunk>
    </div>
  </TabPanel>
);

export default FileTabPanel;
