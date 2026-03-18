interface WordStatusBarProps {
  wordCount: number;
  zoom: number;
}

const WordStatusBar = ({ wordCount, zoom }: WordStatusBarProps) => (
  <div className="word-status-bar">
    <span>Page 1 of 1</span>
    <span className="word-status-bar__divider">|</span>
    <span>Words: {wordCount}</span>
    <span className="word-status-bar__divider">|</span>
    <span>Zoom: {zoom}%</span>
    <span className="word-status-bar__divider">|</span>
    <span>Please note that this app is unstable</span>
  </div>
);

export default WordStatusBar;
