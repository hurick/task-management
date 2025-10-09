import type { Tasks } from './tasks.types.ts';

export interface DatabaseStructure {
  tasks?: Tasks[];
};

export interface CreateTaskResponse {
  data: Tasks;
  message: string;
}

export interface UpdateTaskResponse {
  data: Tasks | null;
  message: string;
}