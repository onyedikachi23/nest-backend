/** @format */

import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { authConstants } from "./auth.constansts";
import { JwtStrategy } from "./jwt-strategy";
import { ArtistsModule } from "src/artists/artists.module";
import { ApiKeyStrategy } from "./api-key-strategy";

@Module({
	providers: [AuthService, JwtStrategy, ApiKeyStrategy],
	controllers: [AuthController],
	exports: [AuthService, JwtStrategy],
	imports: [
		UsersModule,
		ArtistsModule,
		JwtModule.register({
			secret: authConstants.secret,
			signOptions: {
				expiresIn: "1d",
			},
		}),
	],
})
export class AuthModule {}
