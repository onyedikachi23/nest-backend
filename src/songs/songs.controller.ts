/** @format */

import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	Scope,
} from "@nestjs/common";
import { Connection } from "src/common/constants/connection";
import { CreateSongDTO } from "./dto/create-song-dto";
import { UpdateSongDto } from "./dto/update-song";
import { Song } from "./songs.entity";
import { SongsService } from "./songs.service";

@Controller({
	path: "songs",
	scope: Scope.REQUEST,
})
export class SongsController {
	constructor(
		private songsService: SongsService,
		@Inject("CONNECTION")
		private connection: Connection
	) {
		console.log(
			"This is connection string " + JSON.stringify(this.connection)
		);
	}

	@Post()
	create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
		return this.songsService.create(createSongDTO);
	}

	@Get()
	findAll(
		@Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query("limit", new DefaultValuePipe(10), ParseIntPipe)
		limit: number = 10
	) {
		limit = limit > 100 ? 100 : limit;
		return this.songsService.paginate({
			page,
			limit,
		});
	}

	@Get(":id")
	findOne(
		@Param(
			"id",
			new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
		)
		id: number
	) {
		return this.songsService.findOne(id);
	}

	@Put(":id")
	update(
		@Param("id", ParseIntPipe)
		id: number,
		@Body() updateSongDTO: UpdateSongDto
	) {
		return this.songsService.update(id, updateSongDTO);
	}

	@Delete("reset")
	reset() {
		try {
			return this.songsService.reset();
		} catch (e) {
			throw new HttpException(
				"Failed to reset the songs table",
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ cause: e }
			);
		}
	}

	@Delete(":id")
	delete(
		@Param("id", ParseIntPipe)
		id: number
	) {
		return this.songsService.remove(id);
	}
}
