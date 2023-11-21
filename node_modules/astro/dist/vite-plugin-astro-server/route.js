import { fileURLToPath } from "node:url";
import { AstroErrorData, isAstroError } from "../core/errors/index.js";
import { sequence } from "../core/middleware/index.js";
import { loadMiddleware } from "../core/middleware/loadMiddleware.js";
import {
  createRenderContext,
  getParamsAndProps
} from "../core/render/index.js";
import { createRequest } from "../core/request.js";
import { matchAllRoutes } from "../core/routing/index.js";
import { isPage, resolveIdToUrl } from "../core/util.js";
import { createI18nMiddleware } from "../i18n/middleware.js";
import { getSortedPreloadedMatches } from "../prerender/routing.js";
import { isServerLikeOutput } from "../prerender/utils.js";
import { PAGE_SCRIPT_ID } from "../vite-plugin-scripts/index.js";
import { log404 } from "./common.js";
import { getStylesForURL } from "./css.js";
import { preload } from "./index.js";
import { getComponentMetadata } from "./metadata.js";
import { handle404Response, writeSSRResult, writeWebResponse } from "./response.js";
import { getScriptsForURL } from "./scripts.js";
const clientLocalsSymbol = Symbol.for("astro.locals");
function getCustom404Route(manifestData) {
  const route404 = /^\/404\/?$/;
  return manifestData.routes.find((r) => route404.test(r.route));
}
async function matchRoute(pathname, manifestData, pipeline) {
  const env = pipeline.getEnvironment();
  const { routeCache, logger } = env;
  let matches = matchAllRoutes(pathname, manifestData);
  const preloadedMatches = await getSortedPreloadedMatches({
    pipeline,
    matches,
    settings: pipeline.getSettings()
  });
  for await (const { preloadedComponent, route: maybeRoute, filePath } of preloadedMatches) {
    try {
      await getParamsAndProps({
        mod: preloadedComponent,
        route: maybeRoute,
        routeCache,
        pathname,
        logger,
        ssr: isServerLikeOutput(pipeline.getConfig())
      });
      return {
        route: maybeRoute,
        filePath,
        resolvedPathname: pathname,
        preloadedComponent,
        mod: preloadedComponent
      };
    } catch (e) {
      if (isAstroError(e) && e.title === AstroErrorData.NoMatchingStaticPathFound.title) {
        continue;
      }
      throw e;
    }
  }
  const altPathname = pathname.replace(/(index)?\.html$/, "");
  if (altPathname !== pathname) {
    return await matchRoute(altPathname, manifestData, pipeline);
  }
  if (matches.length) {
    const possibleRoutes = matches.flatMap((route) => route.component);
    pipeline.logger.warn(
      "getStaticPaths",
      `${AstroErrorData.NoMatchingStaticPathFound.message(
        pathname
      )}

${AstroErrorData.NoMatchingStaticPathFound.hint(possibleRoutes)}`
    );
  }
  log404(logger, pathname);
  const custom404 = getCustom404Route(manifestData);
  if (custom404) {
    const filePath = new URL(`./${custom404.component}`, pipeline.getConfig().root);
    const preloadedComponent = await preload({ pipeline, filePath });
    return {
      route: custom404,
      filePath,
      resolvedPathname: pathname,
      preloadedComponent,
      mod: preloadedComponent
    };
  }
  return void 0;
}
async function handleRoute({
  matchedRoute,
  url,
  pathname,
  status = getStatus(matchedRoute),
  body,
  origin,
  pipeline,
  manifestData,
  incomingRequest,
  incomingResponse,
  manifest
}) {
  const env = pipeline.getEnvironment();
  const config = pipeline.getConfig();
  const moduleLoader = pipeline.getModuleLoader();
  const { logger } = env;
  if (!matchedRoute && !config.experimental.i18n) {
    return handle404Response(origin, incomingRequest, incomingResponse);
  }
  const buildingToSSR = isServerLikeOutput(config);
  let request;
  let renderContext;
  let mod = void 0;
  let options = void 0;
  let route;
  const middleware = await loadMiddleware(moduleLoader);
  if (!matchedRoute) {
    if (config.experimental.i18n) {
      const locales = config.experimental.i18n.locales;
      const pathNameHasLocale = pathname.split("/").filter(Boolean).some((segment) => {
        return locales.includes(segment);
      });
      if (!pathNameHasLocale && pathname !== "/") {
        return handle404Response(origin, incomingRequest, incomingResponse);
      }
      request = createRequest({
        url,
        headers: buildingToSSR ? incomingRequest.headers : new Headers(),
        logger,
        ssr: buildingToSSR
      });
      route = {
        component: "",
        generate(_data) {
          return "";
        },
        params: [],
        pattern: new RegExp(""),
        prerender: false,
        segments: [],
        type: "fallback",
        route: ""
      };
      renderContext = await createRenderContext({
        request,
        pathname,
        env,
        mod,
        route
      });
    } else {
      return handle404Response(origin, incomingRequest, incomingResponse);
    }
  } else {
    const filePath = matchedRoute.filePath;
    const { preloadedComponent } = matchedRoute;
    route = matchedRoute.route;
    request = createRequest({
      url,
      headers: buildingToSSR ? incomingRequest.headers : new Headers(),
      method: incomingRequest.method,
      body,
      logger,
      ssr: buildingToSSR,
      clientAddress: buildingToSSR ? incomingRequest.socket.remoteAddress : void 0,
      locals: Reflect.get(incomingRequest, clientLocalsSymbol)
      // Allows adapters to pass in locals in dev mode.
    });
    for (const [name, value] of Object.entries(config.server.headers ?? {})) {
      if (value)
        incomingResponse.setHeader(name, value);
    }
    options = {
      env,
      filePath,
      preload: preloadedComponent,
      pathname,
      request,
      route
    };
    if (middleware) {
      options.middleware = middleware;
    }
    mod = options.preload;
    const { scripts, links, styles, metadata } = await getScriptsAndStyles({
      pipeline,
      filePath: options.filePath
    });
    const i18n = pipeline.getConfig().experimental.i18n;
    renderContext = await createRenderContext({
      request: options.request,
      pathname: options.pathname,
      scripts,
      links,
      styles,
      componentMetadata: metadata,
      route: options.route,
      mod,
      env,
      locales: i18n ? i18n.locales : void 0
    });
  }
  const onRequest = middleware?.onRequest;
  if (config.experimental.i18n) {
    const i18Middleware = createI18nMiddleware(config.experimental.i18n, config.base);
    if (i18Middleware) {
      if (onRequest) {
        pipeline.setMiddlewareFunction(sequence(i18Middleware, onRequest));
      } else {
        pipeline.setMiddlewareFunction(i18Middleware);
      }
    } else if (onRequest) {
      pipeline.setMiddlewareFunction(onRequest);
    }
  } else if (onRequest) {
    pipeline.setMiddlewareFunction(onRequest);
  }
  let response = await pipeline.renderRoute(renderContext, mod);
  if (response.status === 404 && has404Route(manifestData)) {
    const fourOhFourRoute = await matchRoute("/404", manifestData, pipeline);
    if (options && fourOhFourRoute?.route !== options.route)
      return handleRoute({
        ...options,
        matchedRoute: fourOhFourRoute,
        url: new URL(pathname, url),
        status: 404,
        body,
        origin,
        pipeline,
        manifestData,
        incomingRequest,
        incomingResponse,
        manifest
      });
  }
  if (route.type === "endpoint") {
    await writeWebResponse(incomingResponse, response);
  } else {
    if (
      // We are in a recursion, and it's possible that this function is called itself with a status code
      // By default, the status code passed via parameters is computed by the matched route.
      //
      // By default, we should give priority to the status code passed, although it's possible that
      // the `Response` emitted by the user is a redirect. If so, then return the returned response.
      response.status < 400 && response.status >= 300
    ) {
      await writeSSRResult(request, response, incomingResponse);
      return;
    } else if (status && response.status !== status && (status === 404 || status === 500)) {
      response = new Response(response.body, { ...response, status });
    }
    await writeSSRResult(request, response, incomingResponse);
  }
}
async function getScriptsAndStyles({ pipeline, filePath }) {
  const moduleLoader = pipeline.getModuleLoader();
  const settings = pipeline.getSettings();
  const mode = pipeline.getEnvironment().mode;
  const scripts = await getScriptsForURL(filePath, settings.config.root, moduleLoader);
  if (isPage(filePath, settings) && mode === "development") {
    scripts.add({
      props: { type: "module", src: "/@vite/client" },
      children: ""
    });
    if (settings.config.experimental.devOverlay) {
      scripts.add({
        props: {
          type: "module",
          src: await resolveIdToUrl(moduleLoader, "astro/runtime/client/dev-overlay/entrypoint.js")
        },
        children: ""
      });
      scripts.add({
        props: {},
        children: `window.__astro_dev_overlay__ = {root: ${JSON.stringify(
          fileURLToPath(settings.config.root)
        )}}`
      });
    }
  }
  for (const script of settings.scripts) {
    if (script.stage === "head-inline") {
      scripts.add({
        props: {},
        children: script.content
      });
    } else if (script.stage === "page" && isPage(filePath, settings)) {
      scripts.add({
        props: { type: "module", src: `/@id/${PAGE_SCRIPT_ID}` },
        children: ""
      });
    }
  }
  const { urls: styleUrls, styles: importedStyles } = await getStylesForURL(
    filePath,
    moduleLoader,
    mode
  );
  let links = /* @__PURE__ */ new Set();
  [...styleUrls].forEach((href) => {
    links.add({
      props: {
        rel: "stylesheet",
        href
      },
      children: ""
    });
  });
  let styles = /* @__PURE__ */ new Set();
  importedStyles.forEach(({ id, url, content }) => {
    scripts.add({
      props: {
        type: "module",
        src: url
      },
      children: ""
    });
    styles.add({
      props: {
        "data-vite-dev-id": id
      },
      children: content
    });
  });
  const metadata = await getComponentMetadata(filePath, moduleLoader);
  return { scripts, styles, links, metadata };
}
function getStatus(matchedRoute) {
  if (!matchedRoute)
    return 404;
  if (matchedRoute.route.route === "/404")
    return 404;
  if (matchedRoute.route.route === "/500")
    return 500;
}
function has404Route(manifest) {
  return manifest.routes.some((route) => route.route === "/404");
}
export {
  handleRoute,
  matchRoute
};
