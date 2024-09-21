import { NextFunction, Request, Response } from "express";
import { PostViewsService } from "../services/post-views-service";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";

const postViewsService = new PostViewsService();

export const getViewsByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { limit, offset } = req.query;
    const { views, pagination } = await postViewsService.getViewsByPostId(
      postId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched views successfully", views, pagination });
  } catch (error) {
    next(error);
  }
};

export const getViewsByUserId = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found");
    }
    const userId = req.user.id;
    const { limit, offset } = req.query;
    const { views, pagination } = await postViewsService.getViewsByUserId(
      userId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched views successfully", views, pagination });
  } catch (error) {
    next(error);
  }
};

export const getViewsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { limit, offset } = req.query;
    const { views, pagination } = await postViewsService.getViewsByCategoryId(
      categoryId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched views successfully", views, pagination });
  } catch (error) {
    next(error);
  }
};

export const getViewsByTagId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId } = req.params;
    const { limit, offset } = req.query;
    const { views, pagination } = await postViewsService.getViewsByTagId(
      tagId,
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res
      .status(200)
      .json({ message: "fetched views successfully", views, pagination });
  } catch (error) {
    next(error);
  }
};
