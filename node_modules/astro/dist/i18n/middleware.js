import { appendForwardSlash, joinPaths } from "@astrojs/internal-helpers/path";
import { shouldAppendForwardSlash } from "../core/build/util.js";
import { REROUTE_DIRECTIVE_HEADER, ROUTE_TYPE_HEADER } from "../core/constants.js";
import { getPathByLocale, normalizeTheLocale } from "./index.js";
function pathnameHasLocale(pathname, locales) {
  const segments = pathname.split("/");
  for (const segment of segments) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) {
          return true;
        }
      } else if (segment === locale.path) {
        return true;
      }
    }
  }
  return false;
}
function createI18nMiddleware(i18n, base, trailingSlash, buildFormat) {
  if (!i18n)
    return (_, next) => next();
  const prefixAlways = (url, response, context) => {
    if (url.pathname === base + "/" || url.pathname === base) {
      if (shouldAppendForwardSlash(trailingSlash, buildFormat)) {
        return context.redirect(`${appendForwardSlash(joinPaths(base, i18n.defaultLocale))}`);
      } else {
        return context.redirect(`${joinPaths(base, i18n.defaultLocale)}`);
      }
    } else if (!pathnameHasLocale(url.pathname, i18n.locales)) {
      return notFound(response);
    }
    return void 0;
  };
  const prefixOtherLocales = (url, response) => {
    let pathnameContainsDefaultLocale = false;
    for (const segment of url.pathname.split("/")) {
      if (normalizeTheLocale(segment) === normalizeTheLocale(i18n.defaultLocale)) {
        pathnameContainsDefaultLocale = true;
        break;
      }
    }
    if (pathnameContainsDefaultLocale) {
      const newLocation = url.pathname.replace(`/${i18n.defaultLocale}`, "");
      response.headers.set("Location", newLocation);
      return notFound(response);
    }
    return void 0;
  };
  const prefixAlwaysNoRedirect = (url, response) => {
    const isRoot = url.pathname === base + "/" || url.pathname === base;
    if (!(isRoot || pathnameHasLocale(url.pathname, i18n.locales))) {
      return notFound(response);
    }
    return void 0;
  };
  return async (context, next) => {
    const response = await next();
    const type = response.headers.get(ROUTE_TYPE_HEADER);
    if (type !== "page" && type !== "fallback") {
      return response;
    }
    const { url, currentLocale } = context;
    const { locales, defaultLocale, fallback, strategy } = i18n;
    switch (i18n.strategy) {
      case "domains-prefix-other-locales": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixOtherLocales(url, response);
          if (result) {
            return result;
          }
        }
        break;
      }
      case "pathname-prefix-other-locales": {
        const result = prefixOtherLocales(url, response);
        if (result) {
          return result;
        }
        break;
      }
      case "domains-prefix-always-no-redirect": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixAlwaysNoRedirect(url, response);
          if (result) {
            return result;
          }
        }
        break;
      }
      case "pathname-prefix-always-no-redirect": {
        const result = prefixAlwaysNoRedirect(url, response);
        if (result) {
          return result;
        }
        break;
      }
      case "pathname-prefix-always": {
        const result = prefixAlways(url, response, context);
        if (result) {
          return result;
        }
        break;
      }
      case "domains-prefix-always": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixAlways(url, response, context);
          if (result) {
            return result;
          }
        }
        break;
      }
    }
    if (response.status >= 300 && fallback) {
      const fallbackKeys = i18n.fallback ? Object.keys(i18n.fallback) : [];
      const segments = url.pathname.split("/");
      const urlLocale = segments.find((segment) => {
        for (const locale of locales) {
          if (typeof locale === "string") {
            if (locale === segment) {
              return true;
            }
          } else if (locale.path === segment) {
            return true;
          }
        }
        return false;
      });
      if (urlLocale && fallbackKeys.includes(urlLocale)) {
        const fallbackLocale = fallback[urlLocale];
        const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
        let newPathname;
        if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
          newPathname = url.pathname.replace(`/${urlLocale}`, ``);
        } else {
          newPathname = url.pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
        }
        return context.redirect(newPathname);
      }
    }
    return response;
  };
}
function notFound(response) {
  if (response.headers.get(REROUTE_DIRECTIVE_HEADER) === "no")
    return response;
  return new Response(null, {
    status: 404,
    headers: response.headers
  });
}
function localeHasntDomain(i18n, currentLocale) {
  for (const domainLocale of Object.values(i18n.domainLookupTable)) {
    if (domainLocale === currentLocale) {
      return false;
    }
  }
  return true;
}
export {
  createI18nMiddleware
};
