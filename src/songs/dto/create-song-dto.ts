/** @format */

import {
	IsArray,
	IsDateString,
	IsMilitaryTime,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class CreateSongDTO {
	@IsNotEmpty()
	@IsString()
	readonly title: string;

	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	readonly artists: string[];

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
