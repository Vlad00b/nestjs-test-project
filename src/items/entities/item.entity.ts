import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'items'})
export class Item extends BaseEntity {
	@ApiProperty({required: true})
	@Column({nullable: false})
	public name: string;

	@ApiProperty({required: true})
	@Column({nullable: false})
	public type: string;
}
