import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { PostView } from 'src/post-views/post-view.entity';
import { PostTag } from './entities/post-tag.entity';
import { PostCategory } from './entities/post-category.entity';
import { MediaLink } from './entities/media-link.entity';
import { Tag } from 'src/tag/tag.entity';
import { Category } from 'src/category/category.entity';
import { Vote } from 'src/vote/vote.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Sequelize,
      Post,
      User,
      PostView,
      PostTag,
      PostCategory,
      MediaLink,
      Tag,
      Category,
      Vote,
    ]),
    AuthModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
