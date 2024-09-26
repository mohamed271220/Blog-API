import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'superadmin')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('/')
  async getCategories(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.categoryService.getCategories(
      limit ? Number(limit) : 10,
      offset ? Number(offset) : 0,
    );
  }

  @Get('/:categoryId')
  async getCategoryById(@Param('categoryId') categoryId: string) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Put('/:categoryId/name')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'superadmin')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, createCategoryDto);
  }

  @Delete('/:categoryId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
