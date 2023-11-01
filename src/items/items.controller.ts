import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Item } from "./schemas/item.schema";
import { ItemsService } from "./items.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { ApiResponseDto } from "../shared/dto/api-response.dto";
import { ApiPaginationDto } from "../shared/dto/api-pagination.dto";
import { StatisticItemDto } from "./dto/statistic-item.dto";

@Controller()
export class ItemsController {
    constructor(private itemsService: ItemsService) {
    }

    @Get()
    async getItems(
        @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
        @Query("page", new ParseIntPipe({ optional: true })) page?: number
    ): Promise<ApiResponseDto<ApiPaginationDto<Item[]>>> {
        const items = await this.itemsService.getItems(page, limit);
        return new ApiResponseDto<typeof items>(HttpStatus.OK, "Success", items);
    }

    @Post()
    async create(@Body() data: CreateItemDto): Promise<ApiResponseDto<undefined>> {
        await this.itemsService.create(data);
        return new ApiResponseDto(HttpStatus.CREATED, "Success");
    }

    @Put(":id")
    async edit(@Body() data: CreateItemDto, @Param("id") id: string): Promise<ApiResponseDto<Item>> {
        const editedItem = await this.itemsService.edit(id, data);
        return new ApiResponseDto<Item>(HttpStatus.OK, "Success", editedItem);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<ApiResponseDto<undefined>> {
        await this.itemsService.remove(id);
        return new ApiResponseDto(HttpStatus.OK, "Success");
    }

    @Get('/statistic')
    async getStatistic(
        @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
        @Query("page", new ParseIntPipe({ optional: true })) page?: number
    ): Promise<ApiResponseDto<ApiPaginationDto<StatisticItemDto[]>>> {
        const stat = await this.itemsService.getStatistic(page, limit);
        return new ApiResponseDto<typeof stat>(HttpStatus.OK, 'Success', stat);
    }
}
