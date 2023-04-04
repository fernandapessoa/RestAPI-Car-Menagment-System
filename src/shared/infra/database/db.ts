import mongoose from 'mongoose';

async function connect() {
	const DB_URL = (process.env.DATABASE as string).replace(
		'<PASSWORD>',
		process.env.DATABASE_PASSWORD as string
	);

	await mongoose.connect(DB_URL);

	console.log('Connected to database!');
}

export { connect };
