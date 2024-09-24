import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { RoleModule } from './role/role.module';
import { VoteModule } from './vote/vote.module';
import { PostViewsModule } from './post-views/post-views.module';
import { MediaModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { User } from './user/entities/User.entity';
import { Post } from './post/entities/post.entity';

import { Category } from './category/category.entity';
import { Comment } from './comment/comment.entity';
import { MediaLink } from './entities/media-link.entity';
import { PostCategory } from './post/entities/post-category.entity';
import { PostTag } from './post/entities/post-tag.entity';
import { PostView } from './post-views/post-view.entity';
import { Role } from './role/role.entity';
import { UserRole } from './user/entities/user-role.entity';
import { Vote } from './vote/vote.entity';
import { Tag } from './tag/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          dialect: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PWD'),
          database: configService.get('DB_NAME'),
          models: [
            User,
            Post,
            Comment,
            MediaLink,
            Tag,
            PostTag,
            Category,
            PostCategory,
            Vote,
            PostView,
            Role,
            UserRole,
          ],
          logging: console.log, // Enable detailed logging
          dialectOptions: isProduction
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: false, // This ensures that SSL works even with self-signed certificates
                },
              }
            : {},
          synchronize: true, // Auto-create tables based on your models (use with caution in production)
        };
      },
    }),
    AuthModule,
    PostModule,
    CommentModule,
    CategoryModule,
    TagModule,
    RoleModule,
    VoteModule,
    PostViewsModule,
    MediaModule,
  ],
})
export class AppModule {}
