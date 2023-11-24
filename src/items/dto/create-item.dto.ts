import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
	@ApiProperty({nullable: false})
	@IsNotEmpty()
	@IsString()
	public readonly name: string;

	@ApiProperty({nullable: false})
	@IsNotEmpty()
	@IsString()
	public readonly type: string;
}
