import type { MiddlewareEndpointHandler, SSRManifest } from '../@types/astro.js';
export declare function createI18nMiddleware(i18n: SSRManifest['i18n'], base: SSRManifest['base']): MiddlewareEndpointHandler | undefined;
