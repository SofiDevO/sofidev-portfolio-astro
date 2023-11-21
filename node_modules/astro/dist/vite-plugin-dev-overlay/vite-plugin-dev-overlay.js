const VIRTUAL_MODULE_ID = "astro:dev-overlay";
const resolvedVirtualModuleId = "\0" + VIRTUAL_MODULE_ID;
function astroDevOverlay({ settings }) {
  return {
    name: "astro:dev-overlay",
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
					export const loadDevOverlayPlugins = async () => {
						return [${settings.devOverlayPlugins.map((plugin) => `(await import('${plugin}')).default`).join(",")}];
					};
				`;
      }
    }
  };
}
export {
  astroDevOverlay as default
};
