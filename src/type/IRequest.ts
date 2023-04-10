import { Request } from 'express';

interface CustomHeaders extends NodeJS.Dict<string | string[]> {
	authorization?: string;
}

interface AuthenticatedRequest extends Request {
	authenticatedUser?: any;
	headers: CustomHeaders;
}
export { AuthenticatedRequest };
