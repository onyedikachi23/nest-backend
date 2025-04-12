/** @format */

import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSongDTO } from "./dto/create-song-dto";
import { UpdateSongDto } from "./dto/update-song";
import { Song } from "./songs.entity";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";

@Injectable({
	scope: Scope.TRANSIENT,
})
export class SongsService {
	constructor(
		@InjectRepository(Song)
		private songsRespository: Repository<Song>
	) {}

	create(songDTO: CreateSongDTO) {
		const song = new Song();
		song.title = songDTO.title;
		song.artists = songDTO.artists;
		song.duration = songDTO.duration;
		song.lyrics = songDTO.lyrics;
		song.releasedDate = songDTO.releasedDate;

		return this.songsRespository.save(song);
	}

	findAll(): Promise<Song[]> {
		return this.songsRespository.find();
	}

	findOne(id: number) {
		return this.songsRespository.findOneBy({ id });
	}

	remove(id: number) {
		return this.songsRespository.delete(id);
	}

	update(id: number, record: UpdateSongDto) {
		return this.songsRespository.update(id, record);
	}

	reset() {
		return this.songsRespository.query(
			"TRUNCATE TABLE songs RESTART IDENTITY CASCADE;"
		);
	}

	paginate(options: IPaginationOptions) {
		const queryBuilder = this.songsRespository.createQueryBuilder("c");
		queryBuilder.orderBy("c.releasedDate", "DESC");

		return paginate(queryBuilder, options);
	}
}
