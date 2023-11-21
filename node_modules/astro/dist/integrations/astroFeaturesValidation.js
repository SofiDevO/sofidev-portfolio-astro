const STABLE = "stable";
const DEPRECATED = "deprecated";
const UNSUPPORTED = "unsupported";
const EXPERIMENTAL = "experimental";
const UNSUPPORTED_ASSETS_FEATURE = {
  supportKind: UNSUPPORTED,
  isSquooshCompatible: false,
  isSharpCompatible: false
};
const ALL_UNSUPPORTED = {
  serverOutput: UNSUPPORTED,
  staticOutput: UNSUPPORTED,
  hybridOutput: UNSUPPORTED,
  assets: UNSUPPORTED_ASSETS_FEATURE,
  i18n: {
    detectBrowserLanguage: UNSUPPORTED
  }
};
function validateSupportedFeatures(adapterName, featureMap = ALL_UNSUPPORTED, config, logger) {
  const {
    assets = UNSUPPORTED_ASSETS_FEATURE,
    serverOutput = UNSUPPORTED,
    staticOutput = UNSUPPORTED,
    hybridOutput = UNSUPPORTED
  } = featureMap;
  const validationResult = {};
  validationResult.staticOutput = validateSupportKind(
    staticOutput,
    adapterName,
    logger,
    "staticOutput",
    () => config?.output === "static"
  );
  validationResult.hybridOutput = validateSupportKind(
    hybridOutput,
    adapterName,
    logger,
    "hybridOutput",
    () => config?.output === "hybrid"
  );
  validationResult.serverOutput = validateSupportKind(
    serverOutput,
    adapterName,
    logger,
    "serverOutput",
    () => config?.output === "server"
  );
  validationResult.assets = validateAssetsFeature(assets, adapterName, config, logger);
  return validationResult;
}
function validateSupportKind(supportKind, adapterName, logger, featureName, hasCorrectConfig) {
  if (supportKind === STABLE) {
    return true;
  } else if (supportKind === DEPRECATED) {
    featureIsDeprecated(adapterName, logger);
  } else if (supportKind === EXPERIMENTAL) {
    featureIsExperimental(adapterName, logger);
  }
  if (hasCorrectConfig() && supportKind === UNSUPPORTED) {
    featureIsUnsupported(adapterName, logger, featureName);
    return false;
  } else {
    return true;
  }
}
function featureIsUnsupported(adapterName, logger, featureName) {
  logger.error(
    `${adapterName}`,
    `The feature ${featureName} is not supported by the adapter ${adapterName}.`
  );
}
function featureIsExperimental(adapterName, logger) {
  logger.warn(`${adapterName}`, "The feature is experimental and subject to issues or changes.");
}
function featureIsDeprecated(adapterName, logger) {
  logger.warn(`${adapterName}`, "The feature is deprecated and will be moved in the next release.");
}
const SHARP_SERVICE = "astro/assets/services/sharp";
const SQUOOSH_SERVICE = "astro/assets/services/squoosh";
function validateAssetsFeature(assets, adapterName, config, logger) {
  const {
    supportKind = UNSUPPORTED,
    isSharpCompatible = false,
    isSquooshCompatible = false
  } = assets;
  if (config?.image?.service?.entrypoint === SHARP_SERVICE && !isSharpCompatible) {
    logger.warn(
      "astro",
      `The currently selected adapter \`${adapterName}\` is not compatible with the image service "Sharp".`
    );
    return false;
  }
  if (config?.image?.service?.entrypoint === SQUOOSH_SERVICE && !isSquooshCompatible) {
    logger.warn(
      "astro",
      `The currently selected adapter \`${adapterName}\` is not compatible with the image service "Squoosh".`
    );
    return false;
  }
  return validateSupportKind(supportKind, adapterName, logger, "assets", () => true);
}
export {
  validateSupportedFeatures
};
