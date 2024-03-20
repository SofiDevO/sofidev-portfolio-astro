import type { AstroConfig, RoutePart } from '../../../@types/astro.js';
export declare function getRouteGenerator(segments: RoutePart[][], addTrailingSlash: AstroConfig['trailingSlash']): (params: object) => string;
