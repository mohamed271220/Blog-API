import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { v4 as uuid } from 'uuid';
import { getPagination } from 'src/shared/utils/pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({
      id: uuid(),
      name: createCategoryDto.name,
    });
  }

  async getCategories(limit: number, offset: number) {
    const { rows, count } = await this.categoryModel.findAndCountAll({
      raw: true,
      limit,
      offset,
    });
    const pagination = getPagination(count, limit, offset);
    return { categories: rows, pagination };
  }

  async getCategoryById(categoryId: string) {
    return this.categoryModel.findByPk(categoryId, {
      raw: true,
    });
  }

  async updateCategory(
    categoryId: string,
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryModel.update(createCategoryDto, {
      where: { id: categoryId },
    });
  }

  async deleteCategory(categoryId: string) {
    return this.categoryModel.destroy({ where: { id: categoryId } });
  }
}
