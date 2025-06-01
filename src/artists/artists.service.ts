/** @format */

import { Injectable } from "@nestjs/common";
import { Artist } from "./artist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PayloadType } from "src/auth/payload.type";

@Injectable()
export class ArtistsService {
	constructor(
		@InjectRepository(Artist)
		private artistRepo: Repository<Artist>
	) {}

	async create(userId: PayloadType["userId"]) {
		const artist = this.artistRepo.create({
			user: { id: userId },
		});
		return await this.artistRepo.save(artist);
	}

	findArtist(userId: number) {
		return this.artistRepo.findOneBy({ user: { id: userId } });
	}
}
