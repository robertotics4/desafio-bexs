declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  const serve: RequestHandler[];
  const setup: (
    swaggerDoc: Record<string, any>,
    options?: any,
  ) => RequestHandler;

  export { serve, setup };
}
