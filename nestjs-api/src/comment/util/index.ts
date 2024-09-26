import { Comment } from '../comment.entity';
import { CommentTreeNode } from '../interfaces';

export const buildTree = (
  comments: Comment[],
  parentId: string | null = null,
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
