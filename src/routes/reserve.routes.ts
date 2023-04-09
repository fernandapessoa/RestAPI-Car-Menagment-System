import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { reserveController } from '../modules/reserve/reserveController';

const reserveRouter = Router();

reserveRouter.post('/', auth, reserveController.registerReserve); //register

export { reserveRouter };
