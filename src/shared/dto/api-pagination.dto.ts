export class ApiPaginationDto<T> {
    public total: number;
    public page: number;
    public data: T;
    public prevPage?: number;
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
