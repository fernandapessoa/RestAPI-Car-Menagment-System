import 'dotenv/config';
import { connect } from './database/db';

import { app } from './app';

const port = process.env.PORT || 4000;

app.listen(port, async () => {
	await connect();
	console.log(
		`Listening to port ${port}, environment: ${process.env.NODE_ENV}`
	);
});
