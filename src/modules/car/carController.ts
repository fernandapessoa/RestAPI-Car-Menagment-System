import { CarService, carService } from './carService';
import { Request, Response, NextFunction } from 'express';
import { Car } from './ICar';
import { CatchExpressError } from '../../decorators/CatchExpressError';

export class CarController {
	private carService: CarService;

	constructor(carService: CarService) {
		this.carService = carService;
	}

	@CatchExpressError
	async registerCar(req: Request, res: Response, _next: NextFunction) {
		const carData: Car = req.body;
		const car = await this.carService.registerCar(carData);

		return res.status(201).json({
			status: 'success',
			data: car,
		});
	}

	@CatchExpressError
	async gatAllCars(req: Request, res: Response, _next: NextFunction) {
		const cars = await this.carService.getAllCars();
		return res.status(200).json({
			status: 'success',
			data: cars,
			total: cars.length,
		});
	}

	@CatchExpressError
	async getCarById(req: Request, res: Response, _next: NextFunction) {
		const carId = req.params.id;
		const car = await this.carService.getCarById(carId);
		return res.status(200).json({
			status: 'success',
			data: car,
		});
	}

	@CatchExpressError
	async deleteCarById(req: Request, res: Response, _next: NextFunction) {
		const carId = req.params.id;
		const deletedCar = await this.carService.deleteCarById(carId);

		if (!deletedCar) {
			return res.status(404).json({
				message: `Car of id ${carId} not found`,
			});
		}

		return res.status(204).json({
			status: 'success',
			message: `Car of id ${carId} deleted`,
		});
	}

	@CatchExpressError
	async updateCarById(req: Request, res: Response, _next: NextFunction) {
		const carId = req.params.id;
		const updateBody = req.body;
		const car = await this.carService.updateCarById(carId, updateBody);

		return res.status(200).json({
			status: 'success',
			data: car,
		});
	}
}

const carController = new CarController(carService);
export { carController };
