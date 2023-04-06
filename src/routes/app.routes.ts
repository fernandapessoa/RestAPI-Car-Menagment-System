import { Router } from 'express';
import { usersRouter } from './user.routes';
import { carsRouter } from './car.routes';
import { reserveRouter } from './reserve.routes';
import { authenticationRouter } from './authentication.routes';

const router = Router();

router.use('/authenticate', authenticationRouter);
router.use('/users', usersRouter);
router.use('/cars', carsRouter);
router.use('/reserve', reserveRouter);

export { router };
