import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../security/security';
//import { AppError } from './../errors/AppError';
import { userService } from '../modules/user/userService';

export async function auth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return next(new Error('Invalid or expired token'));
	}

	const payload = verifyToken(token);

	if (!payload) {
		return next(new Error('Invalid or expired token'));
	}

	try {
		req.body.user = await userService.getUser(payload.id);
		req.params.id = payload.id;
	} catch (err) {
		return next(new Error('Invalid or expired token'));
	}

	next();
}
