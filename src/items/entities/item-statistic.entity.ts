import { Column, DataSource, ViewEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from './item.entity';

@ViewEntity({
	name: 'item_statistic',
	expression: (dataSource: DataSource) => dataSource
		.createQueryBuilder()
		.select(['item.type as type', 'COUNT(item.type) as count'])
		.from(Item, 'item')
		.groupBy('type')
		.orderBy('type')
})
export class ItemStatistic {
	@ApiProperty({required: true})
	@Column()
	public type: string;

	@ApiProperty({required: true})
	@Column()
	public count: number;
}
