/* eslint-disable no-unused-vars */
import { User } from '../../types/userType';
import { IUserRepository } from './IUserRepository';
import { userSchema } from '../../schema/userSchema';
//import { UpdateQuery } from 'mongoose';

export class MongoUserRepository implements IUserRepository {
	async registerUser(user: User): Promise<User | null> {
		const registeredUser = await userSchema.create(user);
		return registeredUser;
	}
}

const userRepository: IUserRepository = new MongoUserRepository();
export { userRepository };
