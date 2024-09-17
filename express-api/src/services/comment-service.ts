import Comment from "../models/comment";
import Post from "../models/post";
import User from "../models/user";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/CustomError";
import { CommentTreeNode } from "../interfaces";

export class CommentService {
  constructor(
    private commentRepository: typeof Comment = Comment,
    private userRepository: typeof User = User,
    private postRepository: typeof Post = Post
  ) {}

  async createComment(
    authorId: string,
    postId: string,
    content: string,
    parentId?: string
  ) {
    const [user, post] = await Promise.all([
      this.userRepository.findByPk(authorId),
      this.postRepository.findByPk(postId),
    ]);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    const comment = await this.commentRepository.create({
      id: uuid(),
      authorId,
      postId,
      content,
      parentId,
    });
    return comment;
  }

  async getTopLevelComments(postId: string) {
    const post = await this.postRepository.findAll({
      where: { id: postId },
    });
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    const comments = await this.commentRepository.findAll({
      where: { postId, parentId: null },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    return comments;
  }

  async getCommentTree(postId: string): Promise<CommentTreeNode[]> {
    const post = await this.postRepository.findByPk(postId);
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    const allComments = await this.commentRepository.findAll({
      where: { postId },
    });

    const buildTree = (
      comments: Comment[],
      parentId: string | null = null
    ): CommentTreeNode[] => {
      return comments
        .filter((comment) => comment.parentId === parentId)
        .map((comment) => ({
          id: comment.id,
          postId: comment.postId,
          authorId: comment.authorId,
          content: comment.content,
          deletedAt: comment.deletedAt,
          parentId: comment.parentId,
          replies: buildTree(comments, comment.id),
        }));
    };

    const commentTree = buildTree(allComments);
    return commentTree;
  }

  async getCommentById(commentId: string) {
    const comment = await this.commentRepository.findByPk(commentId);
    if (!comment) {
      throw new CustomError("Comment not found", 404);
    }
    return comment;
  }

  async updateComment(commentId: string, authorId: string, content: string) {
    const comment = await this.commentRepository.findByPk(commentId);
    if (!comment) {
      throw new CustomError("Comment not found", 404);
    }
    if (comment.authorId !== authorId) {
      throw new CustomError("Unauthorized", 401);
    }
    comment.content = content;
    await comment.save();
    return comment;
  }

  async deleteComment(commentId: string, authorId: string) {
    const comment = await this.commentRepository.findByPk(commentId);
    if (!comment) {
      throw new CustomError("Comment not found", 404);
    }
    if (comment.authorId !== authorId) {
      throw new CustomError("Unauthorized", 401);
    }
    await comment.destroy();
  }

  async getAllCommentsIncludingDeleted(postId: string) {
    const post = await this.postRepository.findByPk(postId);
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    const allComments = await this.commentRepository.findAll({
      where: { postId },
      paranoid: false,
    });

    const buildTree = (
      comments: Comment[],
      parentId: string | null = null
    ): CommentTreeNode[] => {
      return comments
        .filter((comment) => comment.parentId === parentId)
        .map((comment) => ({
          id: comment.id,
          postId: comment.postId,
          authorId: comment.authorId,
          content: comment.content,
          deletedAt: comment.deletedAt,
          parentId: comment.parentId,
          replies: buildTree(comments, comment.id),
        }));
    };

    const commentTree = buildTree(allComments);
    return commentTree;
  }

  async getCommentByIdIncludingDeleted(commentId: string) {
    const comment = await this.commentRepository.findByPk(commentId, {
      paranoid: false, // Include deleted comment
    });

    if (!comment) {
      throw new CustomError("Comment not found", 404);
    }

    return comment;
  }
}
