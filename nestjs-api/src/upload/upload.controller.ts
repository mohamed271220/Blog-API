import {
  Controller,
  Post,
  UseInterceptors,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { MediaService } from './upload.service';
import { MediaInterceptor } from './media.interceptor';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(MediaInterceptor)
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    if (!files) {
      return res.status(400).send('No files uploaded.');
    }

    const uploadedFiles = files.map((file: any) => file.location);
    return res.status(200).send(uploadedFiles);
  }
}
