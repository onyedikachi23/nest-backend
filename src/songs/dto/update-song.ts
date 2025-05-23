/** @format */

import {
	IsArray,
	IsDateString,
	IsMilitaryTime,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { Artist } from "src/artists/artist.entity";
export class UpdateSongDto {
	@IsString() @IsOptional() readonly title?: string;

	@IsOptional()
	@IsArray()
	@IsNumber(
		{},
		{
			each: true,
		}
	)
	readonly artists: Artist[];

	@IsDateString() @IsOptional() readonly releasedDate?: Date;

	@IsMilitaryTime() @IsOptional() readonly duration?: Date;

	@IsString() @IsOptional() readonly lyrics?: string;
}
