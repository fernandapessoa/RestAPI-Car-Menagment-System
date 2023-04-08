import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { userController } from '../modules/user/userController';
import {
	validateUserData,
	validateUpdateUserData,
} from '../middlewares/validateUserData';
//import { userController } from '../modules/user/userController';

const usersRouter = Router();

usersRouter.post('/', validateUserData, userController.registerUser);
usersRouter.get('/', auth, userController.getUser);
usersRouter.patch('/', auth, validateUpdateUserData, userController.updateUser);
usersRouter.delete('/', auth, userController.deleteUser);

export { usersRouter };
