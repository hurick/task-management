import type { DatabaseStructure } from '../@types/database.types.ts';
import type { Route } from '../@types/route.types.ts';

import { Database } from '../database/Database.ts';

import { buildRoutePath } from '../utils/build-route-path.ts';

const database = new Database();
const TABLE_NAME: keyof DatabaseStructure = 'tasks';

export const taskRoutes: Route[] = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const body = req.body;
      
      if (!body || !body.title || !body.description) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Title and Description are required.'
        }));
      };

      const title = body.title.trim();
      const description = body.description.trim();

      if (!title || !description) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Title and Description cannot be empty.'
        }));
      }

      const task = database.create(TABLE_NAME, { title, description });

      return res.writeHead(201).end(JSON.stringify(task));
    }
  },

  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select(TABLE_NAME, req.query);
      
      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      if (!req.params?.id) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Task ID is required.'
        }));
      }

      if (!req.body || (!req.body.title && !req.body.description)) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'At least one of Title or Description is required to update.'
        }));
      }

      const { id } = req.params;

      const title = req.body.title?.trim();
      const description = req.body.description?.trim();

      if (title === '' || description === '') {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Title and Description cannot be empty.'
        }));
      }

      const updateResponse = database.update(TABLE_NAME, id, { title, description });

      return res.writeHead(200).end(JSON.stringify(updateResponse));
    }
  }
];