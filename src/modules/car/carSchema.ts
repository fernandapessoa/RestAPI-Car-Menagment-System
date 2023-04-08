import { Schema, model } from 'mongoose';
import { Car } from './ICar';

const CarSchema = new Schema<Car>(
	{
		model: {
			type: String,
			unique: true,
			required: [true, 'The car model is required'],
			trim: true,
		},

		color: {
			type: String,
			required: [true, 'The car color is required'],
			trim: true,
		},

		year: {
			type: String,
			required: [true, 'The car year is required'],
			min: [1900, 'The car year must be greater than or equal to 1900'],
			max: [
				new Date().getFullYear(),
				'The car year cannot be greater than the current year',
			],
		},

		value_per_day: {
			type: Number,
			required: [true, 'The car rental value per day is required'],
			min: [
				0,
				'The car rental value per day must be greater than or equal to zero',
			],
		},

		accessories: [
			{
				description: {
					type: String,
					required: [true, 'The accessory description is required'],
					trim: true,
				},
			},
		],

		number_of_passengers: {
			type: Number,
			required: [true, 'The number of passengers is required'],
			min: [1, 'The number of passengers must be greater than or equal to 1'],
		},
	},
	{ versionKey: false }
);

const carSchema = model('Car', CarSchema);

export { carSchema };
