import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/post/entities/post.entity';
import { Vote } from './vote.entity';
import { PostTag } from 'src/post/entities/post-tag.entity';
import { PostCategory } from 'src/post/entities/post-category.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/category.entity';
import { Tag } from 'src/tag/tag.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Post,
      Vote,
      PostTag,
      PostCategory,
      User,
      Category,
      Tag,
    ]),
    AuthModule,
  ],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
