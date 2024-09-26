import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comment, User, Post]), AuthModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
