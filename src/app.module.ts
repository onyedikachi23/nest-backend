/** @format */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./common/middleware/logger/logger.middleware";
import { SongsController } from "./songs/songs.controller";
import { SongsModule } from "./songs/songs.module";
import { DevConfigService } from "./common/providers/DevConfigService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Song } from "./songs/songs.entity";

const devConfig = {
	port: "3001",
};

const proConfig = {
	port: "3000",
};

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			database: "spotify-clone",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "343412",
			entities: [Song],
			synchronize: true,
		}),
		SongsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: DevConfigService,
			useClass: DevConfigService,
		},
		{
			provide: "CONFIG",
			useFactory: () =>
				process.env.NODE_ENV === "development" ? devConfig : proConfig,
		},
	],
})
export class AppModule implements NestModule {
	constructor(private dataSource: DataSource) {
		console.log("dbName", dataSource.driver.database);
	}
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes(SongsController);
	}
}
