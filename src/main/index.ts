import './config/module-alias';

import { env } from '@/main/config/env';
import { app } from './interfaces/rest/app';

app.get('/', (request, response) => {
  return response.json({
    appName: 'template-cleanarch-typescript',
    version: '1.0.0',
  });
});

app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`),
);
