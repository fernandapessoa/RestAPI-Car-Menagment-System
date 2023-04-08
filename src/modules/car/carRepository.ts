import { Car } from './ICar';
import { ICarRepository } from './ICarRepository';
import { carSchema } from './carSchema';
import { UpdateQuery } from 'mongoose';

export class MongoCarRepository implements ICarRepository {
	async registerCar(car: Car): Promise<Car | null> {
		const registeredCar = await carSchema.create(car);
		return registeredCar;
	}

	async getAllCars(): Promise<Car[]> {
		const cars = await carSchema.find({});
		return cars;
	}

	async getCarById(carId: string): Promise<Car | null> {
		const car = await carSchema.findOne({ _id: carId });
		return car;
	}
	async getCarByAccessoryId(accessoriesId: string): Promise<Car[]> {}
	getCarByParam(queryParam: string): Promise<Car[]> {}
	async deleteCarById(carId: string): Promise<Car | null> {}
	async updateCar(carId: string, updateParams: unknown): Promise<Car | null> {}
}

export { ICarRepository };
