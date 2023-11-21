import { type Icon } from './icons.js';
export declare class DevOverlayWindow extends HTMLElement {
    windowTitle?: string | undefined | null;
    windowIcon?: Icon | undefined | null;
    shadowRoot: ShadowRoot;
    constructor();
    connectedCallback(): Promise<void>;
    getElementForIcon(icon: Icon): string | undefined;
}
