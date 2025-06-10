/** @format */

import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PayloadType } from "./types";

Injectable();
export class ArtistJwtGuard extends AuthGuard("jwt") {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest<TUser extends PayloadType>(err: any, user: TUser): TUser {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		console.log("user", user);

		if (user.artistId) {
			return user;
		}
		throw err || new UnauthorizedException();
	}
}
