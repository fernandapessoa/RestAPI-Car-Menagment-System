import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { userController } from '../modules/user/userController';
//import { userController } from '../modules/user/userController';

const usersRouter = Router();

usersRouter.post('/', (req, res, next) =>
	userController.registerUser(req, res, next)
);
usersRouter.get('/:id', (req, res, next) =>
	userController.getUser(req, res, next)
);
usersRouter.patch('/:id', (req, res, next) =>
	userController.updateUser(req, res, next)
);
usersRouter.delete('/:id', (req, res, next) =>
	userController.deleteUser(req, res, next)
);

export { usersRouter };
