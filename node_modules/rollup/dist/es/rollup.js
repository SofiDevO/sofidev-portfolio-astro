/*
  @license
	Rollup.js v4.6.0
	Sun, 26 Nov 2023 13:38:46 GMT - commit 020774d0c7b1371865b20878e59dd3a6a45d3b31

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
