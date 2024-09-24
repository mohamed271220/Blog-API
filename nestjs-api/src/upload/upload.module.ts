import { Module } from '@nestjs/common';
import { MediaService } from './upload.service';
import { MediaController } from './upload.controller';
import { MediaInterceptor } from './media.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MediaService, MediaInterceptor],
  controllers: [MediaController],
})
export class MediaModule {}
