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

export interface DeleteTaskResponse {
  success: boolean;
  message: string;
}

export interface CompleteTaskResponse {
  data: Tasks | null;
  message: string;
}