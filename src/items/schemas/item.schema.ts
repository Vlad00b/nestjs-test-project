import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ItemDocument = HydratedDocument<Item>;

@Schema({
	collection: 'items',
	timestamps: {createdAt: true, updatedAt: false},
})
export class Item {
	@ApiProperty()
	@Prop({
		required: true,
		trim: true,
	})
	public name: string;

	@ApiProperty()
	@Prop({
		required: true,
		trim: true,
	})
	public type: string;

	@ApiProperty()
	@Prop()
	public createdAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
