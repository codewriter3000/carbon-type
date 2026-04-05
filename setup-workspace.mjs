/**
 * setup-workspace.mjs
 *
 * Creates every source directory and file for Carbon Type M0.
 * Runs automatically via the `postinstall` npm lifecycle hook.
 * Idempotent: existing files are never overwritten.
 *
 * Usage (manual): node setup-workspace.mjs
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
let created = 0;

function write(relativePath, content) {
  const fullPath = join(ROOT, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  if (!existsSync(fullPath)) {
    writeFileSync(fullPath, content, 'utf8');
    console.log(`  created  ${relativePath}`);
    created++;
  }
}

console.log('\n🔧  Carbon Type — workspace setup\n');

// Ensure empty dirs that need to exist for Vite
mkdirSync(join(ROOT, 'public'), { recursive: true });

// ─── src/vite-env.d.ts ────────────────────────────────────────────────────────
write('src/vite-env.d.ts', `/// <reference types="vite/client" />\n`);

// ─── src/styles/tokens.css ────────────────────────────────────────────────────
write(
  'src/styles/tokens.css',
  `/**
 * Design token definitions — dark-first.
 *
 * All colours default to dark mode inside :root.
 * Light-mode overrides at the bottom reuse the same token names so that
 * no component ever hard-codes a raw colour value.
 */

:root {
  /* ── Backgrounds ──────────────────────────────────────────────────────── */
  --color-bg-primary: #1a1a1a;
  --color-bg-secondary: #242424;
  --color-bg-surface: #2d2d2d;

  /* ── Text ─────────────────────────────────────────────────────────────── */
  --color-text-primary: #e8e8e8;
  --color-text-secondary: #a8a8a8;
  --color-text-muted: #6b6b6b;

  /* ── Accent ───────────────────────────────────────────────────────────── */
  --color-accent-primary: #7b9fff;
  --color-accent-secondary: #5b7fe8;

  /* ── Chrome ───────────────────────────────────────────────────────────── */
  --color-border: #3a3a3a;
  --color-focus-ring: #7b9fff;

  /* ── Typography ───────────────────────────────────────────────────────── */
  --font-editor: Georgia, 'Times New Roman', serif;
  --font-ui: system-ui, -apple-system, sans-serif;
  --font-size-base: 16px;
  --font-size-editor: 1.125rem;
  --line-height-editor: 1.8;

  /* ── Spacing scale ────────────────────────────────────────────────────── */
  --spacing-xs: 0.25rem;  /*  4px */
  --spacing-sm: 0.5rem;   /*  8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */

  /* ── Border radii ─────────────────────────────────────────────────────── */
  --radius-sm: 4px;
  --radius-md: 8px;
}

/* ── Light-mode overrides ─────────────────────────────────────────────────── */
@media (prefers-color-scheme: light) {
  :root {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f5f5f5;
    --color-bg-surface: #fafafa;

    --color-text-primary: #1a1a1a;
    --color-text-secondary: #4a4a4a;
    --color-text-muted: #8a8a8a;

    --color-accent-primary: #2a5ce8;
    --color-accent-secondary: #1a4cd8;

    --color-border: #d4d4d4;
    --color-focus-ring: #2a5ce8;
  }
}
`
);

// ─── src/styles/global.css ────────────────────────────────────────────────────
write(
  'src/styles/global.css',
  `/**
 * global.css — reset and base styles.
 * Tokens must be imported first so custom properties are available.
 */

@import './tokens.css';

/* ── Box-sizing reset ─────────────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Base document ────────────────────────────────────────────────────────── */
html {
  font-size: var(--font-size-base);
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-ui);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  line-height: 1.5;
  min-height: 100dvh;
}

/* ── Focus ring — accessible, visible, consistent ────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

:focus:not(:focus-visible) {
  outline: none;
}

/* ── Reduced-motion ───────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ── ProseMirror gap cursor ───────────────────────────────────────────────── */
.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}

