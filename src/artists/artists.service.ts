/** @format */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PayloadType } from "src/auth/types";
import { Repository } from "typeorm";
import { Artist } from "./artist.entity";

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
