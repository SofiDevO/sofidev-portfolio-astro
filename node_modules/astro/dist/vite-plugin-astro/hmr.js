import { slash } from "@astrojs/internal-helpers/path";
import { fileURLToPath } from "node:url";
import {
  cachedCompilation,
  invalidateCompilation,
  isCached
} from "../core/compile/index.js";
import * as msg from "../core/messages.js";
import { isAstroScript } from "./query.js";
const PKG_PREFIX = fileURLToPath(new URL("../../", import.meta.url));
const E2E_PREFIX = fileURLToPath(new URL("../../e2e", import.meta.url));
const isPkgFile = (id) => {
  return id?.startsWith(PKG_PREFIX) && !id.startsWith(E2E_PREFIX);
};
async function handleHotUpdate(ctx, { config, logger, compile, source }) {
  let isStyleOnlyChange = false;
  if (ctx.file.endsWith(".astro") && isCached(config, ctx.file)) {
    const oldResult = await compile();
    if (oldResult.source === source)
      return [];
    invalidateCompilation(config, ctx.file);
    const newResult = await compile();
    if (isStyleOnlyChanged(oldResult, newResult)) {
      isStyleOnlyChange = true;
    }
  } else {
    invalidateCompilation(config, ctx.file);
  }
  if (isPkgFile(ctx.file)) {
    return;
  }
  const filtered = new Set(ctx.modules);
  const files = /* @__PURE__ */ new Set();
  for (const mod of ctx.modules) {
    if (isPkgFile(mod.id ?? mod.file)) {
      filtered.delete(mod);
      continue;
    }
    if (mod.file && isCached(config, mod.file)) {
      filtered.add(mod);
      files.add(mod.file);
    }
    for (const imp of mod.importers) {
      if (imp.file && isCached(config, imp.file)) {
        filtered.add(imp);
        files.add(imp.file);
      }
    }
  }
  for (const file2 of files) {
    if (isStyleOnlyChange && file2 === ctx.file)
      continue;
    invalidateCompilation(config, file2);
    if (file2.endsWith(".astro")) {
      ctx.server.moduleGraph.onFileChange(file2);
    }
  }
  const mods = [...filtered].filter((m) => !m.url.endsWith("="));
  const file = ctx.file.replace(slash(fileURLToPath(config.root)), "/");
  if (isStyleOnlyChange) {
    logger.info("astro", msg.hmr({ file, style: true }));
    return mods.filter((mod) => mod.id !== ctx.file && !mod.id?.endsWith(".ts"));
  }
  for (const mod of mods) {
    for (const imp of mod.importedModules) {
      if (imp.id && isAstroScript(imp.id)) {
        mods.push(imp);
      }
    }
  }
  const isSelfAccepting = mods.every((m) => m.isSelfAccepting || m.url.endsWith(".svelte"));
  if (isSelfAccepting) {
    if (/astro\.config\.[cm][jt]s$/.test(file))
      return mods;
    logger.info("astro", msg.hmr({ file }));
  } else {
    logger.info("astro", msg.reload({ file }));
  }
  return mods;
}
function isStyleOnlyChanged(oldResult, newResult) {
  return normalizeCode(oldResult.code) === normalizeCode(newResult.code) && !isArrayEqual(oldResult.css, newResult.css);
}
const astroStyleImportRE = /import\s*"[^"]+astro&type=style[^"]+";/g;
const sourceMappingUrlRE = /\/\/# sourceMappingURL=[^ ]+$/gm;
function normalizeCode(code) {
  return code.replace(astroStyleImportRE, "").replace(sourceMappingUrlRE, "").trim();
}
function isArrayEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
export {
  handleHotUpdate
};
