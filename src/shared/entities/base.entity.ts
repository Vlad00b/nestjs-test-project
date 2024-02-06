import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
	@ApiProperty({required: true})
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ApiProperty({required: true})
	@CreateDateColumn()
	public createdAt: Date;

	@ApiProperty({required: true})
	@UpdateDateColumn()
	public updatedAt: Date;
}
