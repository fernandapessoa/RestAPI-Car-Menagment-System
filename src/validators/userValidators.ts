// import Joi from 'joi';

// const createUserSchema = Joi.object({
// 	name: Joi.string().min(6).max(65).required(),
// 	//validar cpf ainda
// 	cpf: Joi.string()
// 		.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
// 		.required(),
// 	birth: Joi.date()
// 		.required()
// 		.max('now')
// 		.iso()
// 		.raw()
// 		.custom((value, helper) => {
// 			const idade = new Date().getFullYear() - new Date(value).getFullYear();
// 			if (idade < 18 || idade > 120) {
// 				return helper.message(
// 					'The user must be over 18 years old and under 120.'
// 				);
// 			}
// 			return value;
// 		}),
// 	email: Joi.string().email().required(),
// 	password: Joi.string().min(8).required(),
// 	//usar a api
// 	cep: Joi.string()
// 		.pattern(/^\d{5}\-\d{3}$/)
// 		.required(),
// 	qualified: Joi.boolean().required(),
// });
