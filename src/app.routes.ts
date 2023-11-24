import { Routes } from '@nestjs/core';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

export const APP_ROUTES: Routes = [
	{
		path: 'api',
		children: [
			{
				path: 'auth',
				module: AuthModule,
			},
			{
				path: 'items',
				module: ItemsModule,
			},
		],
	},
];
