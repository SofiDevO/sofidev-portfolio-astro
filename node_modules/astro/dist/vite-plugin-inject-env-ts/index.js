import { bold } from "kleur/colors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizePath } from "vite";
import { getContentPaths, getDotAstroTypeReference } from "../content/index.js";
import {} from "../core/logger/core.js";
function getEnvTsPath({ srcDir }) {
  return new URL("env.d.ts", srcDir);
}
function astroInjectEnvTsPlugin({
  settings,
  logger,
  fs
}) {
  return {
    name: "astro-inject-env-ts",
    // Use `post` to ensure project setup is complete
    // Ex. `.astro` types have been written
    enforce: "post",
    async config() {
      await setUpEnvTs({ settings, logger, fs });
    }
  };
}
async function setUpEnvTs({
  settings,
  logger,
  fs
}) {
  const envTsPath = getEnvTsPath(settings.config);
  const dotAstroDir = getContentPaths(settings.config).cacheDir;
  const dotAstroTypeReference = getDotAstroTypeReference(settings.config);
  const envTsPathRelativetoRoot = normalizePath(
    path.relative(fileURLToPath(settings.config.root), fileURLToPath(envTsPath))
  );
  if (fs.existsSync(envTsPath)) {
    let typesEnvContents = await fs.promises.readFile(envTsPath, "utf-8");
    if (typesEnvContents.includes('types="astro/client-image"')) {
      typesEnvContents = typesEnvContents.replace(
        'types="astro/client-image"',
        'types="astro/client"'
      );
      await fs.promises.writeFile(envTsPath, typesEnvContents, "utf-8");
      logger.info("assets", `Removed ${bold(envTsPathRelativetoRoot)} types`);
    }
    if (!fs.existsSync(dotAstroDir))
      return;
    const expectedTypeReference = getDotAstroTypeReference(settings.config);
    if (!typesEnvContents.includes(expectedTypeReference)) {
      typesEnvContents = `${expectedTypeReference}
${typesEnvContents}`;
      await fs.promises.writeFile(envTsPath, typesEnvContents, "utf-8");
      logger.info("content", `Added ${bold(envTsPathRelativetoRoot)} types`);
    }
  } else {
    let referenceDefs = [];
    referenceDefs.push('/// <reference types="astro/client" />');
    if (fs.existsSync(dotAstroDir)) {
      referenceDefs.push(dotAstroTypeReference);
    }
    await fs.promises.mkdir(settings.config.srcDir, { recursive: true });
    await fs.promises.writeFile(envTsPath, referenceDefs.join("\n"), "utf-8");
    logger.info("astro", `Added ${bold(envTsPathRelativetoRoot)} types`);
  }
}
export {
  astroInjectEnvTsPlugin,
  getEnvTsPath,
  setUpEnvTs
};
