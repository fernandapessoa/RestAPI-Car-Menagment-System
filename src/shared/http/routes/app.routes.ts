import { Router } from 'express';
import { usersRouter } from './user.routes';
import { carsRouter } from './car.routes';
import { authenticationRouter } from './authentication.routes';

const router = Router();

router.use('/authenticate', authenticationRouter);
router.use('/users', usersRouter);
router.use('/cars', carsRouter);

export { router };
