/* eslint-disable no-unused-vars */
import { Reserve } from './IReserve';

interface IReserveRepository {
	registerReserve(reserveData: Reserve): Promise<Reserve | null>;
	getAllReserves(): Promise<Reserve[] | null>;
	getReserveById(reserveId: string): Promise<Reserve[] | null>;
	getReserveByAttribute(
		attribute: Record<string, string | number>
	): Promise<Reserve[]>;
	updateReserveById(reserveId: string): Promise<Reserve[] | null>;
	deleteReserveById(reserveId: string): Promise<Reserve[] | null>;
}

export { IReserveRepository };
