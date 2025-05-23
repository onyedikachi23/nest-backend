/** @format */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Artist } from "./artists/artist.entity";
import { AuthModule } from "./auth/auth.module";
import { LoggerMiddleware } from "./common/middleware/logger/logger.middleware";
import { SongsController } from "./songs/songs.controller";
import { Song } from "./songs/songs.entity";
import { SongsModule } from "./songs/songs.module";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			database: "spotify-clone",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "343412",
			entities: [Song, Artist, User],
			synchronize: true,
		}),
		SongsModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	constructor(private dataSource: DataSource) {}
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes(SongsController);
	}
}
