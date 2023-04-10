import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { reserveController } from '../modules/reserve/reserveController';
import {
	validateReserveData,
	validateUpdateReserveData,
} from '../middlewares/validateReserveData';

const reserveRouter = Router();

reserveRouter.post(
	'/',
	auth,
	validateReserveData,
	reserveController.registerReserve
);
reserveRouter.get('/', auth, reserveController.getReserve);
reserveRouter.get('/:id', auth, reserveController.getReserveById);
reserveRouter.delete('/:id', auth, reserveController.deleteReserveById);
reserveRouter.put(
	'/:id',
	auth,
	validateUpdateReserveData,
	reserveController.updateReserveById
);

export { reserveRouter };
