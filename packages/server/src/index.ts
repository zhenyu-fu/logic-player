import http from 'http';
import { route } from './router';

const port = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  try {
    route(req, res);
  } catch (error) {
    console.error('[Server] unhandled error', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.info(`[Server] listening on http://localhost:${port}`);
});

