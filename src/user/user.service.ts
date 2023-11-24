import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { ERROR_MESSAGES } from '../shared/constants/message.constants';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {
	}

	public async createUser(data: SignUpDto): Promise<User> {
		try {
			const user = new this.userModel(data);
			const userDoc = await user.save();
			return userDoc.toObject({
				transform: (doc, ret) => {
					delete ret.password;
					return ret;
				},
			});
		} catch (err) {
			console.log(err);
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
			return await this.userModel.findOne({username}).exec();
		} catch (err) {
			return null;
		}
	}
}
