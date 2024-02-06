import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
	@ApiProperty({required: true})
	public user: User;

	@ApiProperty({required: true})
	public token: string;

	constructor(token: string, user: User) {
		this.token = token;
		this.user = user;
	}

}
