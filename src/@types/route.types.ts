import { ServerResponse } from 'node:http';

import { RequestWithOptions } from './server.types.ts';

export interface Route {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  path: RegExp;
  handler: (req: RequestWithOptions, res: ServerResponse) => void;
};