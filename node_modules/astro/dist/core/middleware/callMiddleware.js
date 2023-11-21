import { bold } from "kleur/colors";
import { attachCookiesToResponse, responseHasCookies } from "../cookies/index.js";
import { AstroError, AstroErrorData } from "../errors/index.js";
async function callMiddleware(logger, onRequest, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async () => {
    nextCalled = true;
    responseFunctionPromise = responseFunction();
    return responseFunctionPromise;
  };
  let middlewarePromise = onRequest(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (isEndpointOutput(value)) {
      logger.warn(
        "middleware",
        `Using simple endpoints can cause unexpected issues in the chain of middleware functions.
It's strongly suggested to use full ${bold("Response")} objects.`
      );
    }
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(AstroErrorData.MiddlewareNotAResponse);
        }
        return ensureCookiesAttached(apiContext, value);
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(AstroErrorData.MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(AstroErrorData.MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(AstroErrorData.MiddlewareNotAResponse);
    } else {
      return ensureCookiesAttached(apiContext, value);
    }
  });
}
function ensureCookiesAttached(apiContext, response) {
  if (apiContext.cookies !== void 0 && !responseHasCookies(response)) {
    attachCookiesToResponse(response, apiContext.cookies);
  }
  return response;
}
function isEndpointOutput(endpointResult) {
  return !(endpointResult instanceof Response) && typeof endpointResult === "object" && typeof endpointResult.body === "string";
}
export {
  callMiddleware
};
