/** @format */

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song-dto";

@Controller("songs")
export class SongsController {
	constructor(private songsService: SongsService) {}

	@Post()
	create(@Body() createSongDTO: CreateSongDTO) {
		return this.songsService.create(createSongDTO);
	}

	@Get()
	findAll() {
		try {
			return this.songsService.findAll();
		} catch (e) {
			throw new HttpException(
				"Server error",
				HttpStatus.INTERNAL_SERVER_ERROR,
				{
					cause: e,
				}
			);
		}
	}

	@Get(":id")
	findOne(
		@Param(
			"id",
			new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
		)
		id: number
	) {
		return `Fetch song based on id: ${typeof id}`;
	}

	@Put(":id")
	update() {
		return "update song based on id";
	}

	@Delete(":id")
	delete() {
		return "delete song based on id";
	}
}
