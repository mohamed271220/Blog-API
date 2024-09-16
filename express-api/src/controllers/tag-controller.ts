import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { TagService } from "../services/tag-service";

const tagService = new TagService();

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new CustomError("name is required", 400);
    }

    const tag = await tagService.createTag(name);
    res.status(201).json({
      message: "tag created successfully",
      tag,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset } = req.query;
    const { tags, pagination } = await tagService.getAllTags(
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res.status(200).json({
      message: "fetched tags successfully",
      tags,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId } = req.params;
    const tag = await tagService.getTag(tagId);
    res.status(200).json({ message: "fetched tag successfully", tag });
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId } = req.params;
    const { name } = req.body;
    if (!name) {
      throw new CustomError("name is required", 400);
    }
    const tag = await tagService.updateTag(tagId, name);
    res.status(200).json({ message: "tag updated successfully", tag });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId } = req.params;
    await tagService.deleteTag(tagId);
    res.status(200).json({ message: "tag deleted successfully" });
  } catch (error) {
    next(error);
  }
};
