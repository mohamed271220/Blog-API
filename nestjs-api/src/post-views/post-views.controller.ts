import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PostViewsService } from './post-views.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('api/v1/post-views')
export class PostViewsController {
  constructor(private readonly postViewsService: PostViewsService) {}

  @Get('/post/:postId')
  async getPostViews(
    @Param('postId') postId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postViewsService.getViewsByPostId(postId, limit, offset);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async getUserViews(
    @GetUser() user: User,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postViewsService.getViewsByUserId(user, limit, offset);
  }

  @Get('/category/:categoryId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getCategoryViews(
    @Param('categoryId') categoryId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postViewsService.getViewsByCategoryId(
      categoryId,
      limit,
      offset,
    );
  }

  @Get('/tag/:tagId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async getTagViews(
    @Param('tagId') tagId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postViewsService.getViewsByTagId(tagId, limit, offset);
  }
}
