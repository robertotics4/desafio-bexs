import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import { CreateRouteController, ListRoutesController } from '../controllers';
import { FindBestPathController } from '../controllers/FindBestPathController';

const router = Router();

const createRouteController = new CreateRouteController();
const listRoutesController = new ListRoutesController();
const findBestPathController = new FindBestPathController();

router.post(
  '/routes',
  celebrate({
    [Segments.BODY]: {
      origin: Joi.string().length(3).uppercase().required(),
      destination: Joi.string().length(3).uppercase().required(),
      price: Joi.number().positive().precision(2).required(),
    },
  }),
  createRouteController.handle,
);
router.get('/routes', listRoutesController.handle);
router.post(
  '/path',
  celebrate({
    [Segments.BODY]: {
      origin: Joi.string().length(3).uppercase().required(),
      destination: Joi.string().length(3).uppercase().required(),
    },
  }),
  findBestPathController.handle,
);

export { router };
