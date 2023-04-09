/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

import { Reserve } from './IReserve';
import { IReserveRepository } from './IReserveRepository';
import { reserveSchema } from './reserveSchema';
import { UpdateQuery } from 'mongoose';

export class MongoReserveRepository implements IReserveRepository {
	async registerReserve(reserveData: Reserve): Promise<Reserve | null> {
		const registeredReserve = await reserveSchema.create(reserveData);
		return registeredReserve;
	}

	async getAllReserves(): Promise<Reserve[]> {
		const reserves = await reserveSchema.find({});
		return reserves;
	}

	async getReserveById(
		userId: string,
		reserveId: string
	): Promise<Reserve | null> {
		const reserve = await reserveSchema
			.findOne({
				_id: reserveId,
				id_user: userId,
			})
			.select({ __v: false });
		return reserve;
	}

	async getReserveByAttribute(
		attributes: Record<string, string | number>
	): Promise<Reserve[]> {
		const reserve = await reserveSchema.find(attributes).select({ __v: false });
		return reserve;
	}

	async updateReserveById(
		userId: string,
		reserveId: string,
		updateBody: UpdateQuery<Reserve>
	): Promise<Reserve | null> {
		const updatedReserve = await reserveSchema
			.findByIdAndUpdate(reserveId, updateBody, {
				new: true,
				runValidators: true,
			})
			.select({ __v: false });
		return updatedReserve;
	}

	async deleteReserveById(
		userId: string,
		reserveId: string
	): Promise<Reserve | null> {
		const deletedReserve = await reserveSchema.findOneAndDelete({
			_id: reserveId,
			id_user: userId,
		});
		return deletedReserve;
	}
}

const reserveRepository = new MongoReserveRepository();
export { reserveRepository };
