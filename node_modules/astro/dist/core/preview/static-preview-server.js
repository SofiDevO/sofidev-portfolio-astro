import { fileURLToPath } from "node:url";
import { performance } from "perf_hooks";
import enableDestroy from "server-destroy";
import { preview } from "vite";
import * as msg from "../messages.js";
import { getResolvedHostForHttpServer } from "./util.js";
import { vitePluginAstroPreview } from "./vite-plugin-astro-preview.js";
async function createStaticPreviewServer(settings, logger) {
  const startServerTime = performance.now();
  let previewServer;
  try {
    previewServer = await preview({
      configFile: false,
      base: settings.config.base,
      appType: "mpa",
      build: {
        outDir: fileURLToPath(settings.config.outDir)
      },
      preview: {
        host: settings.config.server.host,
        port: settings.config.server.port,
        headers: settings.config.server.headers,
        open: settings.config.server.open
      },
      plugins: [vitePluginAstroPreview(settings)]
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error("astro", err.stack || err.message);
    }
    throw err;
  }
  enableDestroy(previewServer.httpServer);
  logger.info(
    null,
    msg.serverStart({
      startupTime: performance.now() - startServerTime,
      resolvedUrls: previewServer.resolvedUrls ?? { local: [], network: [] },
      host: settings.config.server.host,
      base: settings.config.base
    })
  );
  function closed() {
    return new Promise((resolve, reject) => {
      previewServer.httpServer.addListener("close", resolve);
      previewServer.httpServer.addListener("error", reject);
    });
  }
  return {
    host: getResolvedHostForHttpServer(settings.config.server.host),
    port: settings.config.server.port,
    closed,
    // In Vite 5, `httpServer` may be a `Http2SecureServer`, but we know we are only starting a HTTP server
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    server: previewServer.httpServer,
    stop: async () => {
      await new Promise((resolve, reject) => {
        previewServer.httpServer.destroy((err) => err ? reject(err) : resolve(void 0));
      });
    }
  };
}
export {
  createStaticPreviewServer as default
};
