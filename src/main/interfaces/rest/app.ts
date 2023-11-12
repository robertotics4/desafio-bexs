import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { errors } from 'celebrate';
import { env } from '@/main/config/env';
import swaggerDocs from '@/main/config/swaggerDocs';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(
  `/${env.docsPathName}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerDocs)),
);
app.use(router);
app.use(errors());

export { app };
