/** @format */

import {
	IsArray,
	IsDateString,
	IsMilitaryTime,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { Artist } from "src/artists/artist.entity";

export class CreateSongDTO {
	@IsNotEmpty()
	@IsString()
	readonly title: string;

	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true })
	readonly artists: Artist[];

	@IsNotEmpty()
	@IsDateString()
	readonly releasedDate: Date;

	@IsNotEmpty()
	@IsMilitaryTime()
	readonly duration: Date;

	@IsOptional()
	@IsString()
	readonly lyrics: string;
}
