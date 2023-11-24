import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { snapshot: true });
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new ErrorInterceptor())

	const config = new DocumentBuilder()
		.setTitle('Test project')
		.setTitle('Test project for getting items')
		.setVersion('1.0')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}

bootstrap();
