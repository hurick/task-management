import fs from 'node:fs';

import type { Tasks } from '../@types/tasks.types.ts';

import { parse } from 'csv-parse';

const API_URL = 'http://localhost:3333/tasks';
const BATCH_SIZE = 5;
const DELAY_BETWEEN_BATCHES = 500;

const csvFilePath = new URL('../../data.csv', import.meta.url);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function importDataFromCSV() {
  const fileStream = fs.createReadStream(csvFilePath);
  const csvParser = parse({ from_line: 2, trim: true });
  const parser = fileStream.pipe(csvParser);

  let tasksBatch: Promise<void>[] = [];
  let isFirstBatch = true;

  for await (const row of parser) {
    const [title, description] = row;

    const taskData: Pick<Tasks, 'title' | 'description'> = { title, description };

    const requestPromise = fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
      .then(() => console.log(`  ✓ ${title}`))
      .catch(() => console.error(`  ✗ Failed to import "${title}"`));

    tasksBatch.push(requestPromise);

    if (tasksBatch.length === BATCH_SIZE) {
      const prefix = isFirstBatch ? '' : '\n';
      console.log(`${prefix}📦 Processing ${BATCH_SIZE} tasks batch...`);
      isFirstBatch = false;

      await Promise.all(tasksBatch);

      tasksBatch = [];

      await wait(DELAY_BETWEEN_BATCHES);
    }
  }

  if (tasksBatch.length > 0) {
    console.log(`\n📦 Processing ${tasksBatch.length === 1 ? 'last task' : `remaining ${tasksBatch.length} tasks batch`}...`);
    await Promise.all(tasksBatch);
  }

  console.log('\n🚀 Import completed successfully!\n');
}

importDataFromCSV();