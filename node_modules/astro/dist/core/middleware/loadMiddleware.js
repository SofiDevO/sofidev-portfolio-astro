import { MIDDLEWARE_MODULE_ID } from "./vite-plugin.js";
async function loadMiddleware(moduleLoader) {
  try {
    const module = await moduleLoader.import(MIDDLEWARE_MODULE_ID);
    return module;
  } catch {
    return void 0;
  }
}
export {
  loadMiddleware
};
