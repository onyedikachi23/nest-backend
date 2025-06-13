/** @format */

import { ConfigModule, ConfigService } from "@nestjs/config";
import {
	TypeOrmModuleAsyncOptions,
	TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (
		configService: ConfigService
	): Promise<TypeOrmModuleOptions> => {
		const config = {
			type: "postgres",
			host: configService.get<string>("DB_HOST"),
			port: configService.get<number>("DB_PORT"),
			username: "postgres",
			// configService.get<string>("USERNAME"),
			database: configService.get<string>("DB_NAME"),
			password: configService.get<string>("PASSWORD"),
			entities: ["dist/**/*.entity.js"],
			synchronize: false,
			migrations: ["dist/db/migrations/*.js"],
		} as TypeOrmModuleOptions;

		return config;
	},
};

// export const dataSourceOptions: DataSourceOptions = {
// 	type: "postgres",
// 	host: process.env.DB_HOST,
// 	port: (() => {
// 		const port = process.env.DB_PORT as unknown as number;
// 		if (typeof port !== "string") {
// 			throw new Error("Invalid database port from env: " + typeof port);
// 		}
// 		return parseInt(port);
// 	})(),
// 	username: process.env.USERNAME,
// 	database: process.env.DB_NAME,
// 	password: process.env.DB_PASSWORD,
// 	entities: ["dist/**/*.entity.js"], //1
// 	synchronize: false, // 2
// 	migrations: ["dist/db/migrations/*.js"], // 3
// };
// const dataSource = new DataSource(dataSourceOptions); //4
// export default dataSource;
