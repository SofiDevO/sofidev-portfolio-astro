export type Fallback = 'none' | 'animate' | 'swap';
export type Direction = 'forward' | 'back';
export type Options = {
    history?: 'auto' | 'push' | 'replace';
    formData?: FormData;
};
export declare const supportsViewTransitions: boolean;
export declare const transitionEnabledOnThisPage: () => boolean;
export declare function navigate(href: string, options?: Options): void;
