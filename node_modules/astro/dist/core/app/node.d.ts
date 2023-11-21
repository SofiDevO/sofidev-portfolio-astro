/// <reference types="node" resolution-mode="require"/>
import type { RouteData } from '../../@types/astro.js';
import type { SSRManifest } from './types.js';
import { IncomingMessage } from 'node:http';
import { App, type MatchOptions } from './index.js';
export { apply as applyPolyfills } from '../polyfill.js';
declare class NodeIncomingMessage extends IncomingMessage {
    /**
     * Allow the request body to be explicitly overridden. For example, this
     * is used by the Express JSON middleware.
     */
    body?: unknown;
}
export declare class NodeApp extends App {
    match(req: NodeIncomingMessage | Request, opts?: MatchOptions): RouteData | undefined;
    render(req: NodeIncomingMessage | Request, routeData?: RouteData, locals?: object): Promise<Response>;
}
export declare function loadManifest(rootFolder: URL): Promise<SSRManifest>;
export declare function loadApp(rootFolder: URL): Promise<NodeApp>;
