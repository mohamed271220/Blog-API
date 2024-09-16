import Tag from "../models/tag";
import { v4 as uuid } from "uuid";
import { getPagination } from "../utils/pagination";
import { CustomError } from "../utils/CustomError";

export class TagService {
  constructor(private tagRepository: typeof Tag = Tag) {}
  async createTag(name: string) {
    return this.tagRepository.create({ id: uuid(), name });
  }

  async getAllTags(limit: number, offset: number) {
    const { count, rows: tags } = await this.tagRepository.findAndCountAll({
      limit,
      offset,
    });
    const pagination = getPagination(count, limit, offset);
    return { tags, pagination };
  }

  async getTag(tagId: string) {
    return this.tagRepository.findByPk(tagId);
  }

  async updateTag(tagId: string, name: string) {
    const tag = await this.tagRepository.findByPk(tagId);
    if (!tag) {
      throw new CustomError("Tag not found", 404);
    }
    return tag.update({ name });
  }

  async deleteTag(tagId: string) {
    const tag = await this.tagRepository.findByPk(tagId);
    if (!tag) {
      throw new CustomError("Tag not found", 404);
    }
    return tag.destroy();
  }
}
