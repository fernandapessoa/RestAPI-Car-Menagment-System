import { Router } from 'express';
import { carController } from '../modules/car/carController';

const carsRouter = Router();

carsRouter.post('/', (req, res, next) =>
	carController.registerCar(req, res, next)
);
carsRouter.get('/', (req, res, next) =>
	carController.gatAllCars(req, res, next)
); //get all ou por query param
carsRouter.get('/:id', (req, res, next) =>
	carController.getCarById(req, res, next)
);
carsRouter.delete('/:id', (req, res, next) =>
	carController.deleteCarById(req, res, next)
);
carsRouter.put('/:id', (req, res, next) =>
	carController.updateCarById(req, res, next)
);

export { carsRouter };
