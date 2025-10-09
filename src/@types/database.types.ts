import type { Tasks } from './tasks.types.ts';

export interface DatabaseStructure {
  tasks?: Tasks[];
};

export interface CreateTaskResponse {
  data: Tasks;
  message: string;
}