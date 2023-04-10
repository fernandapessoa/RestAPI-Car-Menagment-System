/* eslint-disable no-unused-vars */
import { Car } from './ICar';

interface ICarRepository {
	registerCar(carData: Car): Promise<Car | null>;
	getAllCars(skip: number, limit: number): Promise<Car[]>;
	getCarById(carId: string): Promise<Car | null>;
	getCarByAccessoryId(accessoryId: string): Promise<Car[]>;
	getCarByAttribute(
		attribute: Record<string, string | number>,
		skip: number,
		limit: number
	): Promise<Car[]>;
	deleteCarById(carId: string): Promise<Car | null>;
	updateCar(carId: string, updateParams: unknown): Promise<Car | null>;
	updateCarByAcessoryId(
		carId: string,
		acessoryId: string,
		updateBody: unknown
	): Promise<Car | null>;
}

export { ICarRepository };
