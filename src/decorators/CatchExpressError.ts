/* eslint-disable */

import { Request, Response, NextFunction } from 'express';

export function CatchExpressError(
	_target: any,
	_methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;

	const newDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundMethod = originalMethod.bind(this);
			const catchAsyncErrors = async (
				req: Request,
				res: Response,
				next: NextFunction
			) => {
				await boundMethod(req, res, next).catch(next);
			};
			return catchAsyncErrors;
		},
	};

	return newDescriptor;
}
