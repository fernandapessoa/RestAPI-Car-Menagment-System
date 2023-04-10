import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface TokenPayload extends JwtPayload {
	id: string;
}

export function verifyToken(token: string) {
	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as TokenPayload;

		return payload;
	} catch (err) {
		return null;
	}
}

export function createToken(id: string): string {
	const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	return token;
}

export async function hashPass(password: string): Promise<string> {
	const salt = Number(process.env.BCRYPT_SALT);
	const hashedPass = await bcrypt.hash(password, salt);
	return hashedPass;
}

export async function comparePass(
	password: string,
	encrypted: string
): Promise<boolean> {
	const validPass = await bcrypt.compare(password, encrypted);
	return validPass;
}
