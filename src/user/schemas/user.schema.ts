import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
	collection: 'users',
	timestamps: {createdAt: true, updatedAt: false},
})
export class User {
	@ApiProperty({required: true})
	@Prop({
		required: true,
		trim: true,
		index: true,
		unique: true,
	})
	public username: string;

	@ApiProperty({required: false})
	@Prop({
		required: true,
		trim: true,
	})
	public password: string;

	@ApiProperty({required: true})
	@Prop()
	public createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
