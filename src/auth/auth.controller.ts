/** @format */

import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {
	constructor(private userService: UsersService) {}
	@Post("signup")
	signup(
		@Body()
		userDTO: CreateUserDTO
	) {
		return this.userService.create(userDTO);
	}
}
