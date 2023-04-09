import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { reserveController } from '../modules/reserve/reserveController';

const reserveRouter = Router();

reserveRouter.post('/', auth, reserveController.registerReserve);
reserveRouter.get('/', auth, reserveController.getReserve);
reserveRouter.get('/:id', auth, reserveController.getReserveById);
reserveRouter.delete('/:id', auth, reserveController.deleteReserveById);
reserveRouter.put('/:id', auth, reserveController.updateReserveById);

export { reserveRouter };
