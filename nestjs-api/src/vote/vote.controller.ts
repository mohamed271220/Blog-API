import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('api/v1/votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('/post/:postId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async votePost(
    @GetUser() user: User,
    @Param('postId') postId: string,
    @Body('vote') type: 'upvote' | 'downvote',
  ) {
    return this.voteService.votePost(user, postId, type);
  }

  @Delete('/:voteId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async deleteVote(@Param('voteId') voteId: string) {
    return this.voteService.deleteVote(voteId);
  }

  @Get('/post/:postId')
  async getPostVotes(@Param('postId') postId: string) {
    return this.voteService.getPostVotes(postId);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  async getUserVotes(@GetUser() user: User) {
    return this.voteService.getUserVotes(user);
  }

  @Get('/category/:categoryId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getCategoryVotes(@Param('categoryId') categoryId: string) {
    return this.voteService.getCategoryVotes(categoryId);
  }

  @Get('/tag/:tagId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getTagVotes(@Param('tagId') tagId: string) {
    return this.voteService.getTagVotes(tagId);
  }
}
