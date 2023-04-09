import { convertDate } from './convertDate';
import { AppError } from '../errors/AppError';
import { carService } from '../modules/car/carService';
import { finalValue } from './finalValue';

async function validateReserve(query: any): Promise<{
	start_date: Date;
	end_date: Date;
	id_car: string;
	id_user: string;
	final_value: number;
}> {
	let { start_date, end_date } = query;
	const { id_car } = query;
	const id_user = query.user._id;

	const car = await carService.getCarById(id_car);
	if (!car) throw new AppError(404, `Car id ${id_car} does not exist`);

	start_date = new Date(convertDate(start_date));
	end_date = new Date(convertDate(end_date));

	const final_value = finalValue(start_date, end_date, car.value_per_day);

	const reserveData = {
		start_date,
		end_date,
		id_car,
		id_user,
		final_value,
	};

	return reserveData;
}

async function validateUpdateReserve(
	updateBody: any,
	reserve: any
): Promise<{
	start_date?: Date;
	end_date?: Date;
	id_car?: string;
	id_user?: string;
	final_value?: number;
}> {
	let { start_date, end_date, id_car, id_user, final_value } = reserve;

	if (updateBody.start_date) {
		({ start_date } = updateBody);
		start_date = new Date(convertDate(start_date));
	}

	if (updateBody.end_date) {
		({ end_date } = updateBody);
		end_date = new Date(convertDate(end_date));
	}

	if (updateBody.id_car) {
		({ id_car } = updateBody);
	}

	if (updateBody.id_user) {
		({ id_user } = updateBody);
	}

	const car = await carService.getCarById(id_car);
	if (!car) throw new AppError(404, `Car id ${id_car} does not exist`);

	final_value = finalValue(start_date, end_date, car.value_per_day);

	if (updateBody.final_value) {
		({ final_value } = updateBody);
	}
	const reserveData = {
		start_date,
		end_date,
		id_car,
		id_user,
		final_value,
	};

	return reserveData;
}

export { validateReserve, validateUpdateReserve };
