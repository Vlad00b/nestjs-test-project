import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { EditItemDto } from './dto/edit-item.dto';
import { ApiPaginationDto } from '../shared/dto/api-pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemStatistic } from './entities/item-statistic.entity';

@Injectable()
export class ItemsService {
	constructor(
		@InjectRepository(Item) private itemRepository: Repository<Item>,
		@InjectRepository(ItemStatistic) private itemStatisticRepository: Repository<ItemStatistic>,
	) {
	}

	public async getItems(page: number = 1, limit: number = 4): Promise<ApiPaginationDto<Item[]>> {
		const skip = Math.max(0, page - 1) * limit;
		const [items, total] = await this.itemRepository.findAndCount({
			skip,
			take: limit,
			order: {createdAt: 'DESC'}
		})
		return new ApiPaginationDto<Item[]>(total, Math.max(1, page), items);
	}

	public async create(data: CreateItemDto): Promise<void> {
		await this.itemRepository.save(data);
	}

	public async edit(id: string, data: EditItemDto): Promise<Item> {
		await this.itemRepository.update(id, data);
		return this.itemRepository.findOneBy({id});
	}

	public async remove(id: string): Promise<void> {
		await this.itemRepository.delete(id);
	}

	public async getStatistic(page: number = 1, limit: number = 3): Promise<ApiPaginationDto<ItemStatistic[]>> {
		const skip = Math.max(0, page - 1) * limit;
		const [statistic, count] = await this.itemStatisticRepository.findAndCount({skip, take: limit});
		return new ApiPaginationDto<ItemStatistic[]>(count, Math.max(1, page), statistic);
	}
}
