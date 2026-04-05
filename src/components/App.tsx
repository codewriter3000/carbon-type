import '../styles/global.css';
import { EditorCore } from '../editor-core/EditorCore';
import { Toolbar } from './Toolbar/Toolbar';
import styles from './App.module.css';

/**
 * App root component.
 *
 * Landmark structure (accessibility):
 *  - <header> contains the application title.
 *  - <main>   contains the toolbar and the editing surface.
 *
 * The editing surface is labelled by EditorCore's aria-label.
 * The toolbar is identified by its own role="toolbar" and aria-label.
 */
export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.appTitle}>Carbon Type</h1>
      </header>
      <main className={styles.main}>
        <Toolbar />
        <EditorCore className={styles.editorWrapper} />
      </main>
    </div>
  );
}
