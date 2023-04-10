/* eslint-disable @typescript-eslint/no-explicit-any*/
export function pagination(
	req: any
): [number, number, number, number, boolean, string[]] {
	let page = 1;
	let limit = 100;
	if (req.query.page) page = +req.query.page;
	if (req.query.limit) limit = +req.query.limit;
	const skip = (page - 1) * limit;
	const offset = skip + 1;
	const offsets = skip + limit;
	let queryparam = false;

	const additionalQueryParams = Object.keys(req.query).filter(
		(key) => key !== 'page' && key !== 'limit'
	);

	if (additionalQueryParams.length > 0) {
		queryparam = true;
		const filteredKeys = Object.keys(req.query).filter((key) =>
			additionalQueryParams.includes(key)
		);
		return [skip, limit, offset, offsets, queryparam, filteredKeys];
	}

	return [skip, limit, offset, offsets, queryparam, []];
}
