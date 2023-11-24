import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
	@ApiProperty({required: true, nullable: false})
	@IsNotEmpty({})
	@IsString()
	public readonly username: string;

	@ApiProperty({required: true, nullable: false, minLength: 4})
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	public password: string;
}
