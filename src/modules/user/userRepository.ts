/* eslint-disable no-unused-vars */
import { User } from './IUser';
import { IUserRepository } from './IUserRepository';
import { userSchema } from './userSchema';
//import { UpdateQuery } from 'mongoose';

export class MongoUserRepository implements IUserRepository {
	async registerUser(user: User): Promise<User | null> {
		const registeredUser = await userSchema.create(user);
		return registeredUser;
	}

	async getUser(userId: string): Promise<User | null> {
		const user = await userSchema.findById(userId);
		return user;
	}

	async deleteUser(userId: string): Promise<User | null> {
		const deletedUser = await userSchema.findByIdAndDelete(userId);
		return deletedUser;
	}
	async updateUser(userId: string): Promise<User | null> {
		return null;
	}
	async findUserByEmail(email: string): Promise<User | null> {
		return null;
	}
}

const userRepository: IUserRepository = new MongoUserRepository();
export { userRepository };
