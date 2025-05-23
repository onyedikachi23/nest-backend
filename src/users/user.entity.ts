/** @format */

import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("users")
export class User {
	@PrimaryGeneratedColumn() id: number;

	@Column() firstName: string;

	@Column() lastName: string;

	@Column({ unique: true }) email: string;

	@Exclude()
	@Column()
	password: string;
}

import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDTO) {
		try {
			const user = this.usersRepository.create(createUserDto);
			return await this.usersRepository.save(user);
		} catch {
			// PostgreSQL unique violation code
			throw new ConflictException("Email already exists");
		}
	}
}
