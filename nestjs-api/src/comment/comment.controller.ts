import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Add a new comment to a post
  @Post('/post/:postId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async createComment(
    @GetUser() user: User,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(user, postId, createCommentDto);
  }

  // Get top-level comments of a post
  @Get('/post/:postId/top-level')
  async getTopLevelComments(@Param('postId') postId: string) {
    return this.commentService.getTopLevelComments(postId);
  }

  // Get the entire comment tree of a post
  @Get('/post/:postId/tree')
  async getCommentTree(@Param('postId') postId: string) {
    return this.commentService.getCommentTree(postId);
  }

  @Get('/:commentId')
  async getCommentReplies(@Param('commentId') commentId: string) {
    return this.commentService.getCommentById(commentId);
  }

  // Get the comment and it's replies
  @Get('/:commentId/replies')
  async getCommentAndReplies(@Param('commentId') commentId: string) {
    return this.commentService.getCommentAndReplies(commentId);
  }

  @Put('/:commentId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async updateComment(
    @GetUser() user: User,
    @Param('commentId') commentId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.updateComment(user, commentId, createCommentDto);
  }

  @Delete('/:commentId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async deleteComment(
    @GetUser() user: User,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.deleteComment(user, commentId);
  }

  // get all comments including deleted ones
  @Get('/post/:postId/tree/deleted')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getAllComments(@Param('postId') postId: string) {
    return this.commentService.getAllComments(postId);
  }

  @Get('/:commentId/deleted')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getDeletedComment(@Param('commentId') commentId: string) {
    return this.commentService.getDeletedComment(commentId);
  }
}
