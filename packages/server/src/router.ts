import type { IncomingMessage, ServerResponse } from 'http';
import { applyCors, sendJson, sendText } from './http';
import { strategies } from './data/strategies';
import { stocks } from './data/stocks';

export function route(req: IncomingMessage, res: ServerResponse) {
  applyCors(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = url.pathname;

  if (req.method === 'GET' && pathname === '/health') {
    sendJson(res, 200, { ok: true, time: new Date().toISOString() });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/strategies') {
    sendJson(res, 200, { data: strategies });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/stocks') {
    sendJson(res, 200, { data: stocks });
    return;
  }

  sendText(res, 404, 'Not Found');
}
