import '../../config/module-alias';

import { env } from '@/main/config/env';
import { app } from './app';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the file path.');
  process.exit(1);
}

process.env.FILE_PATH = filePath;

app.get('/', (request, response) => {
  return response.json({
    appName: 'Desafio BEXS',
    version: '1.0.0',
  });
});

app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`),
);
