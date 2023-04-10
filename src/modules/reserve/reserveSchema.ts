import { Schema, model } from 'mongoose';
import { Reserve } from './IReserve';

const ReserveSchema = new Schema<Reserve>({
	start_date: {
		type: Date,
		required: [true, 'A start date must be provided'],
	},
	end_date: {
		type: Date,
		required: [true, 'An end date must be provided'],
	},
	id_car: {
		type: String,
		ref: 'Car',
		required: [true, 'A car id must be provided'],
	},
	id_user: {
		type: String,
		ref: 'User',
		require: true,
	},
	final_value: {
		type: Number,
		required: true,
	},
});

const reserveSchema = model('Reserve', ReserveSchema);

export { reserveSchema };
