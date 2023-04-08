/* eslint-disable no-unused-vars */
import { Car } from './ICar';

interface ICarRepository {
	registerCar(car: Car): Promise<Car | null>;
	getAllCars(): Promise<Car[]>;
	getCarById(carId: string): Promise<Car | null>;
	getCarByAccessoryId(accessoriesId: string): Promise<Car[]>;
    getCarByParam(queryParam: string): Promise<Car[]>;
	deleteCarById(carId: string): Promise<Car | null>;
	updateCar(carId: string, updateParams: unknown): Promise<Car | null>;
}

export { ICarRepository };
