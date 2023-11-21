const clientAddressSymbol = Symbol.for("astro.clientAddress");
const clientLocalsSymbol = Symbol.for("astro.locals");
function createRequest({
  url,
  headers,
  clientAddress,
  method = "GET",
  body = void 0,
  logger,
  ssr,
  locals
}) {
  let headersObj = headers instanceof Headers ? headers : new Headers(Object.entries(headers));
  const request = new Request(url.toString(), {
    method,
    headers: headersObj,
    body
  });
  Object.defineProperties(request, {
    params: {
      get() {
        logger.warn("deprecation", `Astro.request.params has been moved to Astro.params`);
        return void 0;
      }
    }
  });
  if (!ssr) {
    const _headers = request.headers;
    const headersDesc = Object.getOwnPropertyDescriptor(request, "headers") || {};
    Object.defineProperty(request, "headers", {
      ...headersDesc,
      get() {
        logger.warn(
          "ssg",
          `Headers are not exposed in static (SSG) output mode. To enable headers: set \`output: "server"\` in your config file.`
        );
        return _headers;
      }
    });
  } else if (clientAddress) {
    Reflect.set(request, clientAddressSymbol, clientAddress);
  }
  Reflect.set(request, clientLocalsSymbol, locals ?? {});
  return request;
}
export {
  createRequest
};