.ProseMirror-gapcursor::after {
  content: '';
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid var(--color-text-primary);
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
`
);

// ─── src/main.tsx ─────────────────────────────────────────────────────────────
write(
  'src/main.tsx',
  `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(
    'Root element #root not found. Ensure index.html contains <div id="root">.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`
);

// ─── src/editor-core/schema/index.ts ─────────────────────────────────────────
write(
  'src/editor-core/schema/index.ts',
  // NOTE: the heading toDOM uses a JS template literal — the \` and \${} below
  // are escape sequences so this setup script's own template literal is valid.
  `import { Schema } from 'prosemirror-model';

/**
 * Carbon Type document schema.
 *
 * Node hierarchy:
 *   doc
 *   ├─ title       (exactly one, at the top — the document title)
 *   └─ block+      (paragraphs, headings, blockquotes, code blocks, hr)
 *
 * Inline content: text, hard_break
 * Marks: em, strong, code, link, underline, strikethrough
 */
const schema = new Schema({
  nodes: {
    doc: {
      content: 'title block+',
    },

    title: {
      content: 'inline*',
      marks: '',
      defining: true,
      parseDOM: [{ tag: 'h1.doc-title' }],
      toDOM() {
        return ['h1', { class: 'doc-title' }, 0];
      },
    },

    paragraph: {
      content: 'inline*',
      marks: 'em strong code link underline strikethrough',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0];
      },
    },

    heading: {
      content: 'inline*',
      marks: 'em strong code link underline strikethrough',
      group: 'block',
      defining: true,
      attrs: { level: { default: 1 } },
      parseDOM: [
        { tag: 'h1', getAttrs: () => ({ level: 1 }) },
        { tag: 'h2', getAttrs: () => ({ level: 2 }) },
        { tag: 'h3', getAttrs: () => ({ level: 3 }) },
        { tag: 'h4', getAttrs: () => ({ level: 4 }) },
        { tag: 'h5', getAttrs: () => ({ level: 5 }) },
        { tag: 'h6', getAttrs: () => ({ level: 6 }) },
      ],
      toDOM(node) {
        return [\`h\${node.attrs['level'] as number}\`, 0];
      },
    },

    blockquote: {
      content: 'block+',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM() {
        return ['blockquote', 0];
      },
    },

    code_block: {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM() {
        return ['pre', ['code', 0]];
      },
    },

    horizontal_rule: {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM() {
        return ['hr'];
      },
    },

    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br'];
      },
    },

    text: {
      group: 'inline',
    },
  },

  marks: {
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() {
        return ['em', 0];
      },
    },

    strong: {
      parseDOM: [
        { tag: 'strong' },
        {
          tag: 'b',
          getAttrs: (node) => {
            const el = node as HTMLElement;
            return el.style?.fontWeight !== 'normal' ? null : false;
          },
        },
        { style: 'font-weight=bold' },
      ],
      toDOM() {
        return ['strong', 0];
      },
    },

    code: {
      parseDOM: [{ tag: 'code' }],
      toDOM() {
        return ['code', 0];
      },
    },

    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(node) {
            const el = node as HTMLElement;
            return { href: el.getAttribute('href'), title: el.getAttribute('title') };
          },
        },
      ],
      toDOM(node) {
        const { href, title } = node.attrs as { href: string; title: string | null };
        const domAttrs: Record<string, string> = { href };
        if (title) domAttrs['title'] = title;
        return ['a', domAttrs, 0];
      },
    },

    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM() {
        return ['u', 0];
      },
    },

    strikethrough: {
      parseDOM: [{ tag: 's' }, { tag: 'del' }, { style: 'text-decoration=line-through' }],
      toDOM() {
        return ['s', 0];
      },
    },
  },
});

export default schema;
`
);

// ─── src/editor-core/plugins/index.ts ────────────────────────────────────────
write(
  'src/editor-core/plugins/index.ts',
  `import { Plugin } from 'prosemirror-state';
import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { gapCursor } from 'prosemirror-gapcursor';
import { inputRules, InputRule } from 'prosemirror-inputrules';
import schema from '../schema';

/**
 * Input rules for common markdown-like shorthand:
 *   *text*   → em
 *   **text** → strong  (checked first — longer pattern takes priority)
 *   \`text\`  → code
 */
function buildInputRules(): Plugin {
  const rules: InputRule[] = [
    new InputRule(/\\*\\*([^*\\s][^*]*)\\*\\*$/, (state, match, start, end) => {
      const content = match[1] ?? '';
      if (!content) return null;
      return state.tr.replaceWith(
        start,
        end,
        schema.text(content, [schema.marks.strong.create()])
      );
    }),

    new InputRule(/\\*([^*\\s][^*]*)\\*$/, (state, match, start, end) => {
      const content = match[1] ?? '';
      if (!content) return null;
      return state.tr.replaceWith(
        start,
        end,
        schema.text(content, [schema.marks.em.create()])
      );
    }),

    new InputRule(/\`([^\`]+)\`$/, (state, match, start, end) => {
      const content = match[1] ?? '';
      if (!content) return null;
      return state.tr.replaceWith(
        start,
        end,
        schema.text(content, [schema.marks.code.create()])
      );
    }),
  ];

  return inputRules({ rules });
}

/**
 * Build the complete plugin array for the editor.
 * Plugin order matters: earlier plugins have higher key-binding priority.
 */
export function buildPlugins(): Plugin[] {
  return [
    history(),

    keymap({
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-z': undo,
      'Mod-Shift-z': redo,
      Enter: (state, dispatch) => {
        if (!dispatch) return false;
        dispatch(
          state.tr
            .replaceSelectionWith(schema.nodes.hard_break.create())
            .scrollIntoView()
        );
        return true;
      },
    }),

    keymap(baseKeymap),

    gapCursor(),

    buildInputRules(),
  ];
}
`
);

// ─── src/editor-core/commands/index.ts ───────────────────────────────────────
write(
  'src/editor-core/commands/index.ts',
  `import { Command } from 'prosemirror-state';
import { toggleMark, setBlockType } from 'prosemirror-commands';
import schema from '../schema';

/** Toggle the em (italic) mark on the current selection. */
export const toggleItalic: Command = toggleMark(schema.marks.em);

/** Toggle the strong (bold) mark on the current selection. */
export const toggleBold: Command = toggleMark(schema.marks.strong);

/** Toggle the inline code mark on the current selection. */
export const toggleCode: Command = toggleMark(schema.marks.code);

/** Toggle the underline mark on the current selection. */
export const toggleUnderline: Command = toggleMark(schema.marks.underline);

/**
 * Set the current block to a heading of the given level (1–6).
 * Returns a Command so callers can bind it to a key or toolbar button.
 */
export function setHeading(level: 1 | 2 | 3 | 4 | 5 | 6): Command {
  return setBlockType(schema.nodes.heading, { level });
}

/**
 * Insert a hard line break (\\<br\\>) at the cursor position.
 * This breaks the line within the same block without creating a new paragraph.
 */
export const insertHardBreak: Command = (state, dispatch) => {
  if (!dispatch) return false;
  dispatch(
    state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView()
  );
  return true;
};
`
);

// ─── src/editor-core/EditorCore.tsx ──────────────────────────────────────────
write(
  'src/editor-core/EditorCore.tsx',
  `import { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import schema from './schema';
import { buildPlugins } from './plugins';
import styles from './EditorCore.module.css';

interface EditorCoreProps {
  /** Optional extra class name applied to the editor container. */
  className?: string;
}

/**
 * EditorCore — the ProseMirror editing surface.
 *
 * Accessibility contract:
 *  - The outer container div carries role="textbox", aria-multiline, and
 *    aria-label so that assistive technology identifies the editing region.
 *  - The inner ProseMirror contenteditable div does not repeat those
 *    attributes (controlled via the EditorView \`attributes\` option) to
 *    prevent duplicate ARIA exposure.
 *
 * Keyboard behaviour (via plugins):
 *  - Mod-b  → bold, Mod-i → italic
 *  - Mod-z  → undo, Mod-Shift-z → redo
 *  - Enter  → insert hard break (inline line break within a block)
 *  - All standard ProseMirror navigation keys
 */
export function EditorCore({ className }: EditorCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Minimal valid initial document: one empty title + one empty paragraph.
    const initialDoc = schema.node('doc', null, [
      schema.node('title', null, []),
      schema.node('paragraph', null, []),
    ]);

    const state = EditorState.create({
      schema,
      plugins: buildPlugins(),
      doc: initialDoc,
    });

    const view = new EditorView(containerRef.current, {
      state,
      // ARIA is handled on the outer container div.
      // This option prevents accidental duplication on the inner
      // ProseMirror contenteditable element.
      attributes: {
        'data-editor-content': '',
      },
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[styles.editor, className].filter(Boolean).join(' ')}
      role="textbox"
      aria-multiline="true"
      aria-label="Document editor"
    />
  );
}
`
);

// ─── src/editor-core/EditorCore.module.css ────────────────────────────────────
write(
  'src/editor-core/EditorCore.module.css',
  `.editor {
  width: 100%;
  min-height: 400px;
  font-family: var(--font-editor);
  font-size: var(--font-size-editor);
  line-height: var(--line-height-editor);
  color: var(--color-text-primary);
  background-color: var(--color-bg-surface);
  padding: var(--spacing-xl) var(--spacing-2xl);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

/* ProseMirror inner contenteditable div */
.editor :global(.ProseMirror) {
  outline: none;
  min-height: 360px;
  white-space: pre-wrap;
}

.editor :global(.ProseMirror-focused) {
  outline: none;
}

/* Document title (h1.doc-title) */
.editor :global(.doc-title) {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
}

/* Headings */
.editor :global(h2) { font-size: 1.5rem;   margin-top: var(--spacing-lg); }
.editor :global(h3) { font-size: 1.25rem;  margin-top: var(--spacing-lg); }
.editor :global(h4) { font-size: 1.125rem; margin-top: var(--spacing-md); }

/* Paragraphs */
.editor :global(p) {
  margin-top: var(--spacing-sm);
}

/* Blockquote */
.editor :global(blockquote) {
  border-left: 3px solid var(--color-accent-primary);
  padding-left: var(--spacing-md);
  color: var(--color-text-secondary);
  margin: var(--spacing-md) 0;
}

/* Code block */
.editor :global(pre) {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
}

/* Inline code */
.editor :global(code) {
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  padding: 0.1em 0.3em;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875em;
}

/* Horizontal rule */
.editor :global(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--spacing-lg) 0;
}
`
);

// ─── src/components/Toolbar/Toolbar.tsx ───────────────────────────────────────
write(
  'src/components/Toolbar/Toolbar.tsx',
  `import styles from './Toolbar.module.css';

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
`
);

// ─── src/components/Toolbar/Toolbar.module.css ────────────────────────────────
write(
  'src/components/Toolbar/Toolbar.module.css',
  `.toolbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 var(--spacing-xs);
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.button:hover {
  background-color: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.button:active {
  background-color: var(--color-bg-primary);
}

.underlineLabel {
  text-decoration: underline;
}

.separator {
  display: block;
  width: 1px;
  height: 1.25rem;
  background-color: var(--color-border);
  margin: 0 var(--spacing-xs);
  flex-shrink: 0;
}
`
);

// ─── src/components/App.tsx ───────────────────────────────────────────────────
write(
  'src/components/App.tsx',
  `import '../styles/global.css';
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
`
);

// ─── src/components/App.module.css ────────────────────────────────────────────
write(
  'src/components/App.module.css',
  `.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: var(--color-bg-primary);
}

.header {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.appTitle {
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent-primary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.editorWrapper {
  flex: 1;
}
`
);

// ─── tests/setup.ts ───────────────────────────────────────────────────────────
write('tests/setup.ts', `import '@testing-library/jest-dom';\n`);

// ─── tests/editor-core/schema.test.ts ────────────────────────────────────────
write(
  'tests/editor-core/schema.test.ts',
  `import { describe, it, expect } from 'vitest';
import schema from '../../src/editor-core/schema';

describe('Carbon Type editor schema', () => {
  it('defines a doc node type', () => {
    expect(schema.nodes['doc']).toBeDefined();
  });

  it('defines a title node type', () => {
    expect(schema.nodes['title']).toBeDefined();
  });

  it('defines a paragraph node type', () => {
    expect(schema.nodes['paragraph']).toBeDefined();
  });

  it('defines a heading node type', () => {
    expect(schema.nodes['heading']).toBeDefined();
  });

  it('heading node has a level attribute', () => {
    const headingSpec = schema.nodes['heading'].spec;
    expect(headingSpec.attrs).toHaveProperty('level');
  });

  it('heading level attribute defaults to 1', () => {
    const attrs = schema.nodes['heading'].spec.attrs as Record<string, { default: unknown }>;
    expect(attrs['level']).toMatchObject({ default: 1 });
  });

  it('defines an em (italic) mark', () => {
    expect(schema.marks['em']).toBeDefined();
  });

  it('defines a strong (bold) mark', () => {
    expect(schema.marks['strong']).toBeDefined();
  });

  it('defines a code mark', () => {
    expect(schema.marks['code']).toBeDefined();
  });

  it('defines a link mark with href and title attrs', () => {
    expect(schema.marks['link']).toBeDefined();
    const attrs = schema.marks['link'].spec.attrs as Record<string, unknown>;
    expect(attrs).toHaveProperty('href');
    expect(attrs).toHaveProperty('title');
  });

  it('defines underline and strikethrough marks', () => {
    expect(schema.marks['underline']).toBeDefined();
    expect(schema.marks['strikethrough']).toBeDefined();
  });

  it('doc content allows title followed by blocks', () => {
    // Construct a minimal valid document to validate the content expression
    const doc = schema.node('doc', null, [
      schema.node('title', null, []),
      schema.node('paragraph', null, []),
    ]);
    expect(doc.type.name).toBe('doc');
    expect(doc.childCount).toBe(2);
  });
});
`
);

console.log('\n\u2705  Done \u2014 ' + created + ' file(s) created.\n');
