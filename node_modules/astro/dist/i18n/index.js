import { appendForwardSlash, joinPaths } from "@astrojs/internal-helpers/path";
import { shouldAppendForwardSlash } from "../core/build/util.js";
import { MissingLocale } from "../core/errors/errors-data.js";
import { AstroError } from "../core/errors/index.js";
function getLocaleRelativeUrl({
  locale,
  base,
  locales: _locales,
  trailingSlash,
  format,
  path,
  prependWith,
  normalizeLocale = true,
  strategy = "pathname-prefix-other-locales",
  defaultLocale
}) {
  const codeToUse = peekCodePathToUse(_locales, locale);
  if (!codeToUse) {
    throw new AstroError({
      ...MissingLocale,
      message: MissingLocale.message(locale)
    });
  }
  const pathsToJoin = [base, prependWith];
  const normalizedLocale = normalizeLocale ? normalizeTheLocale(codeToUse) : codeToUse;
  if (strategy === "pathname-prefix-always" || strategy === "pathname-prefix-always-no-redirect" || strategy === "domains-prefix-always" || strategy === "domains-prefix-always-no-redirect") {
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
function getLocaleAbsoluteUrl({ site, isBuild, ...rest }) {
  const localeUrl = getLocaleRelativeUrl(rest);
  const { domains, locale } = rest;
  let url;
  if (isBuild && domains && domains[locale]) {
    const base = domains[locale];
    url = joinPaths(base, localeUrl.replace(`/${rest.locale}`, ""));
  } else {
    if (site) {
      url = joinPaths(site, localeUrl);
    } else {
      url = localeUrl;
    }
  }
  if (shouldAppendForwardSlash(rest.trailingSlash, rest.format)) {
    return appendForwardSlash(url);
  } else {
    return url;
  }
}
function getLocaleRelativeUrlList({
  locales: _locales,
  ...rest
}) {
  const locales = toPaths(_locales);
  return locales.map((locale) => {
    return getLocaleRelativeUrl({ ...rest, locales, locale });
  });
}
function getLocaleAbsoluteUrlList(params) {
  const locales = toCodes(params.locales);
  return locales.map((currentLocale) => {
    return getLocaleAbsoluteUrl({ ...params, locale: currentLocale });
  });
}
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  throw new Unreachable();
}
function getLocaleByPath(path, locales) {
  for (const locale of locales) {
    if (typeof locale !== "string") {
      if (locale.path === path) {
        const code = locale.codes.at(0);
        if (code === void 0)
          throw new Unreachable();
        return code;
      }
    } else if (locale === path) {
      return locale;
    }
  }
  throw new Unreachable();
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function toCodes(locales) {
  return locales.map((loopLocale) => {
    if (typeof loopLocale === "string") {
      return loopLocale;
    } else {
      return loopLocale.codes[0];
    }
  });
}
function toPaths(locales) {
  return locales.map((loopLocale) => {
    if (typeof loopLocale === "string") {
      return loopLocale;
    } else {
      return loopLocale.path;
    }
  });
}
function peekCodePathToUse(locales, locale) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  return void 0;
}
class Unreachable extends Error {
  constructor() {
    super(
      "Astro encountered an unexpected line of code.\nIn most cases, this is not your fault, but a bug in astro code.\nIf there isn't one already, please create an issue.\nhttps://astro.build/issues"
    );
  }
}
export {
  getLocaleAbsoluteUrl,
  getLocaleAbsoluteUrlList,
  getLocaleByPath,
  getLocaleRelativeUrl,
  getLocaleRelativeUrlList,
  getPathByLocale,
  normalizeTheLocale,
  toCodes,
  toPaths
};
