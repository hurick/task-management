import http from 'node:http';

import type { RequestWithOptions } from './@types/requests.types.ts';

import { streamToJSON } from './middlewares/stream-to-json.ts';

import { routes } from './routes.ts';

const SERVER_PORT = 3333;

const server = http.createServer(async (req: RequestWithOptions, res) => {
  const { method, url } = req;

  if (!method || !url) {
    return res.writeHead(400).end('I think that was a bad request, I guess?');
  };
  
  await streamToJSON(req, res);

  const route = routes.find(route => route.method === method && route.path.test(url));

  if (route) {
    const routeParams = route.path.exec(url);
    
    if (routeParams && routeParams.groups) {
      const { query, ...params } = routeParams.groups;

      req.params = params;
      req.query = query;
    };

    return route.handler(req, res);
  };

  return res.writeHead(404).end('What are you looking for?');
});

server.listen(SERVER_PORT);