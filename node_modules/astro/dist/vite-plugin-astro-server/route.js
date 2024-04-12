import {
  DEFAULT_404_COMPONENT,
  REROUTE_DIRECTIVE_HEADER,
  clientLocalsSymbol
} from "../core/constants.js";
import { AstroErrorData, isAstroError } from "../core/errors/index.js";
import { req } from "../core/messages.js";
import { loadMiddleware } from "../core/middleware/loadMiddleware.js";
import { RenderContext } from "../core/render-context.js";
import { getProps } from "../core/render/index.js";
import { createRequest } from "../core/request.js";
import { matchAllRoutes } from "../core/routing/index.js";
import { normalizeTheLocale } from "../i18n/index.js";
import { getSortedPreloadedMatches } from "../prerender/routing.js";
import { default404Page, handle404Response, writeSSRResult, writeWebResponse } from "./response.js";
function isLoggedRequest(url) {
  return url !== "/favicon.ico";
}
function getCustom404Route(manifestData) {
  const route404 = /^\/404\/?$/;
  return manifestData.routes.find((r) => route404.test(r.route));
}
async function matchRoute(pathname, manifestData, pipeline) {
  const { config, logger, routeCache, serverLike, settings } = pipeline;
  const matches = matchAllRoutes(pathname, manifestData);
  const preloadedMatches = await getSortedPreloadedMatches({ pipeline, matches, settings });
  for await (const { preloadedComponent, route: maybeRoute, filePath } of preloadedMatches) {
    try {
      await getProps({
        mod: preloadedComponent,
        routeData: maybeRoute,
        routeCache,
        pathname,
        logger,
        serverLike
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
  const altPathname = pathname.replace(/(?:index)?\.html$/, "");
  if (altPathname !== pathname) {
    return await matchRoute(altPathname, manifestData, pipeline);
  }
  if (matches.length) {
    const possibleRoutes = matches.flatMap((route) => route.component);
    logger.warn(
      "router",
      `${AstroErrorData.NoMatchingStaticPathFound.message(
        pathname
      )}

${AstroErrorData.NoMatchingStaticPathFound.hint(possibleRoutes)}`
    );
  }
  const custom404 = getCustom404Route(manifestData);
  if (custom404 && custom404.component === DEFAULT_404_COMPONENT) {
    const component = {
      default: default404Page
    };
    return {
      route: custom404,
      filePath: new URL(`file://${custom404.component}`),
      resolvedPathname: pathname,
      preloadedComponent: component,
      mod: component
    };
  }
  if (custom404) {
    const filePath = new URL(`./${custom404.component}`, config.root);
    const preloadedComponent = await pipeline.preload(filePath);
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
  incomingResponse
}) {
  const timeStart = performance.now();
  const { config, loader, logger } = pipeline;
  if (!matchedRoute && !config.i18n) {
    if (isLoggedRequest(pathname)) {
      logger.info(null, req({ url: pathname, method: incomingRequest.method, statusCode: 404 }));
    }
    return handle404Response(origin, incomingRequest, incomingResponse);
  }
  let request;
  let renderContext;
  let mod = void 0;
  let options = void 0;
  let route;
  const middleware = (await loadMiddleware(loader)).onRequest;
  const locals = Reflect.get(incomingRequest, clientLocalsSymbol);
  if (!matchedRoute) {
    if (config.i18n) {
      const locales = config.i18n.locales;
      const pathNameHasLocale = pathname.split("/").filter(Boolean).some((segment) => {
        let found = false;
        for (const locale of locales) {
          if (typeof locale === "string") {
            if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) {
              found = true;
              break;
            }
          } else {
            if (locale.path === segment) {
              found = true;
              break;
            }
          }
        }
        return found;
      });
      if (!pathNameHasLocale && pathname !== "/") {
        return handle404Response(origin, incomingRequest, incomingResponse);
      }
      request = createRequest({
        base: config.base,
        url,
        headers: incomingRequest.headers,
        logger,
        // no route found, so we assume the default for rendering the 404 page
        staticLike: config.output === "static" || config.output === "hybrid"
      });
      route = {
        component: "",
        generate(_data) {
          return "";
        },
        params: [],
        // Disable eslint as we only want to generate an empty RegExp
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(""),
        prerender: false,
        segments: [],
        type: "fallback",
        route: "",
        fallbackRoutes: [],
        isIndex: false
      };
      renderContext = RenderContext.create({
        pipeline,
        pathname,
        middleware,
        request,
        routeData: route
      });
    } else {
      return handle404Response(origin, incomingRequest, incomingResponse);
    }
  } else {
    const filePath = matchedRoute.filePath;
    const { preloadedComponent } = matchedRoute;
    route = matchedRoute.route;
    request = createRequest({
      base: config.base,
      url,
      headers: incomingRequest.headers,
      method: incomingRequest.method,
      body,
      logger,
      clientAddress: incomingRequest.socket.remoteAddress,
      staticLike: config.output === "static" || route.prerender
    });
    for (const [name, value] of Object.entries(config.server.headers ?? {})) {
      if (value)
        incomingResponse.setHeader(name, value);
    }
    options = {
      pipeline,
      filePath,
      preload: preloadedComponent,
      pathname,
      request,
      route
    };
    mod = preloadedComponent;
    renderContext = RenderContext.create({
      locals,
      pipeline,
      pathname,
      middleware,
      request,
      routeData: route
    });
  }
  let response = await renderContext.render(mod);
  if (isLoggedRequest(pathname)) {
    const timeEnd = performance.now();
    logger.info(
      null,
      req({
        url: pathname,
        method: incomingRequest.method,
        statusCode: status ?? response.status,
        reqTime: timeEnd - timeStart
      })
    );
  }
  if (response.status === 404 && response.headers.get(REROUTE_DIRECTIVE_HEADER) !== "no") {
    const fourOhFourRoute = await matchRoute("/404", manifestData, pipeline);
    if (options && options.route !== fourOhFourRoute?.route)
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
        incomingResponse
      });
  }
  if (response.headers.has(REROUTE_DIRECTIVE_HEADER)) {
    response.headers.delete(REROUTE_DIRECTIVE_HEADER);
  }
  if (route.type === "endpoint") {
    await writeWebResponse(incomingResponse, response);
    return;
  }
  if (response.status < 400 && response.status >= 300) {
    await writeSSRResult(request, response, incomingResponse);
    return;
  }
  if (status && response.status !== status && (status === 404 || status === 500)) {
    response = new Response(response.body, {
      status,
      headers: response.headers
    });
  }
  await writeSSRResult(request, response, incomingResponse);
}
function getStatus(matchedRoute) {
  if (!matchedRoute)
    return 404;
  if (matchedRoute.route.route === "/404")
    return 404;
  if (matchedRoute.route.route === "/500")
    return 500;
}
export {
  handleRoute,
  matchRoute
};
