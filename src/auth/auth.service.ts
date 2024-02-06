import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../shared/constants/message.constants';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {
	}

	public async signUp(data: SignUpDto): Promise<AuthResponseDto> {
		data.password = await bcrypt.hash(data.password, 10);
		const user = await this.userService.createUser(data);
		const token = await this.jwtService.signAsync({id: user.id, username: user.username});
		return new AuthResponseDto(token, user);
	}

	public async signIn(data: SignInDto): Promise<AuthResponseDto> {
		const user = await this.userService.findUserByUsername(data.username);
		if (!user) {
			throw new NotFoundException(ERROR_MESSAGES.userNotFound);
		}
		let isSame: boolean;
		try {
			isSame = await bcrypt.compare(data.password, user.password);
		} catch {
			isSame = false;
		}
		if (!isSame) {
			throw new UnauthorizedException(ERROR_MESSAGES.invalidCredential);
		}
		const token = await this.jwtService.signAsync({id: user.id, username: user.username});
		return new AuthResponseDto(token, user);
	}
}
