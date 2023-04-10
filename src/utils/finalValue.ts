export function finalValue(
	start_date: Date,
	end_date: Date,
	value_per_day: number
): number {
	const timeDiff = Math.abs(end_date.getTime() - start_date.getTime());
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	const finalValue = diffDays * value_per_day;

	return finalValue;
}
