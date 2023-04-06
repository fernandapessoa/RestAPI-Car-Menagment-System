/* eslint-disable no-unused-vars */
import { User } from '../../types/userType';

interface IUserRepository {
	registerUser(user: User): Promise<User | null>;
}

export { IUserRepository };
