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

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDTO) {
		try {
			const hashedPassword = await bcrypt.hash(
				createUserDto.password,
				10
			);
			const user = this.usersRepository.create({
				...createUserDto,
				password: hashedPassword,
			});
			await this.usersRepository.save(user);
			const { password: _, ...userWithoutPassword } = user;
			return userWithoutPassword;
		} catch {
			// PostgreSQL unique violation code
			throw new ConflictException("Email already exists");
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
}
