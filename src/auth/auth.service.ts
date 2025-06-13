/** @format */

import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { ArtistsService } from "src/artists/artists.service";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./dto/login.dto";
import { Enable2FAType, PayloadType } from "./types";
import * as speakeasy from "speakeasy";

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

		if (user.enable2FA && user.twoFASecret) {
			//1.
			// sends the validateToken request link
			// else otherwise sends the json web token in the response
			return {
				//2.
				validate2FA: "http://localhost:3000/auth/validate-2fa",
				message:
					"Please send the one-time password/token from your Google Authenticator App",
			};
		}
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}

	async enable2FA(userId: number): Promise<Enable2FAType> {
		const user = await this.usersService.findById(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}

		if (user.enable2FA && user.twoFASecret) {
			//2
			return { secret: user.twoFASecret };
		}
		const secret = speakeasy.generateSecret(); //3
		console.log(secret);
		user.twoFASecret = secret.base32; //4
		await this.usersService.updateSecretKey(user.id, user.twoFASecret); //5
		return { secret: user.twoFASecret }; //6
	}

	async validate2FAToken(
		userId: number,
		token: string
	): Promise<{ verified: boolean }> {
		try {
			// find the user on the based on id
			const user = await this.usersService.findById(userId);

			if (!user) {
				throw new UnauthorizedException("User not found.");
			}

			if (!user.twoFASecret) {
				throw new BadRequestException(
					"User has no 2FA secret to validate"
				);
			}

			// extract his 2FA secret
			// verify the secret with a token by calling the speakeasy verify method
			const verified = speakeasy.totp.verify({
				secret: user.twoFASecret,
				token: token,
				encoding: "base32",
			});
			// if validated then sends the json web token in the response
			if (verified) {
				return { verified: true };
			} else {
				return { verified: false };
			}
		} catch {
			throw new UnauthorizedException("Error verifying token");
		}
	}

	async disable2FA(userId: number) {
		return this.usersService.disable2FA(userId);
	}

	async validateUserByApiKey(apiKey: string) {
		return this.usersService.findByApiKey(apiKey);
	}
}
