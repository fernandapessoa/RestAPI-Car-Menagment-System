/* eslint-disable no-unused-vars */
import { Reserve } from './IReserve';

interface IReserveRepository {
	registerReserve(reserveData: Reserve): Promise<Reserve | null>;
	getAllReserves(
		userId: string,
		skip: number,
		limit: number
	): Promise<Reserve[]>;
	getReserveById(userId: string, reserveId: string): Promise<Reserve | null>;
	updateReserveById(
		userId: string,
		reserveId: string,
		updateBody: unknown
	): Promise<Reserve | null>;
	getReserveByAttribute(
		attributes: Record<string, string | number>,
		skip: number,
		limit: number
	): Promise<Reserve[]>;
	deleteReserveById(userId: string, reserveId: string): Promise<Reserve | null>;
	findUserReserve(
		id_user: string,
		start_date: Date,
		end_date: Date
	): Promise<Reserve | null>;
	findCarReserve(
		id_car: string,
		start_date: Date,
		end_date: Date
	): Promise<Reserve | null>;
	deleteAllUserReserves(userId: string): Promise<void>;
}

export { IReserveRepository };
