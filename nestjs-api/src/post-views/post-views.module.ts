import { Module } from '@nestjs/common';
import { PostViewsService } from './post-views.service';
import { PostViewsController } from './post-views.controller';

@Module({
  providers: [PostViewsService],
  controllers: [PostViewsController],
})
export class PostViewsModule {}
