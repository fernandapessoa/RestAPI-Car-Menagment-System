import { IUserRepository } from './IUserRepository';
import { userRepository } from './userRepository';
import { /*createToken,*/ hashPass } from '../../security/security';
import { User } from './IUser';
import axios from 'axios';
import { isValidCpf } from '../../utils/isValidCpf';

export class UserService {
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async registerUser(userData: User) {
		userData.password = await hashPass(userData.password);
		userData.birth = new Date(userData.birth);

		const validCpf = isValidCpf(userData.cpf);
		if (!validCpf) {
			throw new Error('Invalid CPF');
		}

		await axios
			.get(`https://viacep.com.br/ws/${userData.cep}/json`)
			.then((res) => {
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

		//const token = createToken(createdUser._id);
		//return token;
		return {};
	}

	async getUser(userId: string) {
		const user = await this.userRepository.getUser(userId);

		if (!user) throw new Error('User not found');

		return user;
	}

	async deleteUser(userId: string) {
		const user = await this.userRepository.deleteUser(userId);
		if (!user) throw new Error('User not found');
		//await this.eventRepository.deleteAllUserEvents(userId);

		return user;
	}

	async updateUser(userId: string, updateParams: Partial<User>) {
		if (updateParams.password) {
			updateParams.password = await hashPass(updateParams.password);
		}
		const user = await this.userRepository.updateUser(userId, updateParams);

		if (!user) throw new Error('User not found');

		return user;
	}

	// async findUserByEmail(email: string) {
	// 	return null;
	// }
}

const userService = new UserService(userRepository);
export { userService };
