import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { v4 as uuid } from 'uuid';
import { getPagination } from 'src/shared/utils/pagination';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async createTag(createTagDto: CreateTagDto) {
    return this.tagModel.create({
      id: uuid(),
      name: createTagDto.name,
    });
  }

  async getTags(limit: number, offset: number) {
    const { rows, count } = await this.tagModel.findAndCountAll({
      raw: true,
      limit,
      offset,
    });
    const pagination = getPagination(count, limit, offset);
    return { tags: rows, pagination };
  }

  async getTagById(tagId: string) {
    return this.tagModel.findByPk(tagId, {
      raw: true,
    });
  }

  async updateTag(tagId: string, createTagDto: CreateTagDto) {
    return this.tagModel.update(createTagDto, {
      where: { id: tagId },
    });
  }

  async deleteTag(tagId: string) {
    return this.tagModel.destroy({ where: { id: tagId } });
  }
}
