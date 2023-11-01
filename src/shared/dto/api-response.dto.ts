export class ApiResponseDto<T> {
    public statusCode: number;
    public message: string;
    public data?: T;

    constructor(code: number, message: string, response?: T) {
        this.statusCode = code;
        this.message = message;
        if (response) {
            this.data = response;
        }
    }
}
