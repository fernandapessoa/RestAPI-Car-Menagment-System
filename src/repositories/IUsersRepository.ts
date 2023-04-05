/* eslint-disable no-unused-vars */
import { User } from '../types/userType';

interface IUsersRepository {
	registerUser(user: User): Promise<User | null>;
}

export { IUsersRepository };
