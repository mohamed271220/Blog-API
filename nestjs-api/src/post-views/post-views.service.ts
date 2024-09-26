import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostView } from './post-view.entity';
import { PostCategory } from 'src/post/entities/post-category.entity';
import { PostTag } from 'src/post/entities/post-tag.entity';
import { getPagination, Pagination } from 'src/shared/utils/pagination';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostViewsService {
  @InjectModel(Post)
  private postModel: typeof Post;
  @InjectModel(PostView)
  private postViewModel: typeof PostView;
  @InjectModel(PostTag)
  private postTagModel: typeof PostTag;
  @InjectModel(PostCategory)
  private postCategoryModel: typeof PostCategory;

  async getViewsByPostId(
    postId: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<number> {
    const { count, rows } = await this.postViewModel.findAndCountAll({
      raw: true,
      limit,
      offset,
      where: { postId },
    });

    return count;
  }

  async getViewsByUserId(
    user: User,
    limit: number = 10,
    offset: number = 0,
  ): Promise<number> {
    const userId = user.id;
    const { count, rows } = await this.postViewModel.findAndCountAll({
      limit,
      offset,
      where: { userId },
    });
    return count;
  }

  async getViewsByCategoryId(
    categoryId: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ views: PostView[]; pagination: Pagination }> {
    // get all posts with given categoryId
    const posts = await this.postCategoryModel.findAll({
      where: { categoryId },
      raw: true,
    });
    // get all postIds from posts
    const postIds = posts.map((postCategory) => postCategory.postId);
    // get the views for the postIds(array of ids)
    const { count, rows: views } = await this.postViewModel.findAndCountAll({
      limit,
      offset,
      raw: true,

      where: { postId: postIds },
    });
    const pagination = getPagination(count, limit, offset);

    return { views, pagination };
  }

  async getViewsByTagId(
    tagId: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ views: PostView[]; pagination: Pagination }> {
    // get all posts with given tagId
    const posts = await this.postTagModel.findAll({
      where: { tagId },
    });
    // get all postIds from posts
    const postIds = posts.map((postTag) => postTag.postId);
    // get the views for the postIds(array of ids)
    const { count, rows: views } = await this.postViewModel.findAndCountAll({
      limit,
      offset,
      raw: true,
      where: { postId: postIds },
    });
    const pagination = getPagination(count, limit, offset);

    return { views, pagination };
  }
}
