import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MediaService } from './upload.service';
import { Request } from 'express';

@Injectable()
export class MediaInterceptor implements NestInterceptor {
  constructor(private readonly mediaService: MediaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return new Observable((observer) => {
      const upload = this.mediaService.getMulterUpload();

      upload.array('photos', 40)(request, request.res, (error: any) => {
        if (error) {
          return observer.error(error);
        }
        observer.next(request.files);
        observer.complete();
      });
    });
  }
}
