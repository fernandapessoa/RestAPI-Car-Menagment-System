/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Car } from '../modules/car/ICar';
import Joi from 'joi';

const registerCarSchema = Joi.object<Car>({
	model: Joi.string().required(),
	color: Joi.string().required(),
	year: Joi.number().integer().min(1950).max(2023).required(),
	value_per_day: Joi.number().required(),
	accessories: Joi.array()
		.items(
			Joi.object({
				description: Joi.string().required(),
			})
		)
		.unique((a, b) => a.description === b.description) // valida que não haja descrições repetidas
		.min(1)
		.required(),
	number_of_passengers: Joi.number().required(),
});

export { registerCarSchema };
