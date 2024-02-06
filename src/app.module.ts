import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_ROUTES } from './app.routes';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env.dev',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: configService.get<any>('DB_TYPE'),
				host: configService.get<string>('DB_HOST'),
				port: Number(configService.get<string>('DB_PORT')),
				username: configService.get<string>('DB_USER'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				synchronize: true,
				entities: [__dirname + '/**/*.entity.{js, ts}']
			})
		}),
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET_KEY'),
				signOptions: {expiresIn: '1d'},
			})
		}),
		RouterModule.register(APP_ROUTES),
		ItemsModule,
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}
