export class AppError extends Error {
	public readonly statusCode;
	public readonly isOperational;
	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;
	}
}
