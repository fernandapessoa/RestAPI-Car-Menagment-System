import { IUserRepository } from './IUserRepository';
import { userRepository } from './userRepository';
import { createToken, hashPass, comparePass } from '../../security/security';
import { User } from './IUser';
import axios from 'axios';
import { AppError } from '../../errors/AppError';
import { convertDate } from '../../utils/convertDate';

export class UserService {
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async registerUser(userData: User) {
		userData.password = await hashPass(userData.password);
		userData.birth = new Date(convertDate(userData.birth));

		const baseUrl = 'https://viacep.com.br/ws';
		const { cep } = userData;

		await axios.get(`${baseUrl}/${cep}/json`).then((res) => {
			const { bairro, complemento, uf, localidade, logradouro } = res.data;
			userData.patio = logradouro;
			userData.complement = complemento;
			userData.neighborhood = bairro;
			userData.locality = localidade;
			userData.uf = uf;
		});

		const createdUser = await this.userRepository.registerUser(userData);

		if (!createdUser) {
			throw new Error('User already exists');
		}

		const token = createToken(createdUser._id);
		return token;
	}

	async getAllUsers() {
		const users = await this.userRepository.getAllUsers();

		if (!users) throw new Error('User not found');

		return users;
	}

	async getUser(userId: string) {
		const user = await this.userRepository.getUser(userId);

		if (!user) throw new Error('User not found');

		return user;
	}

	async deleteUser(userId: string) {
		const user = await this.userRepository.deleteUser(userId);
		if (!user) throw new Error('User not found');
		//deletar as reservas dele
		//await this.eventRepository.deleteAllUserEvents(userId);

		return user;
	}

	async updateUser(userId: string, updateParams: Partial<User>) {
		if (updateParams.password) {
			updateParams.password = await hashPass(updateParams.password);
		}

		if (updateParams.cep) {
			const baseUrl = 'https://viacep.com.br/ws';
			const { cep } = updateParams;

			await axios.get(`${baseUrl}/${cep}/json`).then((res) => {
				const { bairro, complemento, uf, localidade, logradouro } = res.data;
				updateParams.patio = logradouro;
				updateParams.complement = complemento;
				updateParams.neighborhood = bairro;
				updateParams.locality = localidade;
				updateParams.uf = uf;
			});
		}

		const user = await this.userRepository.updateUser(userId, updateParams);

		if (!user) throw new Error('User not found');

		return user;
	}

	async authenticateUser(email: string, password: string) {
		const user = await this.userRepository.findUserByEmail(email);
		if (!user) throw new AppError(401, 'Invalid email or password');

		const validPass = await comparePass(password, user.password);
		if (!validPass) throw new AppError(401, 'Invalid email or password');

		const token = createToken(user._id);
		return token;
	}
}

const userService = new UserService(userRepository);
export { userService };
