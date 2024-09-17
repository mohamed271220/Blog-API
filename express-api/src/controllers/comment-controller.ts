import { NextFunction, Request, Response } from "express";
import { userRequest } from "../interfaces";
import { CommentService } from "../services/comment-service";
import { CustomError } from "../utils/CustomError";

const commentService = new CommentService();

export const createComment = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { content, parentId } = req.body;
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const comment = await commentService.createComment(
      req.user.id,
      postId,
      content,
      parentId
    );
    res.status(201).json({ message: "comment created successfully", comment });
  } catch (error) {
    next(error);
  }
};

export const getTopLevelComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getTopLevelComments(postId);
    res
      .status(200)
      .json({ message: "fetched comments successfully", comments });
  } catch (error) {
    next(error);
  }
};

export const getCommentTree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const commentTree = await commentService.getCommentTree(postId);
    res
      .status(200)
      .json({ message: "fetched comment tree successfully", commentTree });
  } catch (error) {
    next(error);
  }
};

export const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.getCommentById(commentId);
    res.status(200).json({ message: "fetched comment successfully", comment });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    await commentService.updateComment(commentId, req.user.id, content);
    res.status(200).json({ message: "comment updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    await commentService.deleteComment(commentId, req.user.id);
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllCommentsIncludingDeleted = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getAllCommentsIncludingDeleted(
      postId
    );
    res
      .status(200)
      .json({ message: "fetched comments successfully", comments });
  } catch (error) {
    next(error);
  }
};

export const getCommentByIdIncludingDeleted = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.getCommentByIdIncludingDeleted(
      commentId
    );
    res.status(200).json({ message: "fetched comment successfully", comment });
  } catch (error) {
    next(error);
  }
};
