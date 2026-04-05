import { describe, it, expect } from 'vitest';
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
