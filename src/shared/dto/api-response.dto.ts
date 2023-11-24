import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
	@ApiProperty()
	public statusCode: HttpStatus;

	@ApiProperty()
	public success: boolean = true;

	@ApiProperty({required: false})
	public message?: string;

	@ApiProperty({required: false, nullable: true})
	public data?: T;

	constructor(code: number, response?: T, message?: string) {
		this.statusCode = code;
		if (message) {
			this.message = message;
		}
		if (response) {
			this.data = response;
		}
	}
}
