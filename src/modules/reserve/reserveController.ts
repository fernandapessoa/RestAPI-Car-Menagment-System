/* eslint-disable @typescript-eslint/no-unused-vars*/

import { ReserveService, reserveService } from './reserveService';
import { Request, Response, NextFunction } from 'express';
import { Reserve } from './IReserve';
import { CatchExpressError } from '../../decorators/CatchExpressError';
import { pagination } from '../../utils/pagination';

export class ReserveController {
	private reserveService: ReserveService;

	constructor(reserveService: ReserveService) {
		this.reserveService = reserveService;
	}

	@CatchExpressError
	async registerReserve(req: Request, res: Response, _next: NextFunction) {
		const reserveData: Reserve = req.body;
		const reserve = await this.reserveService.registerReserve(reserveData);

		return res.status(201).json({
			status: 'success',
			data: reserve,
		});
	}

	@CatchExpressError
	async getReserve(req: Request, res: Response, _next: NextFunction) {
		const userId: string = req.body.user._id;
		const [skip, limit, offset, offsets, queryparam, filteredKeys] =
			pagination(req);

		if (queryparam) {
			const attributes = filteredKeys.reduce((acc, key) => {
				return {
					...acc,
					[key]: req.query[key],
				};
			}, {}) as Record<string, string | number>;
			attributes.id_user = userId;
			const filteredReserves = await this.reserveService.getReserveByQueryParam(
				attributes,
				skip,
				limit
			);
			return res.status(200).json({
				status: 'success',
				data: filteredReserves,
				total: filteredReserves.length,
				limit: limit,
				offset: offset,
				offsets: offsets,
			});
		}

		const reserves = await this.reserveService.getAllReserves(
			userId,
			skip,
			limit
		);
		return res.status(200).json({
			status: 'success',
			data: reserves,
			total: reserves.length,
			limit: limit,
			offset: offset,
			offsets: offsets,
		});
	}

	@CatchExpressError
	async getReserveById(req: Request, res: Response, _next: NextFunction) {
		const userId: string = req.body.user._id.toString();
		const reserveId: string = req.params.id;

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
