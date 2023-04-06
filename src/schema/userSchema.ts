import { Schema, model } from 'mongoose';
import { User } from '../types/userType';

const UserSchema = new Schema<User>({
	name: {
		type: String,
		required: [true, 'A first name must be provided'],
		minlength: 3,
		trim: true,
	},
	cpf: {
		type: String,
		required: [true, 'A valid CPF must be provided'],
	},
	birth: {
		type: Date,
		required: [true, 'A birth date must be provided'],
		min: new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
		max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
	},

	email: {
		type: String,
		required: [true, 'A email must be provided'],
		//unique: true,
		lowercase: true,
	},

	password: {
		type: String,
		minlength: 8,
		required: [true, 'A password must be provided'],
	},

	cep: {
		type: String,
		lengh: 8,
		required: [true, 'A CEP must be provided'],
	},
	qualified: {
		type: String,
		required: [true, 'A qualified status must be provided'],
	},
	patio: {
		type: String,
	},
	complement: {
		type: String,
	},
	neighborhood: {
		type: String,
	},
	locality: {
		type: String,
	},
	uf: {
		type: String,
	},
});

const userSchema = model('User', UserSchema);
export { userSchema };