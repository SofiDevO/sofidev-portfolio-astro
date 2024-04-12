import { isBuildableCSSRequest } from "../../../vite-plugin-astro-server/util.js";
import { RESOLVED_VIRTUAL_MODULE_ID as ASTRO_CONTENT_VIRTUAL_MODULE_ID } from "../../../content/consts.js";
import { hasAssetPropagationFlag } from "../../../content/index.js";
import * as assetName from "../css-asset-name.js";
import {
  getParentExtendedModuleInfos,
  getParentModuleInfos,
  moduleIsTopLevelPage
} from "../graph.js";
import {
  eachPageData,
  getPageDataByViteID,
  getPageDatasByClientOnlyID,
  getPageDatasByHoistedScriptId,
  isHoistedScript
} from "../internal.js";
import { extendManualChunks, shouldInlineAsset } from "./util.js";
function pluginCSS(options, internals) {
  return {
    targets: ["client", "server"],
    hooks: {
      "build:before": ({ target }) => {
        let plugins = rollupPluginAstroBuildCSS({
          buildOptions: options,
          internals,
          target
        });
        return {
          vitePlugin: plugins
        };
      }
    }
  };
}
function rollupPluginAstroBuildCSS(options) {
  const { internals, buildOptions } = options;
  const { settings } = buildOptions;
  let resolvedConfig;
  const pagesToCss = {};
  const pagesToPropagatedCss = {};
  const isContentCollectionCache = options.buildOptions.settings.config.output === "static" && options.buildOptions.settings.config.experimental.contentCollectionCache;
  const cssBuildPlugin = {
    name: "astro:rollup-plugin-build-css",
    outputOptions(outputOptions) {
      const assetFileNames = outputOptions.assetFileNames;
      const namingIncludesHash = assetFileNames?.toString().includes("[hash]");
      const createNameForParentPages = namingIncludesHash ? assetName.shortHashedName : assetName.createSlugger(settings);
      extendManualChunks(outputOptions, {
        after(id, meta) {
          if (isBuildableCSSRequest(id)) {
            if (options.target === "client") {
              return internals.cssModuleToChunkIdMap.get(id);
            }
            const ctx = { getModuleInfo: meta.getModuleInfo };
            for (const pageInfo of getParentModuleInfos(id, ctx)) {
              if (hasAssetPropagationFlag(pageInfo.id)) {
                const chunkId2 = assetName.createNameHash(id, [id]);
                internals.cssModuleToChunkIdMap.set(id, chunkId2);
                return chunkId2;
              }
            }
            const chunkId = createNameForParentPages(id, meta);
            internals.cssModuleToChunkIdMap.set(id, chunkId);
            return chunkId;
          }
        }
      });
    },
    async generateBundle(_outputOptions, bundle) {
      for (const [, chunk] of Object.entries(bundle)) {
        if (chunk.type !== "chunk")
          continue;
        if ("viteMetadata" in chunk === false)
          continue;
        const meta = chunk.viteMetadata;
        if (meta.importedCss.size < 1)
          continue;
        if (options.target === "client") {
          for (const id of Object.keys(chunk.modules)) {
            for (const pageData of getParentClientOnlys(id, this, internals)) {
              for (const importedCssImport of meta.importedCss) {
                const cssToInfoRecord = pagesToCss[pageData.moduleSpecifier] ??= {};
                cssToInfoRecord[importedCssImport] = { depth: -1, order: -1 };
              }
            }
          }
        }
        for (const id of Object.keys(chunk.modules)) {
          const parentModuleInfos = getParentExtendedModuleInfos(id, this, hasAssetPropagationFlag);
          for (const { info: pageInfo, depth, order } of parentModuleInfos) {
            if (hasAssetPropagationFlag(pageInfo.id)) {
              const walkId = isContentCollectionCache ? ASTRO_CONTENT_VIRTUAL_MODULE_ID : id;
              for (const parentInfo of getParentModuleInfos(walkId, this)) {
                if (moduleIsTopLevelPage(parentInfo) === false)
                  continue;
                const pageViteID = parentInfo.id;
                const pageData = getPageDataByViteID(internals, pageViteID);
                if (pageData === void 0)
                  continue;
                for (const css of meta.importedCss) {
                  const propagatedStyles = pagesToPropagatedCss[pageData.moduleSpecifier] ??= {};
                  const existingCss = propagatedStyles[pageInfo.id] ??= /* @__PURE__ */ new Set();
                  existingCss.add(css);
                }
              }
            } else if (moduleIsTopLevelPage(pageInfo)) {
              const pageViteID = pageInfo.id;
              const pageData = getPageDataByViteID(internals, pageViteID);
              if (pageData) {
                appendCSSToPage(pageData, meta, pagesToCss, depth, order);
              }
            } else if (options.target === "client" && isHoistedScript(internals, pageInfo.id)) {
              for (const pageData of getPageDatasByHoistedScriptId(internals, pageInfo.id)) {
                appendCSSToPage(pageData, meta, pagesToCss, -1, order);
              }
            }
          }
        }
      }
    }
  };
  const cssScopeToPlugin = {
    name: "astro:rollup-plugin-css-scope-to",
    renderChunk(_, chunk, __, meta) {
      for (const id in chunk.modules) {
        const modMeta = this.getModuleInfo(id)?.meta;
        const cssScopeTo = modMeta?.astroCss?.cssScopeTo;
        if (cssScopeTo && !isCssScopeToRendered(cssScopeTo, Object.values(meta.chunks))) {
          delete chunk.modules[id];
          const moduleIdsIndex = chunk.moduleIds.indexOf(id);
          if (moduleIdsIndex > -1) {
            chunk.moduleIds.splice(moduleIdsIndex, 1);
          }
        }
      }
    }
  };
  const singleCssPlugin = {
    name: "astro:rollup-plugin-single-css",
    enforce: "post",
    configResolved(config) {
      resolvedConfig = config;
    },
    generateBundle(_, bundle) {
      if (resolvedConfig.build.cssCodeSplit)
        return;
      const cssChunk = Object.values(bundle).find(
        (chunk) => chunk.type === "asset" && chunk.name === "style.css"
      );
      if (cssChunk === void 0)
        return;
      for (const pageData of eachPageData(internals)) {
        const cssToInfoMap = pagesToCss[pageData.moduleSpecifier] ??= {};
        cssToInfoMap[cssChunk.fileName] = { depth: -1, order: -1 };
      }
    }
  };
  let assetsInlineLimit;
  const inlineStylesheetsPlugin = {
    name: "astro:rollup-plugin-inline-stylesheets",
    enforce: "post",
    configResolved(config) {
      assetsInlineLimit = config.build.assetsInlineLimit;
    },
    async generateBundle(_outputOptions, bundle) {
      const inlineConfig = settings.config.build.inlineStylesheets;
      Object.entries(bundle).forEach(([id, stylesheet]) => {
        if (stylesheet.type !== "asset" || stylesheet.name?.endsWith(".css") !== true || typeof stylesheet.source !== "string")
          return;
        const toBeInlined = inlineConfig === "always" ? true : inlineConfig === "never" ? false : shouldInlineAsset(stylesheet.source, stylesheet.fileName, assetsInlineLimit);
        const sheet = toBeInlined ? { type: "inline", content: stylesheet.source } : { type: "external", src: stylesheet.fileName };
        const pages = Array.from(eachPageData(internals));
        let sheetAddedToPage = false;
        pages.forEach((pageData) => {
          const orderingInfo = pagesToCss[pageData.moduleSpecifier]?.[stylesheet.fileName];
          if (orderingInfo !== void 0) {
            pageData.styles.push({ ...orderingInfo, sheet });
            sheetAddedToPage = true;
            return;
          }
          const propagatedPaths = pagesToPropagatedCss[pageData.moduleSpecifier];
          if (propagatedPaths === void 0)
            return;
          Object.entries(propagatedPaths).forEach(([pageInfoId, css]) => {
            if (css.has(stylesheet.fileName) !== true)
              return;
            if (pageData.styles.some((s) => s.sheet === sheet))
              return;
            let propagatedStyles;
            if (isContentCollectionCache) {
              propagatedStyles = internals.propagatedStylesMap.get(pageInfoId) ?? internals.propagatedStylesMap.set(pageInfoId, /* @__PURE__ */ new Set()).get(pageInfoId);
            } else {
              propagatedStyles = pageData.propagatedStyles.get(pageInfoId) ?? pageData.propagatedStyles.set(pageInfoId, /* @__PURE__ */ new Set()).get(pageInfoId);
            }
            propagatedStyles.add(sheet);
            sheetAddedToPage = true;
          });
        });
        if (toBeInlined && sheetAddedToPage) {
          delete bundle[id];
          for (const chunk of Object.values(bundle)) {
            if (chunk.type === "chunk") {
              chunk.viteMetadata?.importedCss?.delete(id);
            }
          }
        }
      });
    }
  };
  return [cssBuildPlugin, cssScopeToPlugin, singleCssPlugin, inlineStylesheetsPlugin];
}
function* getParentClientOnlys(id, ctx, internals) {
  for (const info of getParentModuleInfos(id, ctx)) {
    yield* getPageDatasByClientOnlyID(internals, info.id);
  }
}
function appendCSSToPage(pageData, meta, pagesToCss, depth, order) {
  for (const importedCssImport of meta.importedCss) {
    const cssInfo = pagesToCss[pageData.moduleSpecifier]?.[importedCssImport];
    if (cssInfo !== void 0) {
      if (depth < cssInfo.depth) {
        cssInfo.depth = depth;
      }
      if (cssInfo.order === -1) {
        cssInfo.order = order;
      } else if (order < cssInfo.order && order > -1) {
        cssInfo.order = order;
      }
    } else {
      const cssToInfoRecord = pagesToCss[pageData.moduleSpecifier] ??= {};
      cssToInfoRecord[importedCssImport] = { depth, order };
    }
  }
}
function isCssScopeToRendered(cssScopeTo, chunks) {
  for (const moduleId in cssScopeTo) {
    const exports = cssScopeTo[moduleId];
    const renderedModule = chunks.find((c) => c.moduleIds.includes(moduleId))?.modules[moduleId];
    if (renderedModule?.renderedExports.some((e) => exports.includes(e))) {
      return true;
    }
  }
  return false;
}
export {
  pluginCSS
};
