interface Accessory {
	_id: string;
	description: string;
}

interface Car {
	_id: string;
	model: string;
	color: string;
	year: number;
	value_per_day: number;
	accessories: Accessory[];
	number_of_passengers: number;
}

export { Car };
