export interface CommentTreeNode {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  deletedAt?: Date | null;
  parentId?: string | null;
  replies: CommentTreeNode[];
}
