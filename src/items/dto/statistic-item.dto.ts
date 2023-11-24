import { ApiProperty } from '@nestjs/swagger';

export class StatisticItemDto {
	@ApiProperty()
	public type: string;

	@ApiProperty()
	public count: number;

	constructor(type: string, count: number) {
		this.type = type;
		this.count = count;
	}
}
