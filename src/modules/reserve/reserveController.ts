/* eslint-disable @typescript-eslint/no-unused-vars*/

import { ReserveService, reserveService } from './reserveService';
import { Request, Response, NextFunction } from 'express';
import { Reserve } from './IReserve';
import { CatchExpressError } from '../../decorators/CatchExpressError';

export class ReserveController {
	private reserveService: ReserveService;

	constructor(reserveService: ReserveService) {
		this.reserveService = reserveService;
	}

	@CatchExpressError
	async registerReserve(req: Request, res: Response, _next: NextFunction) {
		const reserve = await this.reserveService.registerReserve(req.body);

		return res.status(201).json({
			status: 'success',
			data: reserve,
		});
	}
}

const reserveController = new ReserveController(reserveService);
export { reserveController };
