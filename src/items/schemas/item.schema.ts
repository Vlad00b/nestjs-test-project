import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ItemDocument = HydratedDocument<Item>;

@Schema({
    collection: 'items',
    timestamps: true
})
export class Item {
    @Prop({
        required: true,
        trim: true
    })
    public name: string;

    @Prop({
        required: true,
        trim: true
    })
    public type: string;

    @Prop()
    public createdAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
