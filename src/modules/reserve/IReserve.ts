interface Reserve {
	_id?: string;
	id_user: string;
	start_date: Date;
	end_date: Date;
	id_car: string;
	final_value: number;
}

export { Reserve };
