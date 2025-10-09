import { ServerResponse } from 'node:http';

import type { RequestWithOptions } from '../@types/requests.types.ts';

export const streamToJSON = async (req: RequestWithOptions, res: ServerResponse) => {
  const buffers: Buffer[] = [];

  try {
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const bodyString = Buffer.concat(buffers).toString();

    bodyString ? req.body = JSON.parse(bodyString) : req.body = undefined;
  } catch (error) {
    console.error('Error while reading stream', error);
    req.body = undefined;
  }

  res.setHeader('Content-Type', 'application/json');
};