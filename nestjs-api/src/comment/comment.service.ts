import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { v4 as uuid } from 'uuid';
import { Post } from 'src/post/entities/post.entity';
import { CommentTreeNode } from './interfaces';
import { buildTree } from './util';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  async createComment(user: User, postId, createCommentDto: CreateCommentDto) {
    const [userEx, post] = await Promise.all([
      this.userModel.findByPk(user.id),
      this.postModel.findByPk(postId),
    ]);
    if (!userEx) {
      throw new NotFoundException('User not found');
    }
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.commentModel.create({
      id: uuid(),
      authorId: user.id,
      postId: postId,
      parentId: createCommentDto.parentId,
      content: createCommentDto.content,
    });
  }

  async getTopLevelComments(postId: string) {
    const post = await this.postModel.findAll({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const comments = await this.commentModel.findAll({
      raw: true,
      nest: true,
      where: { postId, parentId: null },
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'username'],
        },
      ],
    });
    return comments;
  }

  async getCommentTree(postId: string): Promise<CommentTreeNode[]> {
    const post = await this.postModel.findByPk(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const allComments = await this.commentModel.findAll({
      raw: true,
      where: { postId },
    });

    const commentTree = buildTree(allComments);
    return commentTree;
  }

  async getCommentById(commentId: string) {
    const comment = await this.commentModel.findByPk(commentId, {
      raw: true,
      nest: true,
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async getCommentAndReplies(commentId: string) {
    const comment = await this.commentModel.findByPk(commentId, {
      raw: true,
      nest: true,
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const allComments = await this.commentModel.findAll({
      raw: true,
      where: { postId: comment.postId },
    });

    const commentTree = buildTree(allComments, commentId);
    return commentTree;
  }

  async updateComment(
    user: User,
    commentId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentModel.findByPk(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.authorId !== user.id) {
      throw new NotFoundException('Unauthorized');
    }
    comment.content = createCommentDto.content;
    return comment.save();
  }

  async deleteComment(user: User, commentId: string) {
    const comment = await this.commentModel.findByPk(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.authorId !== user.id) {
      throw new NotFoundException('Unauthorized');
    }
    await comment.destroy();
  }

  async getAllComments(postId: string): Promise<CommentTreeNode[]> {
    const post = await this.postModel.findByPk(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const allComments = await this.commentModel.findAll({
      paranoid: false,
      raw: true,
      where: { postId },
    });

    const commentTree = buildTree(allComments);
    return commentTree;
  }

  async getDeletedComment(commentId: string): Promise<Comment | null> {
    const comment = await this.commentModel.findByPk(commentId, {
      raw: true,
      paranoid: false,
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }
}
