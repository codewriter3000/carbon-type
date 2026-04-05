import { Schema } from 'prosemirror-model';

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
        return [`h${node.attrs['level'] as number}`, 0];
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
