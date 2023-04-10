import { Response, NextFunction } from 'express';
import {
	registerReserveSchema,
	updateReserveSchema,
} from '../validators/reserveValidators';
import { Reserve } from '../modules/reserve/IReserve';
import { ValidationError } from 'joi';
import { AppError } from '../errors/AppError';
import { AuthenticatedRequest } from './../type/IRequest';

export async function validateReserveData(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const reserveData: Reserve = req.body;
		await registerReserveSchema.validateAsync(reserveData);
		return next();
	} catch (err) {
		if (err instanceof ValidationError) {
			return next(new AppError(400, err.details[0].message));
		}
		return next(err);
	}
}

export async function validateUpdateReserveData(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const reserveData = req.body;
		await updateReserveSchema.validateAsync(reserveData);
		return next();
	} catch (err) {
		if (err instanceof ValidationError) {
			return next(new AppError(400, err.details[0].message));
		}
		return next(err);
	}
}
