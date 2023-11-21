import * as msg from "../core/messages.js";
function log404(logger, pathname) {
  logger.info("serve", msg.req({ url: pathname, statusCode: 404 }));
}
export {
  log404
};
