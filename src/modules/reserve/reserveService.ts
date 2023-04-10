import { IReserveRepository } from './IReserveRepository';
import { reserveRepository } from './reserveRepository';
import { Reserve } from './IReserve';
import { AppError } from '../../errors/AppError';
import { UpdateQuery } from 'mongoose';
import {
	validateReserve,
	validateUpdateReserve,
} from '../../utils/validateReserve';

export class ReserveService {
	private reserveRepository: IReserveRepository;

	constructor(reserveRepository: IReserveRepository) {
		this.reserveRepository = reserveRepository;
	}

	async registerReserve(reserve: any): Promise<Reserve | null> {
		const reserveData = await validateReserve(reserve);
		const isReserveDateAlreadyInUse =
			await this.reserveRepository.findUserReserve(
				reserve.id_user,
				reserve.start_date,
				reserve.end_date
			);
		if (isReserveDateAlreadyInUse) {
			throw new AppError(
				400,
				'User already has a reservation on the requested date'
			);
		}
		const isCarReservatedOnDate = await this.reserveRepository.findCarReserve(
			reserve.id_car,
			reserve.start_date,
			reserve.end_date
		);
		if (isCarReservatedOnDate) {
			throw new AppError(
				400,
				'Car is already reserveted on the requested date'
			);
		}
		const registeredData = await this.reserveRepository.registerReserve(
			reserveData
		);
		return registeredData;
	}

	async getAllReserves(
		userId: string,
		skip: number,
		limit: number
	): Promise<Reserve[]> {
		const reserves = await this.reserveRepository.getAllReserves(
			userId,
			skip,
			limit
		);
		return reserves;
	}

	async getReserveById(
		userId: string,
		reserveId: string
	): Promise<Reserve | null> {
		const reserve = await this.reserveRepository.getReserveById(
			userId,
			reserveId
		);
		if (!reserve) {
			throw new AppError(404, 'Reserve not found');
		}
		return reserve;
	}

	async getReserveByQueryParam(
		attributes: Record<string, string | number>,
		skip: number,
		limit: number
	) {
		const reserves = await this.reserveRepository.getReserveByAttribute(
			attributes,
			skip,
			limit
		);
		return reserves;
	}

	async deleteReserveById(
		userId: string,
		reserveId: string
	): Promise<Reserve | null> {
		const deletedReserve = await this.reserveRepository.deleteReserveById(
			userId,
			reserveId
		);
		return deletedReserve;
	}
	async updateReserveById(
		userId: string,
		reserveId: string,
		updateBody: UpdateQuery<Reserve>
	): Promise<Reserve | null> {
		const reserve = await this.getReserveById(userId, reserveId);
		updateBody = await validateUpdateReserve(updateBody, reserve);
		const updatedReserve = await this.reserveRepository.updateReserveById(
			userId,
			reserveId,
			updateBody
		);
		return updatedReserve;
	}
}

const reserveService = new ReserveService(reserveRepository);
export { reserveService };
