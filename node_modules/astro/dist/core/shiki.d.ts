import { getHighlighter, type Highlighter } from 'shikiji';
type HighlighterOptions = NonNullable<Parameters<typeof getHighlighter>[0]>;
/**
 * shiki -> shikiji compat as we need to manually replace it
 */
export declare function replaceCssVariables(str: string): string;
export declare function getCachedHighlighter(opts: HighlighterOptions): Promise<Highlighter>;
export {};
