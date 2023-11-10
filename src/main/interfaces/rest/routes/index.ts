import { Router } from 'express';
import { CreateRouteController, ListRoutesController } from '../controllers';

const router = Router();

const createRouteController = new CreateRouteController();
const listRoutesController = new ListRoutesController();

router.post('/routes', createRouteController.handle);
router.get('/routes', listRoutesController.handle);

export { router };
