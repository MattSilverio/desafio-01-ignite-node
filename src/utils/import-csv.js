import fs from 'fs';
import { parse } from 'csv-parse';

import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

const processFile = async () => {
  
  const parser = fs
    .createReadStream(`${__dirname}/../data/csv-file.csv`)
    .pipe(parse({
      delimiter: ',',
      skipEmptyLines: true,
      fromLine: 2,
    }));
  for await (const record of parser) {
    const [title , description] = record;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
  }
  
};

processFile();