import { CreateUserService } from '../../../../services/userServices/createUserService';
import { Request, Response, NextFunction } from 'express';
import {User } from '../../../../types/userType'

export class CreateUserController {
	private createUserService: CreateUserService;

	constructor(createUserService: CreateUserService) {
		this.createUserService = createUserService;
	}

	async handle(req: Request, res: Response, _next: NextFunction) {
		const userData: User = req.body;
		userData.birth = new Date(userData.birth);
		const token = await this.createUserService.execute(userData);

		res.header('Authorization', 'Bearer ' + token);

		return res.status(201).json({
			status: 'success',
		});
	}
}