import { joinPaths } from "@astrojs/internal-helpers/path";
function checkIsLocaleFree(pathname, locales) {
  for (const locale of locales) {
    if (pathname.includes(`/${locale}`)) {
      return false;
    }
  }
  return true;
}
function createI18nMiddleware(i18n, base) {
  if (!i18n) {
    return void 0;
  }
  return async (context, next) => {
    if (!i18n) {
      return await next();
    }
    const { locales, defaultLocale, fallback } = i18n;
    const url = context.url;
    const response = await next();
    if (response instanceof Response) {
      const separators = url.pathname.split("/");
      const pathnameContainsDefaultLocale = url.pathname.includes(`/${defaultLocale}`);
      const isLocaleFree = checkIsLocaleFree(url.pathname, i18n.locales);
      if (i18n.routingStrategy === "prefix-other-locales" && pathnameContainsDefaultLocale) {
        const newLocation = url.pathname.replace(`/${defaultLocale}`, "");
        response.headers.set("Location", newLocation);
        return new Response(null, {
          status: 404,
          headers: response.headers
        });
      } else if (i18n.routingStrategy === "prefix-always") {
        if (url.pathname === base || url.pathname === base + "/") {
          return context.redirect(`${joinPaths(base, i18n.defaultLocale)}`);
        } else if (isLocaleFree) {
          return new Response(null, {
            status: 404,
            headers: response.headers
          });
        }
      }
      if (response.status >= 300 && fallback) {
        const fallbackKeys = i18n.fallback ? Object.keys(i18n.fallback) : [];
        const urlLocale = separators.find((s) => locales.includes(s));
        if (urlLocale && fallbackKeys.includes(urlLocale)) {
          const fallbackLocale = fallback[urlLocale];
          let newPathname;
          if (fallbackLocale === defaultLocale) {
            newPathname = url.pathname.replace(`/${urlLocale}`, ``);
          } else {
            newPathname = url.pathname.replace(`/${urlLocale}`, `/${fallbackLocale}`);
          }
          return context.redirect(newPathname);
        }
      }
    }
    return response;
  };
}
export {
  createI18nMiddleware
};
