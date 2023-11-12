import '../../config/module-alias';

import { env } from '@/main/config/env';
import { app } from './app';

app.get('/', (request, response) => {
  return response.json({
    appName: 'Desafio BEXS',
    version: '1.0.0',
  });
});

app.listen(env.port, () =>
  console.log(
    `Server running at http://localhost:${env.port}\nDocumentation: http://localhost:${env.port}/${env.docsPathName}`,
  ),
);
