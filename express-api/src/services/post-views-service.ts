import Category from "../models/category";
import Post from "../models/post";
import PostCategory from "../models/postCategory";
import PostTag from "../models/postTag";
import PostView from "../models/postView";
import Tag from "../models/tag";
import { getPagination, Pagination } from "../utils/pagination";

export class PostViewsService {
  constructor(
    private postViewRepository: typeof PostView = PostView,
    private postRepository: typeof Post = Post,
    private tagRepository: typeof Tag = Tag,
    private categoryRepository: typeof Category = Category,
    private postTagRepository: typeof PostTag = PostTag,
    private postCategoryRepository: typeof PostCategory = PostCategory
  ) {}

  async getViewsByPostId(
    postId: string,
    limit: number,
    offset: number
  ): Promise<{ views: PostView[]; pagination: Pagination }> {
    const { count, rows: views } =
      await this.postViewRepository.findAndCountAll({
        limit,
        offset,
        where: { postId },
      });
    const pagination = getPagination(count, limit, offset);

    return { views, pagination };
  }

  async getViewsByUserId(
    userId: string,
    limit: number,
    offset: number
  ): Promise<{ views: PostView[]; pagination: Pagination }> {
    const { count, rows: views } =
      await this.postViewRepository.findAndCountAll({
        limit,
        offset,
        where: { userId },
      });
    const pagination = getPagination(count, limit, offset);

    return { views, pagination };
  }

  async getViewsByCategoryId(
    categoryId: string,
    limit: number,
    offset: number
  ): Promise<{ views: PostView[]; pagination: Pagination }> {
    // get all posts with given categoryId
    const posts = await this.postCategoryRepository.findAll({
      where: { categoryId },
    });
    // get all postIds from posts
    const postIds = posts.map((postCategory) => postCategory.postId);
    // get the views for the postIds(array of ids)
    const { count, rows: views } =
      await this.postViewRepository.findAndCountAll({
        limit,
        offset,
        where: { postId: postIds },
      });
    const pagination = getPagination(count, limit, offset);

    return { views, pagination };
  }
  
  async getViewsByTagId(
    tagId: string,
    limit: number,
    offset: number
  ): Promise<{ views: PostView[]; pagination: Pagination }> {
    // get all posts with given tagId
    const posts = await this.postTagRepository.findAll({
      where: { tagId },
    });
    // get all postIds from posts
    const postIds = posts.map((postTag) => postTag.postId);
    // get the views for the postIds(array of ids)
    const { count, rows: views } =
      await this.postViewRepository.findAndCountAll({
        limit,
        offset,
        where: { postId: postIds },
      });
    const pagination = getPagination(count, limit, offset);

    return { views, pagination };
  }
}
