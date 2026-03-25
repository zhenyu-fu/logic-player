const http = require('http');
const https = require('https');

function createResponse(res, bodyBuffer) {
  const headers = res.headers || {};
  return {
    ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300,
    status: res.statusCode || 0,
    statusText: res.statusMessage || '',
    headers: {
      get(key) {
        return headers[String(key).toLowerCase()];
      },
    },
    async text() {
      return bodyBuffer.toString('utf8');
    },
    async json() {
      return JSON.parse(bodyBuffer.toString('utf8'));
    },
  };
}

function fetchPolyfill(url, options = {}) {
  return new Promise((resolve, reject) => {
    const targetUrl = typeof url === 'string' ? new URL(url) : url;
    const isHttps = targetUrl.protocol === 'https:';
    const requestFn = isHttps ? https.request : http.request;

    const req = requestFn(
      {
        method: options.method || 'GET',
        hostname: targetUrl.hostname,
        port: targetUrl.port || (isHttps ? 443 : 80),
        path: `${targetUrl.pathname || ''}${targetUrl.search || ''}`,
        headers: options.headers || {},
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        res.on('end', () => {
          resolve(createResponse(res, Buffer.concat(chunks)));
        });
      },
    );

    req.on('error', reject);

    if (options.body != null) {
      if (Buffer.isBuffer(options.body)) {
        req.write(options.body);
      } else if (typeof options.body === 'string') {
        req.write(options.body);
      } else {
        req.write(String(options.body));
      }
    }

    req.end();
  });
}

module.exports = {
  fetchPolyfill,
};

