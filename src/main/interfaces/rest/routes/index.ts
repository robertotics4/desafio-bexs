import { Router } from 'express';
import { CreateRouteController, ListRoutesController } from '../controllers';
import { FindBestPathController } from '../controllers/FindBestPathController';

const router = Router();

const createRouteController = new CreateRouteController();
const listRoutesController = new ListRoutesController();
const findBestPathController = new FindBestPathController();

router.post('/routes', createRouteController.handle);
router.get('/routes', listRoutesController.handle);
router.post('/path', findBestPathController.handle);

export { router };
