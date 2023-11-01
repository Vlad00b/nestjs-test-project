export class StatisticItemDto {
    public type: string;
    public count: number;

    constructor(type: string, count: number) {
        this.type = type;
        this.count = count;
    }
}
