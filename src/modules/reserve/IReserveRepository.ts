/* eslint-disable no-unused-vars */
import { Reserve } from './IReserve';

interface IReserveRepository {
	registerReserve(reserveData: Reserve): Promise<Reserve | null>;
	getAllReserves(userId: string): Promise<Reserve[]>;
	getReserveById(userId: string, reserveId: string): Promise<Reserve | null>;
	updateReserveById(
		userId: string,
		reserveId: string,
		updateBody: unknown
	): Promise<Reserve | null>;
	getReserveByAttribute(
		attributes: Record<string, string | number>
	): Promise<Reserve[]>;
	deleteReserveById(userId: string, reserveId: string): Promise<Reserve | null>;
}

export { IReserveRepository };
