import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vote } from './vote.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Category } from 'src/category/category.entity';
import { Tag } from 'src/tag/tag.entity';
import { PostTag } from 'src/post/entities/post-tag.entity';
import { PostCategory } from 'src/post/entities/post-category.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote)
    private readonly voteModel: typeof Vote,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
    @InjectModel(PostTag)
    private readonly postTagModel: typeof PostTag,
    @InjectModel(PostCategory)
    private readonly postCategoryModel: typeof PostCategory,
  ) {}

  async votePost(
    user: User,
    postId: string,
    type: 'upvote' | 'downvote',
  ): Promise<Vote> {
    const userId = user.id;
    const [post, isUserValid, existingVote] = await Promise.all([
      this.userModel.findByPk(userId),
      this.postModel.findByPk(postId),
      this.voteModel.findOne({ where: { postId, userId } }),
    ]);
    if (!post || !isUserValid) {
      throw new NotAcceptableException('Post or User not found');
    }

    if (existingVote) {
      await this.voteModel.update({ type }, { where: { postId, userId } });

      const vote = await this.voteModel.findOne({
        where: { postId, userId },
      });

      if (!vote) {
        throw new NotAcceptableException('Vote not found');
      }

      return vote;
    }

    const vote = await this.voteModel.create({
      id: uuid(),
      postId,
      userId,
      type,
    });
    return vote;
  }

  async deleteVote(voteId: string): Promise<void> {
    const vote = await this.voteModel.findByPk(voteId);
    if (!vote) {
      throw new NotFoundException('Vote not found');
    }
    await this.voteModel.destroy({ where: { id: voteId } });
  }

  async getPostVotes(postId: string): Promise<{
    upvotes: number;
    downvotes: number;
    totalVotes: number;
    upvoteRatio: number;
    downvoteRatio: number;
  }> {
    const [votes, post] = await Promise.all([
      this.voteModel.findAll({ where: { postId } }),
      this.postModel.findByPk(postId),
    ]);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (votes.length === 0) {
      return {
        upvotes: 0,
        downvotes: 0,
        totalVotes: 0,
        upvoteRatio: 0,
        downvoteRatio: 0,
      };
    }

    const upvotes = votes.filter((vote) => vote.type === 'upvote').length;
    const downvotes = votes.filter((vote) => vote.type === 'downvote').length;
    const totalVotes = votes.length;
    const upvoteRatio = upvotes / totalVotes;
    const downvoteRatio = downvotes / totalVotes;

    return { upvotes, downvotes, totalVotes, upvoteRatio, downvoteRatio };
  }

  async getUserVotes(user: User): Promise<Vote[]> {
    const userId = user.id;
    return this.voteModel.findAll({ where: { userId }, raw: true });
  }

  async getCategoryVotes(categoryId: string): Promise<{ votes: Vote[] }> {
    const category = await this.categoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const posts = await this.postCategoryModel.findAll({
      where: { categoryId },
    });

    const postIds = posts.map((post) => post.postId);

    const votes = await this.voteModel.findAll({
      where: { postId: postIds },
      raw: true,
    });

    if (votes.length === 0) {
      throw new NotFoundException('Votes not found');
    }

    return { votes };
  }

  async getTagVotes(tagId: string): Promise<{ votes: Vote[] }> {
    const tag = await this.tagModel.findByPk(tagId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    const posts = await this.postTagModel.findAll({
      where: { tagId },
    });

    const postIds = posts.map((post) => post.postId);

    const votes = await this.voteModel.findAll({
      where: { postId: postIds },
      raw: true,
    });

    if (votes.length === 0) {
      throw new NotFoundException('Votes not found');
    }
    return { votes };
  }
}
