import { ICarRepository } from './ICarRepository';
import { carRepository } from './carRepository';
import { Car } from './ICar';
import { AppError } from '../../errors/AppError';
import { UpdateQuery } from 'mongoose';

export class CarService {
	private carRepository: ICarRepository;

	constructor(carRepository: ICarRepository) {
		this.carRepository = carRepository;
	}

	async registerCar(carData: Car) {
		const registerCar = await this.carRepository.registerCar(carData);
		if (!registerCar) {
			throw new AppError(400, 'Car already exists');
		}
		return registerCar;
	}

	async getAllCars(skip: number, limit: number) {
		const cars = await this.carRepository.getAllCars(skip, limit);
		return cars;
	}

	async getCarById(carId: string) {
		const car = await this.carRepository.getCarById(carId);
		return car;
	}

	async deleteCarById(carId: string) {
		const deletedCar = await this.carRepository.deleteCarById(carId);
		return deletedCar;
	}

	async updateCarById(
		carId: string,
		updateBody: UpdateQuery<Car>
	): Promise<Car | null> {
		const car = await this.carRepository.updateCar(carId, updateBody);
		if (!car) throw new AppError(404, 'Car not found');
		return car;
	}

	async updateCarByAcessoryId(
		carId: string,
		acessoryId: string,
		updateBody: UpdateQuery<Car>
	): Promise<Car | null> {
		const car = await this.carRepository.updateCarByAcessoryId(
			carId,
			acessoryId,
			updateBody
		);
		if (!car) throw new AppError(404, 'Car not found');
		return car;
	}

	async getCarByQueryParam(
		attributes: Record<string, string | number>,
		skip: number,
		limit: number
	) {
		const cars = await this.carRepository.getCarByAttribute(
			attributes,
			skip,
			limit
		);
		return cars;
	}
}

const carService = new CarService(carRepository);
export { carService };
