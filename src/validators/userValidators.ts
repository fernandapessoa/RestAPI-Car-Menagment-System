/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import joiDate from '@joi/date';
import { isValidCpf } from '../utils/isValidCpf';
const joiExtended = Joi.extend(joiDate);

const registerUserSchema = Joi.object({
	name: Joi.string().min(3).max(65).required(),
	birth: joiExtended
		.date()
		.format('DD/MM/YYYY')
		.min(new Date(new Date().getFullYear() - 130))
		.max(new Date(Date.now() - 18))
		.required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	cpf: Joi.string()
		.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
		.custom((value: string, helper: any) => {
			if (!isValidCpf(value)) {
				return helper.message('Invalid CPF');
			}
			return value;
		})
		.required(),
	cep: Joi.string()
		.pattern(/^\d{8}$/)
		.required(),
	qualified: Joi.string().valid('sim', 'não').required(),
}).options({ abortEarly: false });

const updateUserSchema = Joi.object({
	name: Joi.string().min(3).max(65).optional(),
	birth: joiExtended
		.date()
		.format('DD/MM/YYYY')
		.min(new Date(new Date().getFullYear() - 130))
		.max(new Date(Date.now() - 18))
		.optional(),
	email: Joi.string().email().optional(),
	password: Joi.string().min(6).optional(),
	cpf: Joi.string()
		.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
		.custom((value: string, helper: any) => {
			if (!isValidCpf(value)) {
				return helper.message('Invalid CPF');
			}
			return value;
		})
		.optional(),
	cep: Joi.string()
		.pattern(/^\d{8}$/)
		.optional(),
	qualified: Joi.string().valid('sim', 'não').optional(),
})
	.unknown(true)
	.options({ abortEarly: false });

export { registerUserSchema, updateUserSchema };
