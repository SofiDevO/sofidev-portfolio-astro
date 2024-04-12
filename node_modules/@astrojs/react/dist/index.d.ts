import { type Options as ViteReactPluginOptions } from '@vitejs/plugin-react';
import type { AstroIntegration } from 'astro';
export type ReactIntegrationOptions = Pick<ViteReactPluginOptions, 'include' | 'exclude' | 'babel'> & {
    experimentalReactChildren?: boolean;
};
export default function ({ include, exclude, babel, experimentalReactChildren, }?: ReactIntegrationOptions): AstroIntegration;
