/** @format */

import { Injectable } from "@nestjs/common";

@Injectable()
export class SongsService {
	// local db array
	private readonly songs: string[] = [];

	create(song) {
		// Save song to db
		this.songs.push(song);
		return this.songs;
	}

	findAll() {
		// fetch the songs from db
		throw new Error("Error in DB while fetching record");

		return this.songs;
	}
}
