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
		const reserData: Reserve = req.body;
		const reserve = await this.reserveService.registerReserve(reserData);

		return res.status(201).json({
			status: 'success',
			data: reserve,
		});
	}

	@CatchExpressError
	async getReserve(req: Request, res: Response, _next: NextFunction) {
		const userId: string = req.body.user._id;
		const reserveParams = req.params;
		if (reserveParams) {
			const attributes = req.query as Record<string, string | number>;
			attributes.id_user = userId;
			const filteredReserves = await this.reserveService.getReserveByQueryParam(
				attributes
			);
			return res.status(200).json({
				status: 'success',
				data: filteredReserves,
				total: filteredReserves.length,
			});
		}

		const reserves = await this.reserveService.getAllReserves(userId);
		return res.status(200).json({
			status: 'success',
			data: reserves,
			total: reserves.length,
		});
	}

	@CatchExpressError
	async getReserveById(req: Request, res: Response, _next: NextFunction) {
		const userId: string = req.body.user._id.toString();
		const reserveId: string = req.params.id;
		console.log(userId);
		console.log(reserveId);

		const reserve = await this.reserveService.getReserveById(userId, reserveId);
		return res.status(200).json({
			status: 'success',
			data: reserve,
		});
	}

	@CatchExpressError
	async deleteReserveById(req: Request, res: Response, _next: NextFunction) {
		const userId: string = req.body.user._id;
		const reserveId = req.params.id;

		const deletedReserve = await this.reserveService.deleteReserveById(
			userId,
			reserveId
		);

		if (!deletedReserve) {
			return res.status(404).json({
				message: `Reserve of id ${reserveId} not found`,
			});
		}

		return res.status(204).json({
			status: 'success',
			message: `Reserve of id $reserverId} deleted`,
		});
	}

	@CatchExpressError
	async updateReserveById(req: Request, res: Response, _next: NextFunction) {
		const userId = req.body.user._id;
		const reserveId = req.params.id;
		const updateBody = req.body;

		const reserve = await this.reserveService.updateReserveById(
			userId,
			reserveId,
			updateBody
		);

		return res.status(200).json({
			status: 'success',
			data: reserve,
		});
	}
}

const reserveController = new ReserveController(reserveService);
export { reserveController };
