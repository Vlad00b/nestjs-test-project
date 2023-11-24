import { HttpException } from '@nestjs/common';

export class ApiExceptionDto extends HttpException{
	constructor(statusCode: number, message: string) {
		super({statusCode, success: false, message}, statusCode);
	}
}
