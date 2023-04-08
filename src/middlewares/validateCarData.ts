import { Request, Response, NextFunction } from 'express';
import { registerCarSchema } from '../validators/carValidators';
import { Car } from '../modules/car/ICar';
import { ValidationError } from 'joi';
import { AppError } from '../errors/AppError';

export async function validateCarData(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const carData: Car = req.body;

		await registerCarSchema.validateAsync(carData);
		return next();
	} catch (err) {
		if (err instanceof ValidationError) {
			return next(new AppError(400, err.details[0].message));
		}
		return next(err);
	}
}
