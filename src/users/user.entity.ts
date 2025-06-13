/** @format */

import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("users")
export class User {
	@PrimaryGeneratedColumn() id: number;

	@Column() firstName: string;

	@Column() lastName: string;

	@Column({ unique: true }) email: string;

	@Exclude()
	@Column()
	password: string;

	@Column({ nullable: true, type: "text" })
	twoFASecret: string | null;

	@Column({ default: false, type: "boolean" })
	enable2FA: boolean;

	@Column()
	apiKey: string;
}
