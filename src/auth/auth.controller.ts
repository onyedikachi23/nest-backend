/** @format */

import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ArtistsService } from "src/artists/artists.service";

@Controller("auth")
export class AuthController {
	constructor(
		private userService: UsersService,
		private authService: AuthService,
		private artistsService: ArtistsService
	) {}
	@Post("signup")
	signup(
		@Body()
		userDTO: CreateUserDTO
	) {
		const user = this.userService.create(userDTO);
		await this.artistsService;
	}

	@Post("login")
	login(
		@Body()
		loginDTO: LoginDTO
	) {
		return this.authService.login(loginDTO);
	}
}
