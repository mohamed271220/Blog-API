import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DmsService } from './dms.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 10MB

@Controller('api/v1/upload')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @Post('/file')
  @Roles('user')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: MAX_FILE_SIZE, // 10MB
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body('isPublic') isPublic: string,
  ) {
    const isPublicBool = isPublic === 'true' ? true : false;
    return this.dmsService.uploadSingleFile({ file, isPublic: isPublicBool });
  }

  @Post('/files')
  @Roles('user')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: MAX_FILE_SIZE,
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    files: Express.Multer.File[],
    @Body('isPublic') isPublic: string,
  ) {
    const isPublicBool = isPublic === 'true';
    return this.dmsService.uploadMultipleFiles({
      files,
      isPublic: isPublicBool,
    });
  }

  @Get(':key')
  @Roles('user')
  async getFileUrl(@Param('key') key: string) {
    return this.dmsService.getFileUrl(key);
  }

  @Get('/signed-url/:key')
  @Roles('user')
  async getSingedUrl(@Param('key') key: string) {
    return this.dmsService.getPresignedSignedUrl(key);
  }

  @Delete(':key')
  @Roles('admin')
  async deleteFile(@Param('key') key: string) {
    return this.dmsService.deleteFile(key);
  }
}
