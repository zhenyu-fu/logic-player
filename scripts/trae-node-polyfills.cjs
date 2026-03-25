const { Blob } = require('buffer');
const { fetchPolyfill } = require('./trae-fetch-polyfill.cjs');

if (typeof global.Blob !== 'function' && typeof Blob === 'function') {
  global.Blob = Blob;
}

if (typeof global.fetch !== 'function') {
  global.fetch = fetchPolyfill;
}

