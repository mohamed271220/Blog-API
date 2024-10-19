import Category from "../models/category";
import Post from "../models/post";
import PostCategory from "../models/postCategory";
import PostTag from "../models/postTag";
import Tag from "../models/tag";
import User from "../models/user";
import Vote from "../models/vote";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/CustomError";

export class VoteService {
  constructor(
    private voteRepository: typeof Vote = Vote,
    private postRepository: typeof Post = Post,
    private postTagRepository: typeof PostTag = PostTag,
    private postCategoryRepository: typeof PostCategory = PostCategory,
    private userRepository: typeof User = User,
    private categoryRepository: typeof Category = Category,
    private tagRepository: typeof Tag = Tag
  ) {}

  async createVote(
    postId: string,
    userId: string,
    type: string
  ): Promise<Vote> {
    const [post, user, existingVote] = await Promise.all([
      this.postRepository.findByPk(postId),
      this.userRepository.findByPk(userId),
      this.voteRepository.findOne({ where: { postId, userId } }),
    ]);

    if (!post || !user) {
      throw new CustomError("Post or User not found", 404);
    }

    if (existingVote) {
      await this.voteRepository.update({ type }, { where: { postId, userId } });
      const updatedVote = await this.voteRepository.findOne({
        where: { postId, userId },
      });

      if (!updatedVote) {
        throw new CustomError("Vote not found after update", 404);
      }

      return updatedVote;
    }

    const newVote = await this.voteRepository.create({
      id: uuid(),
      postId,
      userId,
      type,
    });

    return newVote;
  }

  async deleteVote(voteId: string): Promise<void> {
    const vote = await this.voteRepository.findByPk(voteId);
    if (!vote) {
      throw new CustomError("Vote not found", 404);
    }
    await this.voteRepository.destroy({ where: { id: voteId } });
  }

  async getVotesByPostId(postId: string): Promise<{
    upvotes: number;
    downvotes: number;
    totalVotes: number;
    upvoteRatio: number;
    downvoteRatio: number;
  }> {
    const [votes, post] = await Promise.all([
      this.voteRepository.findAll({ where: { postId } }),
      this.postRepository.findByPk(postId),
    ]);

    if (!post) {
      throw new CustomError("Post not found", 404);
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

    const upvotes = votes.filter((vote) => vote.type === "upvote").length;
    const downvotes = votes.filter((vote) => vote.type === "downvote").length;
    const totalVotes = votes.length;
    const upvoteRatio = upvotes / totalVotes;
    const downvoteRatio = downvotes / totalVotes;

    return { upvotes, downvotes, totalVotes, upvoteRatio, downvoteRatio };
  }

  async getVotesByUserId(userId: string): Promise<{ votes: Vote[] }> {
    const votes = await this.voteRepository.findAll({ where: { userId } });
    if (votes.length === 0) {
      throw new CustomError("Votes not found", 404);
    }
    return { votes };
  }

  async getVoteForUserByPostId(
    userId: string,
    postId: string
  ): Promise<Vote | null> {
    const vote = await this.voteRepository.findOne({
      where: { userId, postId },
    });
    if (!vote) {
      throw new CustomError("Vote not found", 404);
    }
    return vote;
  }

  async getVotesByCategoryId(categoryId: string): Promise<{ votes: Vote[] }> {
    const category = await this.categoryRepository.findByPk(categoryId);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    const posts = await this.postCategoryRepository.findAll({
      where: { categoryId },
    });

    const postIds = posts.map((post) => post.postId);

    const votes = await this.voteRepository.findAll({
      where: { postId: postIds },
    });

    if (votes.length === 0) {
      throw new CustomError("Votes not found", 404);
    }

    return { votes };
  }

  async getVotesByTagId(tagId: string): Promise<{ votes: Vote[] }> {
    const tag = await this.tagRepository.findByPk(tagId);
    if (!tag) {
      throw new CustomError("Tag not found", 404);
    }
    const posts = await this.postTagRepository.findAll({
      where: { tagId },
    });

    const postIds = posts.map((post) => post.postId);

    const votes = await this.voteRepository.findAll({
      where: { postId: postIds },
    });

    if (votes.length === 0) {
      throw new CustomError("Votes not found", 404);
    }

    return { votes };
  }
}
