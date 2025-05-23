/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User> // 1.
	) {}
	async create(userDTO: CreateUserDTO) {
		const salt = await bcrypt.genSalt(); // 2.
		userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
		const user = await this.userRepository.save(userDTO); // 4.
		const { password: _, ...userWithoutPassword } = user; // 5.
		return userWithoutPassword;
	}
}
