import { viteID } from "../core/util.js";
import { isBuildableCSSRequest } from "./util.js";
import { crawlGraph } from "./vite.js";
async function getStylesForURL(filePath, loader, mode) {
  const importedCssUrls = /* @__PURE__ */ new Set();
  const importedStylesMap = /* @__PURE__ */ new Map();
  for await (const importedModule of crawlGraph(loader, viteID(filePath), true)) {
    if (isBuildableCSSRequest(importedModule.url)) {
      let ssrModule;
      try {
        ssrModule = importedModule.ssrModule ?? await loader.import(importedModule.url);
      } catch {
        continue;
      }
      if (mode === "development" && // only inline in development
      typeof ssrModule?.default === "string") {
        importedStylesMap.set(importedModule.url, {
          id: importedModule.id ?? importedModule.url,
          url: importedModule.url,
          content: ssrModule.default
        });
      } else {
        importedCssUrls.add(importedModule.url);
      }
    }
  }
  return {
    urls: importedCssUrls,
    styles: [...importedStylesMap.values()]
  };
}
export {
  getStylesForURL
};
