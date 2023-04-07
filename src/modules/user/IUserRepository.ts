/* eslint-disable no-unused-vars */
import { User } from './IUser';

interface IUserRepository {
	registerUser(user: User): Promise<User | null>;
	getUser(userId: string): Promise<User | null>;
	deleteUser(userId: string): Promise<User | null>;
	updateUser(userId: string, updateParams: unknown): Promise<User | null>;
	findUserByEmail(email: string): Promise<User | null>;
}

export { IUserRepository };
