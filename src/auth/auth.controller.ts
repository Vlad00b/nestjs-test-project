import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiResponseDto } from '../shared/dto/api-response.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Post('/sign-up')
	@ApiBody({required: true, type: SignUpDto})
	@ApiOkResponse({status: HttpStatus.CREATED, type: AuthResponseDto})
	public async signUp(@Body() data: SignUpDto): Promise<ApiResponseDto<AuthResponseDto>> {
		const userData = await this.authService.signUp(data);
		return new ApiResponseDto<AuthResponseDto>(HttpStatus.CREATED, userData);
	}

	@Post('/sign-in')
	@HttpCode(HttpStatus.OK)
	@ApiBody({required: true, type: SignInDto})
	@ApiOkResponse({status: HttpStatus.OK, type: AuthResponseDto})
	public async signIn(@Body() data: SignInDto): Promise<ApiResponseDto<AuthResponseDto>> {
		const userData = await this.authService.signIn(data);
		return new ApiResponseDto<AuthResponseDto>(HttpStatus.OK, userData);
	}
}
