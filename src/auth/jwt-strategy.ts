/** @format */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "./auth.constansts";
import { PayloadType } from "./types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1.
			ignoreExpiration: false, // 2.
			secretOrKey: authConstants.secret, // 3.
		});
	}

	async validate(payload: PayloadType) {
		return {
			userId: payload.userId,
			email: payload.email,
			artistId: payload.artistId,
		};
	}
}
