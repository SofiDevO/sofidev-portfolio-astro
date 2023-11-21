import { type Icon } from './icons.js';
export declare class DevOverlayCard extends HTMLElement {
    icon?: Icon;
    link?: string | undefined | null;
    shadowRoot: ShadowRoot;
    constructor();
    connectedCallback(): void;
    getElementForIcon(icon: Icon): string;
}
