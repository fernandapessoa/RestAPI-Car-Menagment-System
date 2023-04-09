import { IReserveRepository } from './IReserveRepository';
import { reserveRepository } from './reserveRepository';
import { Reserve } from './IReserve';
import { convertDate } from '../../utils/convertDate';
import { AppError } from '../../errors/AppError';
import { UpdateQuery } from 'mongoose';

export class ReserveService {
	private reserveRepository: IReserveRepository;

	constructor(reserveRepository: IReserveRepository) {
		this.reserveRepository = reserveRepository;
	}

	async registerReserve(query: any): Promise<Reserve | null> {
		let { start_date, end_date } = query;
		const { id_car } = query;
		const id_user = query.user._id;

		start_date = new Date(convertDate(start_date));
		end_date = new Date(convertDate(end_date));

		const reserveData = {
			start_date,
			end_date,
			id_car,
			id_user,
			final_value: 10,
		};

		const registeredData = await this.reserveRepository.registerReserve(
			reserveData
		);
		return registeredData;
	}

	async getAllReserves(userId: string): Promise<Reserve[]> {
		const reserves = await this.reserveRepository.getAllReserves(userId);
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

	async getReserveByQueryParam(attributes: Record<string, string | number>) {
		const reserves = await this.reserveRepository.getReserveByAttribute(
			attributes
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
		const reserve = await this.reserveRepository.updateReserveById(
			userId,
			reserveId,
			updateBody
		);
		return reserve;
	}
}

const reserveService = new ReserveService(reserveRepository);
export { reserveService };
