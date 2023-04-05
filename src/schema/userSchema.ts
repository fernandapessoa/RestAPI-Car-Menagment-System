import { Schema, model } from 'mongoose';


const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A first name must be provided'],
			minlength: 3,
			trim: true,
		},

		birthDate: {
			type: Date,
			required: [true, 'A birth date must be provided'],
			min: new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
			max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
		},

		email: {
			type: String,
			required: [true, 'A email must be provided'],
			unique: true,
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

        }
	},
	{ timestamps: true }
);

export {userSchema};