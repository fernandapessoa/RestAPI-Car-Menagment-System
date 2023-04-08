import { Router } from 'express';
import { userController } from '../modules/user/userController';

const authenticationRouter = Router();

authenticationRouter.post('/', (req, res, next) =>
	userController.authenticateUser(req, res, next)
);

export { authenticationRouter };
