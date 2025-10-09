import fs from 'node:fs/promises';
import { randomUUID } from "node:crypto";

import type { DatabaseStructure, CreateTaskResponse } from '../@types/database.types.ts';
import type { Tasks } from '../@types/tasks.types.ts';

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
};