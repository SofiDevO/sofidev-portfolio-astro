import { appendForwardSlash, joinPaths } from "@astrojs/internal-helpers/path";
import { shouldAppendForwardSlash } from "../core/build/util.js";
import { MissingLocale } from "../core/errors/errors-data.js";
import { AstroError } from "../core/errors/index.js";
function getLocaleRelativeUrl({
  locale,
  base,
  locales,
  trailingSlash,
  format,
  path,
  prependWith,
  normalizeLocale = true,
  routingStrategy = "prefix-other-locales",
  defaultLocale
}) {
  if (!locales.includes(locale)) {
    throw new AstroError({
      ...MissingLocale,
      message: MissingLocale.message(locale, locales)
    });
  }
  const pathsToJoin = [base, prependWith];
  const normalizedLocale = normalizeLocale ? normalizeTheLocale(locale) : locale;
  if (routingStrategy === "prefix-always") {
    pathsToJoin.push(normalizedLocale);
  } else if (locale !== defaultLocale) {
    pathsToJoin.push(normalizedLocale);
  }
  pathsToJoin.push(path);
  if (shouldAppendForwardSlash(trailingSlash, format)) {
    return appendForwardSlash(joinPaths(...pathsToJoin));
  } else {
    return joinPaths(...pathsToJoin);
  }
}
function getLocaleAbsoluteUrl({ site, ...rest }) {
  const locale = getLocaleRelativeUrl(rest);
  if (site) {
    return joinPaths(site, locale);
  } else {
    return locale;
  }
}
function getLocaleRelativeUrlList({
  base,
  locales,
  trailingSlash,
  format,
  path,
  prependWith,
  normalizeLocale = false,
  routingStrategy = "prefix-other-locales",
  defaultLocale
}) {
  return locales.map((locale) => {
    const pathsToJoin = [base, prependWith];
    const normalizedLocale = normalizeLocale ? normalizeTheLocale(locale) : locale;
    if (routingStrategy === "prefix-always") {
      pathsToJoin.push(normalizedLocale);
    } else if (locale !== defaultLocale) {
      pathsToJoin.push(normalizedLocale);
    }
    pathsToJoin.push(path);
    if (shouldAppendForwardSlash(trailingSlash, format)) {
      return appendForwardSlash(joinPaths(...pathsToJoin));
    } else {
      return joinPaths(...pathsToJoin);
    }
  });
}
function getLocaleAbsoluteUrlList({ site, ...rest }) {
  const locales = getLocaleRelativeUrlList(rest);
  return locales.map((locale) => {
    if (site) {
      return joinPaths(site, locale);
    } else {
      return locale;
    }
  });
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
export {
  getLocaleAbsoluteUrl,
  getLocaleAbsoluteUrlList,
  getLocaleRelativeUrl,
  getLocaleRelativeUrlList,
  normalizeTheLocale
};
