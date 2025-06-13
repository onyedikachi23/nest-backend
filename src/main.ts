/** @format */

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	/**
	 * You can enable seeding here.
	 */
	// const seedService = app.get(SeedService);
	// await seedService.seed();

	const configService = app.get(ConfigService);

	await app.listen(configService.get<number>("port") ?? 3001);
}
void bootstrap();
