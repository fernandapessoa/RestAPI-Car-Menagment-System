import { ICarRepository } from './ICarRepository';
import { carRepository } from './carRepository';
import { Car } from './ICar';
import { AppError } from '../../errors/AppError';

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

	async getAllCars() {
		const cars = await this.carRepository.getAllCars();
		return cars;
	}

	async getCarById(carId: string) {
		const car = await this.carRepository.getCarById(carId);
		return car;
	}
}

const carService = new CarService(carRepository);
export { carService };
