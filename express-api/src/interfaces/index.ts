import { Request } from "express";

export interface JwtPayload {
  id: string;
  roles: string[];
}

export interface userRequest extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

export interface CommentTreeNode {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  deletedAt?: Date | null;
  parentId?: string | null;
  replies: CommentTreeNode[];
}