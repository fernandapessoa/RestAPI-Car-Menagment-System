import { Car } from './ICar';
import { ICarRepository } from './ICarRepository';
import { carSchema } from './carSchema';
import { UpdateQuery } from 'mongoose';

export class MongoCarRepository implements ICarRepository {
	async registerCar(carData: Car): Promise<Car | null> {
		const registeredCar = await carSchema.create(carData);
		return registeredCar;
	}

	async getAllCars(skip: number, limit: number): Promise<Car[]> {
		const cars = await carSchema.find({}).skip(skip).limit(limit);
		return cars;
	}

	async getCarById(carId: string): Promise<Car | null> {
		const car = await carSchema.findOne({ _id: carId });
		return car;
	}

	async getCarByAccessoryId(accessoryId: string): Promise<Car[]> {
		const car = await carSchema.find({ 'accessories._id': accessoryId });
		return car;
	}

	async deleteCarById(carId: string): Promise<Car | null> {
		const deletedCar = await carSchema.findOneAndDelete({
			_id: carId,
		});
		return deletedCar;
	}

	async updateCar(
		carId: string,
		updateBody: UpdateQuery<Car>
	): Promise<Car | null> {
		const updatedCar = await carSchema.findByIdAndUpdate(carId, updateBody, {
			new: true,
			runValidators: true,
		});
		return updatedCar;
	}

	async updateCarByAcessoryId(
		carId: string,
		acessoryId: string,
		updateBody: UpdateQuery<Car>
	): Promise<Car | null> {
		const updatedCar = await carSchema.findOneAndUpdate(
			{ _id: carId, 'accessories._id': acessoryId },
			updateBody,
			{ new: true, runValidators: true }
		);
		return updatedCar;
	}

	async getCarByAttribute(
		attributes: Record<string, string | number>,
		skip: number,
		limit: number
	): Promise<Car[]> {
		const cars = await carSchema.find(attributes).skip(skip).limit(limit);
		return cars;
	}
}

const carRepository = new MongoCarRepository();
export { carRepository };
