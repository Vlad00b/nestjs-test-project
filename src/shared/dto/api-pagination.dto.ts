import { ApiProperty } from '@nestjs/swagger';

export class ApiPaginationDto<T> {
	@ApiProperty()
	public total: number;

	@ApiProperty()
	public page: number;

	@ApiProperty()
	public data: T;

	@ApiProperty({required: false, nullable: true})
	public prevPage?: number;

	@ApiProperty({required: false, nullable: true})
	public nextPage?: number;

	constructor(total: number, page: number, data: T, prevPage?: number, nextPage?: number) {
		this.total = total;
		this.page = page;
		this.data = data;
		if (prevPage) {
			this.prevPage = prevPage;
		}
		if (nextPage) {
			this.nextPage = nextPage;
		}
	}
}
