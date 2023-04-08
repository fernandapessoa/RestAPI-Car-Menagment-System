interface Car {
	_id: string;
	model: string;
	color: string;
	year: number;
	value_per_day: number;
	accessories: {
		description: string;
	}[];
	number_of_passengers: number;
}

export { Car };
