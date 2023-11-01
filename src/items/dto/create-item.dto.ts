import { IsNotEmpty, IsString } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    public readonly name: string;

    @IsNotEmpty()
    @IsString()
    public readonly type: string;
}
