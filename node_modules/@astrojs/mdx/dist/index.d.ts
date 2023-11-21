import { markdownConfigDefaults } from '@astrojs/markdown-remark';
import type { PluggableList } from '@mdx-js/mdx/lib/core.js';
import type { AstroIntegration } from 'astro';
import type { Options as RemarkRehypeOptions } from 'remark-rehype';
import type { OptimizeOptions } from './rehype-optimize-static.js';
export type MdxOptions = Omit<typeof markdownConfigDefaults, 'remarkPlugins' | 'rehypePlugins'> & {
    extendMarkdownConfig: boolean;
    recmaPlugins: PluggableList;
    remarkPlugins: PluggableList;
    rehypePlugins: PluggableList;
    remarkRehype: RemarkRehypeOptions;
    optimize: boolean | OptimizeOptions;
};
export default function mdx(partialMdxOptions?: Partial<MdxOptions>): AstroIntegration;
