import { Routes } from '@nestjs/core';
import { ItemsModule } from './items/items.module';

export const APP_ROUTES: Routes = [
    {
        path: 'api',
        children: [
            {
                path: 'items',
                module: ItemsModule
            }
        ]
    }
];
