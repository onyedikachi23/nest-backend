/** @format */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmAsyncConfig } from "db/data-source";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArtistsModule } from "./artists/artists.module";
import { AuthModule } from "./auth/auth.module";
import { LoggerMiddleware } from "./common/middleware/logger/logger.middleware";
import configurations from "./config/configurations";
import { SeedModule } from "./seed/seed.module";
import { SongsController } from "./songs/songs.controller";
import { SongsModule } from "./songs/songs.module";
import { UsersModule } from "./users/users.module";
import { validate } from "env.validation";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env.development", ".env.production"],
			isGlobal: true,
			// load: [configurations],
			validate,
		}),
		TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
		SongsModule,
		AuthModule,
		UsersModule,
		ArtistsModule,
		SeedModule,
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
