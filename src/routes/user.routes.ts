import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { userController } from '../modules/user/userController';
import {
	validateUserData,
	validateUpdateUserData,
} from '../middlewares/validateUserData';
//import { userController } from '../modules/user/userController';

const usersRouter = Router();

usersRouter.post('/', validateUserData, (req, res, next) =>
	userController.registerUser(req, res, next)
);
usersRouter.get('/', auth, (req, res, next) =>
	userController.getUser(req, res, next)
);
usersRouter.patch('/', auth, validateUpdateUserData, (req, res, next) =>
	userController.updateUser(req, res, next)
);
usersRouter.delete('/', auth, (req, res, next) =>
	userController.deleteUser(req, res, next)
);

export { usersRouter };
