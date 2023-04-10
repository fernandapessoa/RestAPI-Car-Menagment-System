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

	async getAllReserves(
		userId: string,
		skip: number,
		limit: number
	): Promise<Reserve[]> {
		const reserves = await reserveSchema
			.find({ id_user: userId })
			.select({ __v: false })
			.skip(skip)
			.limit(limit);
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
		attributes: Record<string, string | number>,
		skip: number,
		limit: number
	): Promise<Reserve[]> {
		const reserve = await reserveSchema
			.find(attributes)
			.select({ __v: false })
			.skip(skip)
			.limit(limit);
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

	async findUserReserve(
		id_user: string,
		start_date: Date,
		end_date: Date
	): Promise<Reserve | null> {
		const reserves = await reserveSchema.findOne({
			id_user,
			$or: [
				{
					start_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
				},
				{
					end_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
				},
			],
		});

		return reserves;
	}

	async findCarReserve(
		id_car: string,
		start_date: Date,
		end_date: Date
	): Promise<Reserve | null> {
		const reserves = await reserveSchema.findOne({
			id_car,
			$or: [
				{
					start_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
				},
				{
					end_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
				},
			],
		});

		return reserves;
	}
}

const reserveRepository = new MongoReserveRepository();
export { reserveRepository };
