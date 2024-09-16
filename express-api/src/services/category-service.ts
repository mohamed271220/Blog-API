import Category from "../models/category";
import User from "../models/user";
import { CustomError } from "../utils/CustomError";
import { getPagination } from "../utils/pagination";
import { v4 as uuid } from "uuid";

export class CategoryService {
  constructor(private categoryRepository: typeof Category = Category) {}

  async createCategory(name: string) {
    return this.categoryRepository.create({ id: uuid(), name });
  }

  async getAllCategories(limit: number, offset: number) {
    const { count, rows: categories } =
      await this.categoryRepository.findAndCountAll({
        limit,
        offset,
      });
    const pagination = getPagination(count, limit, offset);
    return { categories, pagination };
  }

  async getCategory(categoryId: string) {
    return this.categoryRepository.findByPk(categoryId);
  }

  async updateCategory(categoryId: string, name: string) {
    const category = await this.categoryRepository.findByPk(categoryId);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    return category.update({ name });
  }

  async deleteCategory(categoryId: string) {
    const category = await this.categoryRepository.findByPk(categoryId);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    return category.destroy();
  }
}
