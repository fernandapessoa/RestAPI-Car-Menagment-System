import { UserService, userService } from './userService';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../types/userType';

export class UserController {
	private userService: UserService;
	constructor(userService: UserService) {
		this.userService = userService;
	}

	async registerUser(req: Request, res: Response, _next: NextFunction) {
		const userData: User = req.body;
		const token = await this.userService.registerUser(userData);

		//res.header('Authorization', 'Bearer ' + token);

		return res.status(201).json({
			status: 'success',
		});
	}
}

const userController = new UserController(userService);
export { userController };
