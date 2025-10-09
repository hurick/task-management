import type { Route } from '../@types/route.types.ts';

import { Database } from '../database/Database.ts';

import { buildRoutePath } from '../utils/build-route-path.ts';

const database = new Database();
const TABLE_NAME = 'tasks';

export const taskRoutes: Route[] = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const body = req.body;
      
      if (!body || !body.title || !body.description) {
        return res.writeHead(400).end({
          message: 'Title and Description are required.'
        });
      };

      const title = body.title.trim();
      const description = body.description.trim();

      if (!title || !description) {
        return res.writeHead(400).end({
          message: 'Title and Description cannot be empty.'
        });
      }

      const task = database.create(TABLE_NAME, { title, description });

      return res.writeHead(201).end(JSON.stringify(task));
    }
  }
];