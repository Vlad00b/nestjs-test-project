import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { Item, ItemDocument } from "./schemas/item.schema";
import { EditItemDto } from "./dto/edit-item.dto";
import { ApiPaginationDto } from "../shared/dto/api-pagination.dto";
import { StatisticItemDto } from "./dto/statistic-item.dto";

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {
    }

    public async getItems(page: number = 1, limit: number = 4): Promise<ApiPaginationDto<Item[]>> {
        const skip = Math.max(0, page - 1) * limit;
        const items = await this.itemModel
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.getItemsCount();
        return new ApiPaginationDto<Item[]>(total, Math.max(1, page), items);
    }

    public async create(data: CreateItemDto): Promise<Item> {
        const item = new this.itemModel(data);
        return item.save();
    }

    public async edit(id: string, data: EditItemDto): Promise<Item> {
        await this.itemModel.findByIdAndUpdate(id, data).exec();
        return this.itemModel.findById(id);
    }

    public async remove(id: string): Promise<Item> {
        return this.itemModel.findByIdAndDelete(id).exec();
    }

    public async getStatistic(page: number = 1, limit: number = 3): Promise<ApiPaginationDto<StatisticItemDto[]>> {
        const skip = Math.max(0, page - 1) * limit;
        const itemGroup = await this.itemModel
            .aggregate<{
                count: { total: number },
                items: [{ _id: string; count: number }]
            }>([
                {
                    $facet: {
                        count: [
                            {
                                $group: {
                                    _id: "$type",
                                    count: { $count: {} }
                                }
                            },
                            { $count: "total" }
                        ],
                        items: [
                            {
                                $group: {
                                    _id: "$type",
                                    count: { $count: {} }
                                }
                            },
                            {
                                $sort: { _id: 1 }
                            },
                            {
                                $skip: skip
                            },
                            {
                                $limit: limit
                            }
                        ]
                    }
                }
            ])
            .exec();
        return new ApiPaginationDto<StatisticItemDto[]>(
            itemGroup[0].count[0].total,
            Math.max(1, page),
            itemGroup[0].items.map((item) => new StatisticItemDto(item._id, item.count))
        );
    }

    private getItemsCount(): Promise<number> {
        return this.itemModel.countDocuments().exec();
    }
}
