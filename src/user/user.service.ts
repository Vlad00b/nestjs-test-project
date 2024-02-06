import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { ERROR_MESSAGES } from '../shared/constants/message.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) {
	}

	public async createUser(data: SignUpDto): Promise<User> {
		try {
			const user = await this.userRepository.save(data);
			const {password, ...values} = user;
			return values as User;
		} catch (err) {
			let errorMessage = ERROR_MESSAGES.somethingWentWrong;
			if (typeof err.message === 'string') {
				if (err.message.includes('duplicate')) {
					errorMessage = ERROR_MESSAGES.usernameIsUsed;
				} else {
					errorMessage = err.message;
				}
			}
			throw new BadRequestException(errorMessage);
		}
	}

	public async findUserByUsername(username: string) {
		try {
			return await this.userRepository.findOneBy({username});
		} catch (err) {
			return null;
		}
	}
}
