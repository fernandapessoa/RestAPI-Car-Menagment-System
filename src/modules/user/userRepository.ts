/* eslint-disable no-unused-vars */
import { User } from './IUser';
import { IUserRepository } from './IUserRepository';
import { userSchema } from './userSchema';
import { UpdateQuery } from 'mongoose';

export class MongoUserRepository implements IUserRepository {
	async registerUser(user: User): Promise<User | null> {
		const registeredUser = await userSchema.create(user);
		return registeredUser;
	}

	async getAllUsers(): Promise<User[] | null> {
		const users = await userSchema.find({}).select({ __v: false });
		return users;
	}

	async getUser(userId: string): Promise<User | null> {
		const user = await userSchema.findById(userId).select({ __v: false });
		return user;
	}

	async deleteUser(userId: string): Promise<User | null> {
		const deletedUser = await userSchema.findByIdAndDelete(userId);
		return deletedUser;
	}

	async updateUser(
		userId: string,
		updateBody: UpdateQuery<User>
	): Promise<User | null> {
		const updatedUser = await userSchema
			.findByIdAndUpdate(userId, updateBody, {
				new: true,
				runValidators: true,
			})
			.select({ __v: false });
		return updatedUser;
	}

	async findUserByCPF(cpf: string): Promise<User | null> {
		const user = await userSchema.findOne({ cpf: cpf });
		return user;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = await userSchema.findOne({ email });
		return user;
	}
}

const userRepository: IUserRepository = new MongoUserRepository();
export { userRepository };
