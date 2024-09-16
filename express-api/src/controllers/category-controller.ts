import { NextFunction, Request, Response } from "express";
import { userRequest } from "../interfaces";
import { CategoryService } from "../services/category-service";
import { CustomError } from "../utils/CustomError";

const categoryService = new CategoryService();

export const createCategory = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new CustomError("name is required", 400);
    }
    const category = await categoryService.createCategory(name);
    res.status(201).json({
      message: "category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset } = req.query;
    const { categories, pagination } = await categoryService.getAllCategories(
      limit ? parseInt(limit as string) : 10,
      offset ? parseInt(offset as string) : 0
    );
    res.status(200).json({
      message: "fetched categories successfully",
      categories,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategory(categoryId);
    res
      .status(200)
      .json({ message: "fetched category successfully", category });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    if (!name) {
      throw new CustomError("name is required", 400);
    }
    await categoryService.updateCategory(categoryId, name);
    res.status(200).json({ message: "category updated successfully" });
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    await categoryService.deleteCategory(categoryId);
    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
