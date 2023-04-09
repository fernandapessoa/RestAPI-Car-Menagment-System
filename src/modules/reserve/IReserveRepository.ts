/* eslint-disable no-unused-vars */
import { Reserve } from './IReserve';

interface IReserveRepository {
	registerReserve(reserveData: Reserve): Promise<Reserve | null>;
	getAllReserves(): Promise<Reserve[] | null>;
	getReserveById(userId: string, reserveId: string): Promise<Reserve | null>;
	updateReserveById(
		userId: string,
		reserveId: string,
		updateBody: unknown
	): Promise<Reserve | null>;
	deleteReserveById(reserveId: string): Promise<Reserve | null>;
}

export { IReserveRepository };
