import { IncomingMessage } from 'node:http';

export interface RequestWithOptions extends IncomingMessage {
  body?: {
    title?: string;
    description?: string;
  };
  params?: {
    id?: string;
  };
  query?: string;
};