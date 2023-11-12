import { env } from '@/main/config/env';

const { port } = env;

export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Desafio Bexs',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: [`src/main/interfaces/rest/routes/*.ts`],
};
