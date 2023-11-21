import type { AstroConfig } from '../@types/astro.js';
type GetLocaleRelativeUrl = GetLocaleOptions & {
    locale: string;
    base: string;
    locales: string[];
    trailingSlash: AstroConfig['trailingSlash'];
    format: AstroConfig['build']['format'];
    routingStrategy?: 'prefix-always' | 'prefix-other-locales';
    defaultLocale: string;
};
export type GetLocaleOptions = {
    /**
     * Makes the locale URL-friendly by replacing underscores with dashes, and converting the locale to lower case.
     * @default true
     */
    normalizeLocale?: boolean;
    /**
     * An optional path to add after the `locale`.
     */
    path?: string;
    /**
     *  An optional path to prepend to `locale`.
     */
    prependWith?: string;
};
type GetLocaleAbsoluteUrl = GetLocaleRelativeUrl & {
    site: AstroConfig['site'];
};
/**
 * The base URL
 */
export declare function getLocaleRelativeUrl({ locale, base, locales, trailingSlash, format, path, prependWith, normalizeLocale, routingStrategy, defaultLocale, }: GetLocaleRelativeUrl): string;
/**
 * The absolute URL
 */
export declare function getLocaleAbsoluteUrl({ site, ...rest }: GetLocaleAbsoluteUrl): string;
type GetLocalesBaseUrl = GetLocaleOptions & {
    base: string;
    locales: string[];
    trailingSlash: AstroConfig['trailingSlash'];
    format: AstroConfig['build']['format'];
    routingStrategy?: 'prefix-always' | 'prefix-other-locales';
    defaultLocale: string;
};
export declare function getLocaleRelativeUrlList({ base, locales, trailingSlash, format, path, prependWith, normalizeLocale, routingStrategy, defaultLocale, }: GetLocalesBaseUrl): string[];
export declare function getLocaleAbsoluteUrlList({ site, ...rest }: GetLocaleAbsoluteUrl): string[];
/**
 *
 * Given a locale, this function:
 * - replaces the `_` with a `-`;
 * - transforms all letters to be lower case;
 */
export declare function normalizeTheLocale(locale: string): string;
export {};
