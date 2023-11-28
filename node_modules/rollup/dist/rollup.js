/*
  @license
	Rollup.js v4.6.0
	Sun, 26 Nov 2023 13:38:46 GMT - commit 020774d0c7b1371865b20878e59dd3a6a45d3b31

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const rollup = require('./shared/rollup.js');
const watchProxy = require('./shared/watch-proxy.js');
require('./shared/parseAst.js');
require('./native.js');
require('node:path');
require('node:process');
require('tty');
require('path');
require('node:perf_hooks');
require('node:fs/promises');
require('./shared/fsevents-importer.js');



exports.VERSION = rollup.version;
exports.defineConfig = rollup.defineConfig;
exports.rollup = rollup.rollup;
exports.watch = watchProxy.watch;
//# sourceMappingURL=rollup.js.map
