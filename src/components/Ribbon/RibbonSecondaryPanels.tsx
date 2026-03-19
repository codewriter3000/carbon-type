import { Button, TabPanel } from '@carbon/react';
import {
  Table,
  Image,
  Link,
  TextIndentMore,
  TextIndentLess,
  SpellCheck,
  ZoomIn,
  ZoomOut,
  Printer,
} from '@carbon/icons-react';
import { RibbonChunk, RibbonDivider } from './RibbonChunk';

interface RibbonSecondaryPanelsProps {
  onFormat: (command: string, value?: string) => void;
  onPrint: () => void;
  onZoom: (delta: number) => void;
}

const InsertTabPanel = ({ onPrint }: Pick<RibbonSecondaryPanelsProps, 'onPrint'>) => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="Tables">
        <div className="ribbon-row">
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Table}
            iconDescription="Insert Table"
          >
            Table
          </Button>
        </div>
      </RibbonChunk>
      <RibbonDivider />
      <RibbonChunk label="Illustrations">
        <div className="ribbon-row">
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Image}
            iconDescription="Picture"
          >
            Picture
          </Button>
        </div>
      </RibbonChunk>
      <RibbonDivider />
      <RibbonChunk label="Links">
        <div className="ribbon-row">
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Link}
            iconDescription="Hyperlink"
          >
            Hyperlink
          </Button>
        </div>
      </RibbonChunk>
      <RibbonDivider />
      <RibbonChunk label="Print">
        <div className="ribbon-row">
          <Button
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

const LayoutTabPanel = ({ onFormat }: Pick<RibbonSecondaryPanelsProps, 'onFormat'>) => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="Page Setup">
        <div className="ribbon-row">
          <Button kind="ghost" size="sm">
            Margins
          </Button>
          <Button kind="ghost" size="sm">
            Orientation
          </Button>
          <Button kind="ghost" size="sm">
            Size
          </Button>
        </div>
      </RibbonChunk>
      <RibbonDivider />
      <RibbonChunk label="Paragraph">
        <div className="ribbon-row">
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={TextIndentMore}
            iconDescription="Increase Indent"

            onClick={() => onFormat('indent')}
          />
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={TextIndentLess}
            iconDescription="Decrease Indent"

            onClick={() => onFormat('outdent')}
          />
        </div>
      </RibbonChunk>
    </div>
  </TabPanel>
);

const ReferencesTabPanel = () => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="Table of Contents">
        <div className="ribbon-row">
          <Button kind="ghost" size="sm">
            Table of Contents
          </Button>
        </div>
      </RibbonChunk>
      <RibbonDivider />
      <RibbonChunk label="Footnotes">
        <div className="ribbon-row">
          <Button kind="ghost" size="sm">
            Insert Footnote
          </Button>
        </div>
      </RibbonChunk>
    </div>
  </TabPanel>
);

const ReviewTabPanel = () => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="Proofing">
        <div className="ribbon-row">
          <Button
            kind="ghost"
            size="sm"
            renderIcon={SpellCheck}
            iconDescription="Spelling &amp; Grammar"
          >
            Spelling &amp; Grammar
          </Button>
        </div>
      </RibbonChunk>
    </div>
  </TabPanel>
);

const ViewTabPanel = ({ onZoom }: Pick<RibbonSecondaryPanelsProps, 'onZoom'>) => (
  <TabPanel>
    <div className="ribbon-panel">
      <RibbonChunk label="Zoom">
        <div className="ribbon-row">
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={ZoomOut}
            iconDescription="Zoom Out"

            onClick={() => onZoom(-10)}
          />
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={ZoomIn}
            iconDescription="Zoom In"

            onClick={() => onZoom(10)}
          />
          <Button kind="ghost" size="sm" onClick={() => onZoom(0)}>
            100%
          </Button>
        </div>
      </RibbonChunk>
    </div>
  </TabPanel>
);

const RibbonSecondaryPanels = ({ onFormat, onPrint, onZoom }: RibbonSecondaryPanelsProps) => (
  <>
    <InsertTabPanel onPrint={onPrint} />
    <LayoutTabPanel onFormat={onFormat} />
    <ReferencesTabPanel />
    <ReviewTabPanel />
    <ViewTabPanel onZoom={onZoom} />
  </>
);

export default RibbonSecondaryPanels;
