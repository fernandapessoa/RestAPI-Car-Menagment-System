/* eslint-disable @typescript-eslint/no-unused-vars*/

import { UserService, userService } from './userService';
import { Response, NextFunction } from 'express';
import { User } from './IUser';
import { CatchExpressError } from '../../decorators/CatchExpressError';
import { AuthenticatedRequest } from '../../type/IRequest';

export class UserController {
	private userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	@CatchExpressError
	async registerUser(
		req: AuthenticatedRequest,
		res: Response,
		_next: NextFunction
	) {
		const userData: User = req.body;
		const token = await this.userService.registerUser(userData);

		res.header('Authorization', 'Bearer ' + token);

		return res.status(201).json({
			status: 'success',
			token: token,
		});
	}

	@CatchExpressError
	async getAllUsers(
		req: AuthenticatedRequest,
		res: Response,
		_next: NextFunction
	) {
		const users = await this.userService.getAllUsers();

		return res.status(200).json({
			status: 'success',
			data: users,
			total: users.length,
		});
	}

	@CatchExpressError
	async getUser(req: AuthenticatedRequest, res: Response, _next: NextFunction) {
		const userId = req.authenticatedUser._id.toString();
		const users: User = await this.userService.getUser(userId);

		return res.status(200).json({
			status: 'success',
			data: users,
		});
	}

	@CatchExpressError
	async getUserById(
		req: AuthenticatedRequest,
		res: Response,
		_next: NextFunction
	) {
		const userId = req.params.id;
		const users: User = await this.userService.getUser(userId);

		return res.status(200).json({
			status: 'success',
			data: users,
		});
	}

	@CatchExpressError
	async deleteUser(
		req: AuthenticatedRequest,
		res: Response,
		_next: NextFunction
	) {
		const userId = req.authenticatedUser._id.toString();
		await this.userService.deleteUser(userId);

		return res.status(204).json({
			status: 'success',
			data: null,
		});
	}

	@CatchExpressError
	async updateUser(
		req: AuthenticatedRequest,
		res: Response,
		_next: NextFunction
	) {
		const userId = req.authenticatedUser._id.toString();
		const updateBody = req.body;
		const user: User = await this.userService.updateUser(userId, updateBody);

		return res.status(200).json({
			status: 'success',
			data: user,
		});
	}

	@CatchExpressError
	async authenticateUser(
		req: AuthenticatedRequest,
		res: Response,
		_next: NextFunction
	) {
		const { email, password } = req.body;
		const token = await this.userService.authenticateUser(email, password);

		res.header('Authorization', 'Bearer ' + token);

		return res.status(200).json({
			status: 'success',
		});
	}
}

const userController = new UserController(userService);
export { userController };
