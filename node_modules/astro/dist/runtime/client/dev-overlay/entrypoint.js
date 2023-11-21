import {} from "./overlay.js";
let overlay;
document.addEventListener("DOMContentLoaded", async () => {
  const [
    { loadDevOverlayPlugins },
    { default: astroDevToolPlugin },
    { default: astroAuditPlugin },
    { default: astroXrayPlugin },
    { AstroDevOverlay, DevOverlayCanvas },
    { DevOverlayCard },
    { DevOverlayHighlight },
    { DevOverlayTooltip },
    { DevOverlayWindow }
  ] = await Promise.all([
    // @ts-expect-error
    import("astro:dev-overlay"),
    import("./plugins/astro.js"),
    import("./plugins/audit.js"),
    import("./plugins/xray.js"),
    import("./overlay.js"),
    import("./ui-library/card.js"),
    import("./ui-library/highlight.js"),
    import("./ui-library/tooltip.js"),
    import("./ui-library/window.js")
  ]);
  customElements.define("astro-dev-overlay", AstroDevOverlay);
  customElements.define("astro-dev-overlay-window", DevOverlayWindow);
  customElements.define("astro-dev-overlay-plugin-canvas", DevOverlayCanvas);
  customElements.define("astro-dev-overlay-tooltip", DevOverlayTooltip);
  customElements.define("astro-dev-overlay-highlight", DevOverlayHighlight);
  customElements.define("astro-dev-overlay-card", DevOverlayCard);
  overlay = document.createElement("astro-dev-overlay");
  const preparePlugin = (pluginDefinition, builtIn) => {
    const eventTarget = new EventTarget();
    const plugin = {
      ...pluginDefinition,
      builtIn,
      active: false,
      status: "loading",
      eventTarget
    };
    eventTarget.addEventListener("toggle-notification", (evt) => {
      const target = overlay.shadowRoot?.querySelector(`[data-plugin-id="${plugin.id}"]`);
      if (!target)
        return;
      let newState = true;
      if (evt instanceof CustomEvent) {
        newState = evt.detail.state ?? true;
      }
      target.querySelector(".notification")?.toggleAttribute("data-active", newState);
    });
    eventTarget.addEventListener("toggle-plugin", async (evt) => {
      let newState = void 0;
      if (evt instanceof CustomEvent) {
        newState = evt.detail.state ?? true;
      }
      await overlay.togglePluginStatus(plugin, newState);
    });
    return plugin;
  };
  const customPluginsDefinitions = await loadDevOverlayPlugins();
  const plugins = [
    ...[astroDevToolPlugin, astroXrayPlugin, astroAuditPlugin].map(
      (pluginDef) => preparePlugin(pluginDef, true)
    ),
    ...customPluginsDefinitions.map((pluginDef) => preparePlugin(pluginDef, false))
  ];
  overlay.plugins = plugins;
  document.body.append(overlay);
  document.addEventListener("astro:after-swap", () => {
    document.body.append(overlay);
  });
});
