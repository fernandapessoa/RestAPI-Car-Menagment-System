import { Router } from 'express';
import { carController } from '../modules/car/carController';
import { validateCarData } from '../middlewares/validateCarData';

const carsRouter = Router();

carsRouter.post('/', validateCarData, carController.registerCar);
carsRouter.get('/', carController.gatCars); //get all or by query param
carsRouter.get('/:id', carController.getCarById);
carsRouter.delete('/:id', carController.deleteCarById);
carsRouter.put('/:id', carController.updateCarById);
carsRouter.patch('/:carId/accessories/:accerryId');

export { carsRouter };
