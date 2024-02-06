import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemStatistic } from './entities/item-statistic.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Item, ItemStatistic])],
	providers: [ItemsService],
	controllers: [ItemsController],
})
export class ItemsModule {
}
