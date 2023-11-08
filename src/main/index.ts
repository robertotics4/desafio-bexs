import './config/module-alias';

import { FindBestPathUseCase } from '@/application';
import { CSVReader } from '@/infra';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';

// const csvReader = new CSVReader();
// const routes = new Promise((resolve, reject) => {
//   csvReader
//     .readRoutesFile('input-file.csv')
//     .then(data => {
//       const bestPath = new FindBestPathUseCase(data).execute({
//         origin: 'GRU',
//         destination: 'ORL',
//       });

//       console.log(bestPath);
//       resolve(data);
//     })
//     .catch(error => {
//       console.log(error);
//       reject(error);
//     });
// });

app.get('/', (request, response) => {
  return response.json({
    appName: 'template-cleanarch-typescript',
    version: '1.0.0',
  });
});

app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`),
);
