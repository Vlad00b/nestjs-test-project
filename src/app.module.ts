import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_ROUTES } from './app.routes';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env.dev',
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({uri: configService.get<string>('MONGO_DB_URL')})
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
