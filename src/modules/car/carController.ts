/* eslint-disable @typescript-eslint/no-unused-vars*/

import { CarService, carService } from './carService';
import { Request, Response, NextFunction } from 'express';
import { Car } from './ICar';
import { CatchExpressError } from '../../decorators/CatchExpressError';
import { pagination } from '../../utils/pagination';

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
	async getCars(req: Request, res: Response, _next: NextFunction) {
		const [skip, limit, offset, offsets, queryparam, filteredKeys] =
			pagination(req);
		if (queryparam) {
			const attributes = filteredKeys.reduce((acc, key) => {
				return {
					...acc,
					[key]: req.query[key],
				};
			}, {}) as Record<string, string | number>;

			const filteredCars = await this.carService.getCarByQueryParam(
				attributes,
				skip,
				limit
			);

			return res.status(200).json({
				status: 'success',
				data: filteredCars,
				total: filteredCars.length,
				limit: limit,
				offset: offset,
				offsets: offsets,
			});
		}

		const cars = await this.carService.getAllCars(skip, limit);
		return res.status(200).json({
			status: 'success',
			data: cars,
			total: cars.length,
			limit: limit,
			offset: offset,
			offsets: offsets,
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

	@CatchExpressError
	async updateCarByAcessoryId(
		req: Request,
		res: Response,
		_next: NextFunction
	) {
		const { carId } = req.params;
		const acessoryUd = req.params.accessoryId;
		const updateBody = req.body;
		const car = await this.carService.updateCarByAcessoryId(
			carId,
			acessoryUd,
			updateBody
		);

		return res.status(200).json({
			status: 'success',
			data: car,
		});
	}
}

const carController = new CarController(carService);
export { carController };
