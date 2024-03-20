import type { BuildOptions, Plugin as VitePlugin, Rollup } from 'vite';
type OutputOptionsHook = Extract<VitePlugin['outputOptions'], Function>;
type OutputOptions = Parameters<OutputOptionsHook>[0];
type ExtendManualChunksHooks = {
    before?: Rollup.GetManualChunk;
    after?: Rollup.GetManualChunk;
};
export declare function extendManualChunks(outputOptions: OutputOptions, hooks: ExtendManualChunksHooks): void;
export declare const ASTRO_PAGE_EXTENSION_POST_PATTERN = "@_@";
/**
 * Prevents Rollup from triggering other plugins in the process by masking the extension (hence the virtual file).
 *
 * 1. We add a fixed prefix, which is used as virtual module naming convention
 * 2. If the path has an extension (at the end of the path), we replace the dot that belongs to the extension with an arbitrary string.
 *
 * @param virtualModulePrefix
 * @param path
 */
export declare function getVirtualModulePageNameFromPath(virtualModulePrefix: string, path: string): string;
/**
 *
 * @param virtualModulePrefix
 * @param id
 */
export declare function getPathFromVirtualModulePageName(virtualModulePrefix: string, id: string): string;
export declare function shouldInlineAsset(assetContent: string, assetPath: string, assetsInlineLimit: NonNullable<BuildOptions['assetsInlineLimit']>): boolean;
export {};
