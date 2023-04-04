import { Request, Response, NextFunction } from 'express';
//import { AppError } from '../errors/AppError';

export function notFoundRouteHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	return res.status(404).json({
		status: 'fail',
		message: 'Route not found.',
	});
}
