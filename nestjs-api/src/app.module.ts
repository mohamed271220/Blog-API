import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { RoleModule } from './role/role.module';
import { VoteModule } from './vote/vote.module';
import { PostViewsModule } from './post-views/post-views.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    PostModule,
    CommentModule,
    CategoryModule,
    TagModule,
    RoleModule,
    VoteModule,
    PostViewsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
