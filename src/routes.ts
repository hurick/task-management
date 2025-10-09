import type { Route } from './@types/route.types.ts';

import { taskRoutes } from './routes/tasks.ts';

export const routes: Route[] = [
  ...taskRoutes
];