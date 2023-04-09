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

	async getAllReserves(): Promise<Reserve[] | null> {
		return null;
	}

	async getReserveById(reserveId: string): Promise<Reserve[] | null> {
		return null;
	}

	async getReserveByAttribute(
		attribute: Record<string, string | number>
	): Promise<Reserve[]>;

	async updateReserveById(reserveId: string): Promise<Reserve[] | null> {
		return null;
	}

	async deleteReserveById(reserveId: string): Promise<Reserve[] | null> {
		return null;
	}
}

const reserveRepository = new MongoReserveRepository();
export { reserveRepository };
