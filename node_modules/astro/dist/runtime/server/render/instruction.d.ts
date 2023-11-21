import type { HydrationMetadata } from '../hydration.js';
export type RenderDirectiveInstruction = {
    type: 'directive';
    hydration: HydrationMetadata;
};
export type RenderHeadInstruction = {
    type: 'head';
};
export type MaybeRenderHeadInstruction = {
    type: 'maybe-head';
};
export type RenderInstruction = RenderDirectiveInstruction | RenderHeadInstruction | MaybeRenderHeadInstruction;
export declare function createRenderInstruction(instruction: RenderDirectiveInstruction): RenderDirectiveInstruction;
export declare function createRenderInstruction(instruction: RenderHeadInstruction): RenderHeadInstruction;
export declare function createRenderInstruction(instruction: MaybeRenderHeadInstruction): MaybeRenderHeadInstruction;
export declare function isRenderInstruction(chunk: any): chunk is RenderInstruction;
