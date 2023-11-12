import express from 'express';
import { errors } from 'celebrate';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(errors());

export { app };
