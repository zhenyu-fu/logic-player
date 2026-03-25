const path = require('path');
const { fetchPolyfill } = require('./trae-fetch-polyfill.cjs');
const { Blob } = require('buffer');

const initScriptPath = '/Users/bytedance/.trae-cn/builtin_skills/TRAE-generate-mini-app/scripts/init-template.js';

const polyfillsEntry = path.resolve(__dirname, 'trae-node-polyfills.cjs');
const nodeOptions = process.env.NODE_OPTIONS || '';
if (!nodeOptions.includes(polyfillsEntry)) {
  process.env.NODE_OPTIONS = `${nodeOptions} -r ${polyfillsEntry}`.trim();
}

if (typeof global.fetch !== 'function') {
  global.fetch = fetchPolyfill;
}

if (typeof global.Blob !== 'function' && typeof Blob === 'function') {
  global.Blob = Blob;
}

const args = process.argv.slice(2);
process.argv = ['node', initScriptPath, ...args];

require(initScriptPath);
