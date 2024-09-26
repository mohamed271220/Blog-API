import { Module } from '@nestjs/common';
import { PostViewsService } from './post-views.service';
import { PostViewsController } from './post-views.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostView } from './post-view.entity';
import { PostTag } from 'src/post/entities/post-tag.entity';
import { PostCategory } from 'src/post/entities/post-category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Post, PostView, PostTag, PostCategory]),
    AuthModule,
  ],
  providers: [PostViewsService],
  controllers: [PostViewsController],
})
export class PostViewsModule {}
