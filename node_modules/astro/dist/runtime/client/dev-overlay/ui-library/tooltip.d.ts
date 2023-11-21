import { type Icon } from './icons.js';
export interface DevOverlayTooltipSection {
    title?: string;
    inlineTitle?: string;
    icon?: Icon;
    content?: string;
    clickAction?: () => void | Promise<void>;
    clickDescription?: string;
}
export declare class DevOverlayTooltip extends HTMLElement {
    sections: DevOverlayTooltipSection[];
    shadowRoot: ShadowRoot;
    constructor();
    connectedCallback(): void;
    getElementForIcon(icon: Icon | (string & NonNullable<unknown>)): string;
}
