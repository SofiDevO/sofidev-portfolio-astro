import type { Processor } from 'unified';
import type { MdxOptions } from './index.js';
interface MdxProcessorExtraOptions {
    sourcemap: boolean;
    importMetaEnv: Record<string, any>;
}
export declare function createMdxProcessor(mdxOptions: MdxOptions, extraOptions: MdxProcessorExtraOptions): Processor;
export {};
