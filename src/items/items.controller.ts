import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiResponseDto } from '../shared/dto/api-response.dto';
import { ApiPaginationDto } from '../shared/dto/api-pagination.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EditItemDto } from './dto/edit-item.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { Item } from './entities/item.entity';
import { ItemStatistic } from './entities/item-statistic.entity';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ItemsController {
	constructor(private itemsService: ItemsService) {
	}

	@Get()
	@ApiQuery({name: 'limit', required: false})
	@ApiQuery({name: 'page', required: false})
	@ApiOkResponse({status: HttpStatus.OK, type: Item, isArray: true})
	public async getItems(
		@Query('limit', new ParseIntPipe({optional: true})) limit?: number,
		@Query('page', new ParseIntPipe({optional: true})) page?: number,
	): Promise<ApiResponseDto<ApiPaginationDto<Item[]>>> {
		const items = await this.itemsService.getItems(page, limit);
		return new ApiResponseDto<typeof items>(HttpStatus.OK, items);
	}

	@Post()
	@ApiBody({required: true, type: CreateItemDto})
	@ApiOkResponse({status: HttpStatus.CREATED, type: ApiResponseDto})
	public async create(@Body() data: CreateItemDto): Promise<ApiResponseDto<undefined>> {
		await this.itemsService.create(data);
		return new ApiResponseDto(HttpStatus.CREATED);
	}

	@Put(':id')
	@ApiParam({name: 'id', type: String, required: true})
	@ApiBody({required: true, type: EditItemDto})
	@ApiOkResponse({status: HttpStatus.OK, type: Item})
	public async edit(@Body() data: EditItemDto, @Param('id') id: string): Promise<ApiResponseDto<Item>> {
		const editedItem = await this.itemsService.edit(id, data);
		return new ApiResponseDto<Item>(HttpStatus.OK, editedItem);
	}

	@Delete(':id')
	@ApiParam({name: 'id', type: String, required: true})
	@ApiOkResponse({status: HttpStatus.OK, type: ApiResponseDto})
	public async remove(@Param('id') id: string): Promise<ApiResponseDto<undefined>> {
		await this.itemsService.remove(id);
		return new ApiResponseDto(HttpStatus.OK);
	}

	@Get('/statistic')
	@ApiParam({name: 'limit', required: false})
	@ApiParam({name: 'page', required: false})
	@ApiOkResponse({status: HttpStatus.OK, type: ItemStatistic, isArray: true})
	public async getStatistic(
		@Query('limit', new ParseIntPipe({optional: true})) limit?: number,
		@Query('page', new ParseIntPipe({optional: true})) page?: number,
	): Promise<ApiResponseDto<ApiPaginationDto<ItemStatistic[]>>> {
		const stat = await this.itemsService.getStatistic(page, limit);
		return new ApiResponseDto<typeof stat>(HttpStatus.OK, stat);
	}
}
