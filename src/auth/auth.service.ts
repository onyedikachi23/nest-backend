/** @format */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ArtistsService } from "src/artists/artists.service";
import { PayloadType } from "./payload.type";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private artistsService: ArtistsService
	) {}

	async login(loginDTO: LoginDTO) {
		const user = await this.usersService.findOne(loginDTO); // 1.
		if (!user) {
			throw new UnauthorizedException("User not found");
		}

		const passwordMatched = await bcrypt.compare(
			loginDTO.password,
			user.password
		);

		if (!passwordMatched) {
			throw new UnauthorizedException("Password does not match");
		}

		const payload: PayloadType = { email: user.email, userId: user.id };
		const artist = await this.artistsService.findArtist(user.id); // 2
		if (artist) {
			// 3
			payload.artistId = artist.id;
		}

		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
