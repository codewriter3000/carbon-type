import styles from './Toolbar.module.css';

interface ToolbarProps {
  onBold?: () => void;
  onItalic?: () => void;
  onUnderline?: () => void;
  onHeading?: (level: 1 | 2 | 3) => void;
}

/**
 * Formatting toolbar.
 *
 * Accessibility contract:
 *  - role="toolbar" with aria-label groups buttons as a toolbar landmark.
 *  - Every button has a visible label AND an aria-label for screen readers.
 *  - All buttons are focusable native <button> elements — no custom roles needed.
 *  - Focus rings are provided by the global :focus-visible rule in global.css.
 *
 * Keyboard behaviour:
 *  - Tab moves focus through each button in DOM order.
 *  - Enter or Space activates the focused button.
 */
export function Toolbar({ onBold, onItalic, onUnderline, onHeading }: ToolbarProps) {
  return (
    <div role="toolbar" aria-label="Formatting toolbar" className={styles.toolbar}>
      <button
        type="button"
        onClick={onBold}
        className={styles.button}
        aria-label="Bold"
        title="Bold (Ctrl+B / Cmd+B)"
      >
        <strong aria-hidden="true">B</strong>
      </button>

      <button
        type="button"
        onClick={onItalic}
        className={styles.button}
        aria-label="Italic"
        title="Italic (Ctrl+I / Cmd+I)"
      >
        <em aria-hidden="true">I</em>
      </button>

      <button
        type="button"
        onClick={onUnderline}
        className={styles.button}
        aria-label="Underline"
        title="Underline"
      >
        <span className={styles.underlineLabel} aria-hidden="true">
          U
        </span>
      </button>

      <span className={styles.separator} role="separator" aria-orientation="vertical" />

      <button
        type="button"
        onClick={() => onHeading?.(1)}
        className={styles.button}
        aria-label="Heading 1"
        title="Heading 1"
      >
        H1
      </button>

      <button
        type="button"
        onClick={() => onHeading?.(2)}
        className={styles.button}
        aria-label="Heading 2"
        title="Heading 2"
      >
        H2
      </button>

      <button
        type="button"
        onClick={() => onHeading?.(3)}
        className={styles.button}
        aria-label="Heading 3"
        title="Heading 3"
      >
        H3
      </button>
    </div>
  );
}
