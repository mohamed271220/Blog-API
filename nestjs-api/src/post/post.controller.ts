import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/edit-post.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  getAllPosts(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postService.getAllPosts(
      search ? search : '',
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Get('/feed')
  @UseGuards(AuthGuard('jwt'))
  @Roles('user')
  getFeed(
    @GetUser() user: User,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postService.getFeed(
      user,
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Get('/:postId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  getPostById(@GetUser() user: User, @Param('postId') postId: string) {
    return this.postService.getPostById(user, postId);
  }

  @Get('/category/:categoryId')
  getPostsByCategory(
    @Param('categoryId') categoryId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postService.getPostsByCategory(
      categoryId,
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Get('/tag/:tagId')
  getPostsByTag(
    @Param('tagId') tagId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postService.getPostsByTag(
      tagId,
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Get('/author/:authorId')
  getPostsByAuthor(
    @Param('authorId') authorId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.postService.getPostsByAuthor(
      authorId,
      limit ? limit : 10,
      offset ? offset : 0,
    );
  }

  @Put('/:postId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  updatePost(
    @GetUser() user: User,
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(user, postId, updatePostDto);
  }

  @Delete('/:postId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'admin', 'superadmin')
  deletePost(@GetUser() user: User, @Param('postId') postId: string) {
    return this.postService.deletePost(user, postId);
  }
}
