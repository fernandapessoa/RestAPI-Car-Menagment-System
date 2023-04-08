import { Request, Response, NextFunction } from 'express';
import {
	createUserSchema,
	updateUserSchema,
} from '../validators/userValidators';
import { User } from '../modules/user/IUser';
import { ValidationError } from 'joi';
import { AppError } from '../errors/AppError';

export async function validateUserData(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const userData: User = req.body;

		await createUserSchema.validateAsync(userData);
		return next();
	} catch (err) {
		if (err instanceof ValidationError) {
			return next(new AppError(400, err.details[0].message));
		}
		return next(err);
	}
}

export async function validateUpdateUserData(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const userData = req.body;

		await updateUserSchema.validateAsync(userData);
		return next();
	} catch (err) {
		if (err instanceof ValidationError) {
			return next(new AppError(400, err.details[0].message));
		}
		return next(err);
	}
}
