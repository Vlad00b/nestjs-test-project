import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { CONSTANTS } from '../../shared/constants/main.constants';

@Entity({name: 'users'})
export class User extends BaseEntity {
	@ApiProperty({required: true})
	@Column({unique: true, nullable: false})
	public username: string;

	@Column({select: false, nullable: false})
	@MinLength(CONSTANTS.minPasswordLength)
	public password: string;
}
