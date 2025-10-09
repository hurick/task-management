import { IncomingMessage } from 'node:http';

interface RequestOptions {
  body?: {
    title?: string;
    description?: string;
  };
  query?: string;
  params?: {
    id?: string;
  };
};

export type RequestWithOptions = IncomingMessage & RequestOptions;