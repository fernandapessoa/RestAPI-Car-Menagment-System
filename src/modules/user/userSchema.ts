import { Schema, model } from 'mongoose';
import { User } from './IUser';

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
		unique: true,
		trim: true,
	},
	birth: {
		type: Date,
		required: [true, 'A birth date must be provided'],
		min: new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
		max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
	},
	email: {
		type: String,
		required: [true, 'An email must be provided'],
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		minlength: 8,
		required: [true, 'A password must be provided'],
	},
	cep: {
		type: String,
		length: 8,
		required: [true, 'A CEP must be provided'],
		trim: true,
	},
	qualified: {
		type: String,
		required: [true, 'A qualified status must be provided'],
		trim: true,
	},
	patio: {
		type: String,
		trim: true,
	},
	complement: {
		type: String,
		trim: true,
	},
	neighborhood: {
		type: String,
		trim: true,
	},
	locality: {
		type: String,
		trim: true,
	},
	uf: {
		type: String,
		trim: true,
	},
});

const userSchema = model<User>('User', UserSchema);

export { userSchema };
