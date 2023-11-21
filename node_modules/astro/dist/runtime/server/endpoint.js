function getHandlerFromModule(mod, method, logger) {
  const lowerCaseMethod = method.toLowerCase();
  if (mod[lowerCaseMethod]) {
    logger.warn(
      "astro",
      `Lower case endpoint names are deprecated and will not be supported in Astro 4.0. Rename the endpoint ${lowerCaseMethod} to ${method}.`
    );
  }
  if (mod[method]) {
    return mod[method];
  }
  if (mod[lowerCaseMethod]) {
    return mod[lowerCaseMethod];
  }
  if (method === "delete" && mod["del"]) {
    return mod["del"];
  }
  if (mod["all"]) {
    return mod["all"];
  }
  if (mod["ALL"]) {
    return mod["ALL"];
  }
  return void 0;
}
async function renderEndpoint(mod, context, ssr, logger) {
  const { request } = context;
  const chosenMethod = request.method?.toUpperCase();
  const handler = getHandlerFromModule(mod, chosenMethod, logger);
  if (!ssr && ssr === false && chosenMethod && chosenMethod !== "GET" && chosenMethod !== "get") {
    console.warn(`
${chosenMethod} requests are not available when building a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` with an \`export const prerender = false\` to handle ${chosenMethod} requests.`);
  }
  if (!handler || typeof handler !== "function") {
    let response = new Response(null, {
      status: 404,
      headers: {
        "X-Astro-Response": "Not-Found"
      }
    });
    return response;
  }
  const proxy = new Proxy(context, {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      } else {
        return void 0;
      }
    }
  });
  return handler.call(mod, proxy, request);
}
export {
  renderEndpoint
};
