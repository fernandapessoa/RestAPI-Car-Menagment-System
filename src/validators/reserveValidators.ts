import Joi from 'joi';
import { Reserve } from '../modules/reserve/IReserve';

const registerReserveSchema = Joi.object<Reserve>({
	start_date: Joi.date().required(),
	end_date: Joi.date().greater(Joi.ref('start_date')).required(),
	id_car: Joi.string().required(),
});

const updateReserveSchema = Joi.object<Reserve>({
	start_date: Joi.date().optional(),
	end_date: Joi.date().greater(Joi.ref('start_date')).optional(),
	id_car: Joi.string().optional(),
}).min(1);

export { registerReserveSchema, updateReserveSchema };
