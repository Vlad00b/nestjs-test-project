import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ERROR_MESSAGES } from '../constants/message.constants';
import { ApiExceptionDto } from '../dto/api-exception.dto';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next
			.handle()
			.pipe(
				catchError((err) => {
					console.log(err);
					let errorMessage = ERROR_MESSAGES.somethingWentWrong;
					const resMessage = err?.response?.message;
					if (Array.isArray(resMessage) && resMessage.length) {
						errorMessage = resMessage[0];
					} else if (typeof resMessage === 'string') {
						errorMessage = resMessage;
					} else if (err.message) {
						errorMessage = err.message;
					}
					return throwError(() => new ApiExceptionDto(err.status ?? HttpStatus.BAD_REQUEST, errorMessage));
				}),
			);
	}
}
