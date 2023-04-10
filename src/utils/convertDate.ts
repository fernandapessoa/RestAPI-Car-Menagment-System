export function convertDate(date: Date | string): Date | string {
	if (typeof date === 'string') {
		const dateParts = date.split('/');
		const day = dateParts[1];
		const month = dateParts[0];
		const year = dateParts[2];
		return `${day}/${month}/${year}`;
	}
	return date;
}
