/** @format */

import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from "src/auth/dto/login.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";
import * as uuid from "uuid";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDTO) {
		try {
			const user = new User();
			user.firstName = createUserDto.firstName;
			user.lastName = createUserDto.lastName;
			user.email = createUserDto.email;
			user.apiKey = uuid.v4();

			user.password = await bcrypt.hash(createUserDto.password, 10);

			const savedUser = await this.usersRepository.save(user);
			const { password: _, ...userWithoutPassword } = savedUser;
			return userWithoutPassword;
		} catch (err) {
			// PostgreSQL unique violation code
			throw new Error(err);
		}
	}

	async findOne(data: LoginDTO) {
		const user = await this.usersRepository.findOneBy({
			email: data.email,
		});
		if (!user) {
			throw new UnauthorizedException("Could not find user");
		}
		return user;
	}

	async findById(id: number) {
		return this.usersRepository.findOneBy({ id: id });
	}

	updateSecretKey(userId: number, secret: string) {
		return this.usersRepository.update(
			{ id: userId },
			{
				twoFASecret: secret,
				enable2FA: true,
			}
		);
	}

	disable2FA(userId: number) {
		return this.usersRepository.update(
			{ id: userId },
			{
				enable2FA: false,
				twoFASecret: null,
			}
		);
	}

	async findByApiKey(apiKey: string) {
		return this.usersRepository.findOneBy({ apiKey });
	}
}
