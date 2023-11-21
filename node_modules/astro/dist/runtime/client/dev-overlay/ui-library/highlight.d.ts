import { type Icon } from './icons.js';
export declare class DevOverlayHighlight extends HTMLElement {
    icon?: Icon | undefined | null;
    shadowRoot: ShadowRoot;
    constructor();
    connectedCallback(): void;
}
