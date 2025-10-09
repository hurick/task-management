import fs from 'node:fs/promises';
import { randomUUID } from "node:crypto";

import type { Tasks } from '../@types/tasks.types.ts';
import type {
  DatabaseStructure,
  CreateTaskResponse,
  UpdateTaskResponse,
  DeleteTaskResponse
} from '../@types/database.types.ts';

import { parseQueryParams } from '../utils/parse-query-params.ts';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => this.#database = JSON.parse(data))
      .catch(() => this.#persist());
  };

  #database: DatabaseStructure = {};

  #persist(): void {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  };

  create(
    table: keyof DatabaseStructure,
    { title, description }: Pick<Tasks, 'title' | 'description'>
  ): CreateTaskResponse {
    const newTask: Tasks = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    };

    this.#database[table].push(newTask);
  
    this.#persist();

    return {
      data: newTask,
      message: 'Task created successfully!'
    };
  };

  select(table: keyof DatabaseStructure, query?: string): Tasks[] {
    let tableData = this.#database[table] ?? [];

    if (query) {
      const { search } = parseQueryParams(query);

      tableData = tableData.filter(({ title, description }) => (
        title.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase())
      ));
    }

    return tableData;
  };

  update(
    table: keyof DatabaseStructure,
    id: string,
    { title, description }: Partial<Pick<Tasks, 'title' | 'description'>>
  ): UpdateTaskResponse {
    const tableData = this.#database[table] ?? [];
    const taskIndex = tableData.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return {
        data: null,
        message: 'Task not found.'
      };
    }

    const existingTask = tableData[taskIndex];
    const updatedTask = {
      ...existingTask,
      ...(title && { title }),
      ...(description && { description }),
      updated_at: new Date().toISOString()
    };

    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    };

    this.#database[table][taskIndex] = updatedTask;
    this.#persist();

    return {
      data: updatedTask,
      message: 'Task updated successfully!'
    };
  };

  delete(table: keyof DatabaseStructure, id: string): DeleteTaskResponse {
    const tableData = this.#database[table] ?? [];
    const taskIndex = tableData.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return {
        success: false,
        message: 'Task not found.'
      };
    };

    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    };

    this.#database[table].splice(taskIndex, 1);
    this.#persist();

    return {
      success: true,
      message: 'Task deleted successfully!'
    };
  };
};