import { Router } from 'express';
import { carController } from '../modules/car/carController';
import {
	validateCarData,
	validateUpdateCarData,
} from '../middlewares/validateCarData';
import { carAuth } from '../middlewares/auth';

const carsRouter = Router();

carsRouter.post('/', carAuth, validateCarData, carController.registerCar);
carsRouter.get('/', carAuth, carController.getCars);
carsRouter.get('/:id', carAuth, carController.getCarById);
carsRouter.delete('/:id', carAuth, carController.deleteCarById);
carsRouter.put(
	'/:id',
	carAuth,
	validateUpdateCarData,
	carController.updateCarById
);
carsRouter.patch(
	'/:carId/accessories/:accerryId',
	carAuth,
	validateCarData,
	carController.updateCarByAcessoryId
);

export { carsRouter };
