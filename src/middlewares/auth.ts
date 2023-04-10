import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../security/security';
import { AppError } from './../errors/AppError';
import { userService } from '../modules/user/userService';
import { AuthenticatedRequest } from '../type/IRequest';

export async function auth(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return next(new AppError(401, 'Bearer token must be provided'));
	}

	const payload = verifyToken(token);
	if (!payload) {
		return next(new AppError(401, 'Invalid or expired token'));
	}

	try {
		req.authenticatedUser = await userService.getUser(payload.id);
	} catch (err) {
		return next(new Error('Invalid or expired token'));
	}

	next();
}

export async function carAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return next(new AppError(401, 'Bearer token must be provided'));
	}

	const payload = verifyToken(token);
	if (!payload) {
		return next(new AppError(401, 'Invalid or expired token'));
	}

	next();
}

export async function reserveAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return next(new AppError(401, 'Bearer token must be provided'));
	}

	const payload = verifyToken(token);
	if (!payload) {
		return next(new AppError(401, 'Invalid or expired token'));
	}

	try {
		req.body.user = await userService.getUser(payload.id);
	} catch (err) {
		return next(new Error('Invalid or expired token'));
	}

	next();
}
