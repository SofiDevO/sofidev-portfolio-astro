import type { AstroMarkdownOptions, MarkdownProcessor, MarkdownRenderingOptions, MarkdownRenderingResult } from './types.js';
export { InvalidAstroDataError, setVfileFrontmatter } from './frontmatter-injection.js';
export { rehypeHeadingIds } from './rehype-collect-headings.js';
export { remarkCollectImages } from './remark-collect-images.js';
export { remarkPrism } from './remark-prism.js';
export { remarkShiki } from './remark-shiki.js';
export * from './types.js';
export declare const markdownConfigDefaults: Omit<Required<AstroMarkdownOptions>, 'drafts'>;
/**
 * Create a markdown preprocessor to render multiple markdown files
 */
export declare function createMarkdownProcessor(opts?: AstroMarkdownOptions): Promise<MarkdownProcessor>;
/**
 * Shared utility for rendering markdown
 *
 * @deprecated Use `createMarkdownProcessor` instead for better performance
 */
export declare function renderMarkdown(content: string, opts: MarkdownRenderingOptions): Promise<MarkdownRenderingResult>;
