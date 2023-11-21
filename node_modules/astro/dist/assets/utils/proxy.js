function getProxyCode(options, isSSR) {
  return `
						new Proxy(${JSON.stringify(options)}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							${!isSSR ? "globalThis.astroAsset.referencedImages.add(target.fsPath);" : ""}
							return target[name];
						}
					})
					`;
}
export {
  getProxyCode
};
