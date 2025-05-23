/** @format */

import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateSongDTO } from "./dto/create-song-dto";
import { UpdateSongDto } from "./dto/update-song";
import { Song } from "./songs.entity";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { Artist } from "src/artists/artist.entity";

@Injectable({
	scope: Scope.TRANSIENT,
})
export class SongsService {
	constructor(
		@InjectRepository(Song)
		private songsRepository: Repository<Song>,
		@InjectRepository(Artist)
		private artistsRepository: Repository<Artist>
	) {}

	async create(songDTO: CreateSongDTO) {
		const song = new Song();
		song.title = songDTO.title;
		song.artists = songDTO.artists;
		song.duration = songDTO.duration;
		song.lyrics = songDTO.lyrics;
		song.releasedDate = songDTO.releasedDate;

		const artists = await this.artistsRepository.findBy({
			id: In(songDTO.artists),
		});

		song.artists = artists;

		return this.songsRepository.save(song);
	}

	findAll(): Promise<Song[]> {
		return this.songsRepository.find();
	}

	findOne(id: number) {
		return this.songsRepository.findOneBy({ id });
	}

	remove(id: number) {
		return this.songsRepository.delete(id);
	}

	update(id: number, record: UpdateSongDto) {
		return this.songsRepository.update(id, record);
	}

	reset() {
		return this.songsRepository.query(
			"TRUNCATE TABLE songs RESTART IDENTITY CASCADE;"
		);
	}

	paginate(options: IPaginationOptions) {
		const queryBuilder = this.songsRepository.createQueryBuilder("c");
		queryBuilder.orderBy("c.releasedDate", "DESC");

		return paginate(queryBuilder, options);
	}
}
