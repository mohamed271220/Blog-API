import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post-service";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";

const postService = new PostService();

export const createPost = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, tags, categories, mediaLinks } = req.body;
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const post = await postService.createPost({
      title,
      content,
      authorId: req.user.id,
      tags,
      categories,
      mediaLinks,
    });
    res.status(201).json({ message: "post created successfully", post });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset, search } = req.query;
    const { posts, pagination } = await postService.getAllPosts(
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0,
      search ? (search as string) : ""
    );
    res
      .status(200)
      .json({ message: "fetched posts successfully", posts, pagination });
  } catch (error) {
    next(error);
  }
};

export const getFeed = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset } = req.query;
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const { posts, pagination } = await postService.getFeed(
      req.user.id,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched feed successfully", posts, pagination });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const userId = req.user ? req.user.id : null;
    const post = await postService.getPostById(postId, userId);
    res.status(200).json({ message: "fetched post successfully", post });
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId } = req.params;
    const { limit, offset } = req.query;
    const { posts, pagination } = await postService.getPostsByAuthor(
      authorId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched posts successfully", posts, pagination });
  } catch (error) {
    next(error);
  }
};

export const getPostsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { limit, offset } = req.query;
    const { posts, pagination } = await postService.getPostsByCategory(
      categoryId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched posts successfully", posts, pagination });
  } catch (error) {
    next(error);
  }
};

export const getPostsByTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId } = req.params;
    const { limit, offset } = req.query;
    const { posts, pagination } = await postService.getPostsByTag(
      tagId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched posts successfully", posts, pagination });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { title, content, tags, categories, mediaLinks } = req.body;
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const post = await postService.updatePost(postId, {
      title,
      content,
      authorId: req.user.id,
      tags,
      categories,
      mediaLinks,
    });
    res.status(201).json({ message: "post updated successfully", post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const authorId = req.user.id;
    await postService.deletePost(postId, authorId);
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
