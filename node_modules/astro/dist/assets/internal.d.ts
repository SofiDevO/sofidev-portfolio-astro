import type { AstroConfig, AstroSettings } from '../@types/astro.js';
import { type ImageService } from './services/service.js';
import type { GetImageResult, ImageMetadata, UnresolvedImageTransform } from './types.js';
export declare function injectImageEndpoint(settings: AstroSettings, mode: 'dev' | 'build'): AstroSettings;
export declare function isESMImportedImage(src: ImageMetadata | string): src is ImageMetadata;
export declare function isRemoteImage(src: ImageMetadata | string): src is string;
export declare function isRemoteAllowed(src: string, { domains, remotePatterns, }: Partial<Pick<AstroConfig['image'], 'domains' | 'remotePatterns'>>): boolean;
export declare function getConfiguredImageService(): Promise<ImageService>;
export declare function getImage(options: UnresolvedImageTransform, imageConfig: AstroConfig['image']): Promise<GetImageResult>;
