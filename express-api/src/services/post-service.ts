import MediaLink from "../models/mediaLink";
import Post from "../models/post";
import PostCategory from "../models/postCategory";
import PostTag from "../models/postTag";
import PostView from "../models/postView";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/CustomError";
import { Op, Sequelize, Transaction } from "sequelize";
import Category from "../models/category";
import Tag from "../models/tag";
import seqConfig from "../config/database";
import { getPagination, Pagination } from "../utils/pagination";
import User from "../models/user";
import Vote from "../models/vote";

export class PostService {
  constructor(
    private sequelize: Sequelize = seqConfig,
    private userRepository: typeof User = User,
    private postRepository: typeof Post = Post,
    private postViewRepository: typeof PostView = PostView,
    private postTagRepository: typeof PostTag = PostTag,
    private postCategoryRepository: typeof PostCategory = PostCategory,
    private mediaLinkRepository: typeof MediaLink = MediaLink,
    private tagRepository: typeof Tag = Tag,
    private categoryRepository: typeof Category = Category,
    private voteRepository: typeof Vote = Vote
  ) {}

  async createPost(data: {
    title: string;
    content: string;
    authorId: string;
    tags?: string[];
    categories?: string[];
    mediaLinks?: string[];
  }) {
    const transaction = await this.sequelize.transaction();

    try {
      // Check if tags are valid if they are provided
      if (data.tags && data.tags.length > 0) {
        const tags = await this.tagRepository.findAll({
          where: { id: data.tags },
        });

        if (tags.length !== data.tags.length) {
          throw new CustomError("Some tags are invalid", 400);
        }
      }

      // Check if categories are valid if they are provided
      if (data.categories && data.categories.length > 0) {
        const categories = await this.categoryRepository.findAll({
          where: { id: data.categories },
        });

        if (categories.length !== data.categories.length) {
          throw new CustomError("Some categories are invalid", 400);
        }
      }

      // Create the post
      const post = await this.postRepository.create(
        {
          id: uuid(),
          title: data.title,
          content: data.content,
          authorId: data.authorId,
        },
        { transaction }
      );

      // Ensure the post was created
      if (!post) {
        throw new CustomError("Failed to create post", 500);
      }

      // Associate tags with the post if provided
      if (data.tags && data.tags.length > 0) {
        await this.postTagRepository.bulkCreate(
          data.tags.map((tag) => ({ postId: post.id, tagId: tag })),
          { transaction }
        );
      }

      // Associate categories with the post if provided
      if (data.categories && data.categories.length > 0) {
        await this.postCategoryRepository.bulkCreate(
          data.categories.map((category) => ({
            postId: post.id,
            categoryId: category,
          })),
          { transaction }
        );
      }

      // Associate media links with the post if provided
      if (data.mediaLinks && data.mediaLinks.length > 0) {
        await this.mediaLinkRepository.bulkCreate(
          data.mediaLinks.map((mediaLink) => ({
            id: uuid(),
            postId: post.id,
            url: mediaLink,
            type: "image",
          })),
          { transaction }
        );
      }

      await transaction.commit();
      return post;
    } catch (error: any) {
      await transaction.rollback();
      throw new CustomError(`Failed to create post: ${error.message}`);
    }
  }

  async getAllPosts(
    limit: number,
    offset: number,
    querySearch: string
  ): Promise<{ posts: Post[]; pagination: Pagination }> {
    const { count, rows: posts } = await this.postRepository.findAndCountAll({
      limit,
      offset,
      where: querySearch ? { title: { $iLike: `%${querySearch}%` } } : {},
      include: [
        {
          model: this.userRepository,
          attributes: ["id", "email", "username"],
        },
        { model: this.tagRepository },
        { model: this.categoryRepository },
        { model: this.mediaLinkRepository },
      ],
    });
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getFeed(userId: string, limit: number, offset: number) {
    // Get the posts the user has interacted with
    const views = await this.postViewRepository.findAll({ where: { userId } });
    const votes = await this.voteRepository.findAll({
      where: { userId, type: "upvote" },
    });

    // Get the unique post IDs from the views and votes
    const postIds = [
      ...new Set([
        ...views.map((view) => view.postId),
        ...votes.map((vote) => vote.postId),
      ]),
    ];

    // Get the tags and categories from these posts
    const tags = await this.postTagRepository.findAll({
      where: { postId: { [Op.in]: postIds } },
      attributes: ["tagId"],
      group: ["tagId"],
    });

    const categories = await this.postCategoryRepository.findAll({
      where: { postId: { [Op.in]: postIds } },
      attributes: ["categoryId"],
      group: ["categoryId"],
    });

    // Get the unique tag and category IDs
    const tagIds = tags.map((tag) => tag.tagId);
    const categoryIds = categories.map((category) => category.categoryId);

    // Fetch posts that match the user's interacted tags and categories
    const { count, rows: posts } = await this.postRepository.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          { id: { [Op.in]: postIds } },
          tagIds.length > 0 ? { "$PostTags.tagId$": { [Op.in]: tagIds } } : {},
          categoryIds.length > 0
            ? { "$PostCategories.categoryId$": { [Op.in]: categoryIds } }
            : {},
        ],
      },
      include: [
        {
          model: this.userRepository,
          attributes: ["id", "email", "username"],
        },
        {
          model: this.tagRepository,
          through: { attributes: [] }, // Avoid including join table attributes
        },
        {
          model: this.categoryRepository,
          through: { attributes: [] }, // Avoid including join table attributes
        },
        {
          model: this.mediaLinkRepository,
        },
      ],
      distinct: true, // Avoid duplicate posts
    });

    // Handle pagination
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getPostById(postId: string) {
    const post = await this.postRepository.findByPk(postId, {
      include: [
        {
          model: this.userRepository,
          attributes: ["id", "email", "username"],
        },
        { model: this.tagRepository },
        { model: this.categoryRepository },
        { model: this.mediaLinkRepository },
      ],
    });
    return post;
  }

  async getPostsByAuthor(authorId: string, limit: number, offset: number) {
    const { count, rows: posts } = await this.postRepository.findAndCountAll({
      limit,
      offset,
      where: { authorId },
      include: [
        {
          model: this.userRepository,
          attributes: ["id", "email", "username"],
        },
        { model: this.tagRepository },
        { model: this.categoryRepository },
        { model: this.mediaLinkRepository },
      ],
    });
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getPostsByCategory(categoryId: string, limit: number, offset: number) {
    const { count, rows: posts } =
      await this.postCategoryRepository.findAndCountAll({
        offset,
        limit,
        where: { categoryId },
        include: [
          {
            model: this.postRepository,
            include: [
              {
                model: this.userRepository,
                attributes: ["id", "email", "username"],
              },
              { model: this.tagRepository },
              { model: this.mediaLinkRepository },
            ],
          },
        ],
      });
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getPostsByTag(tagId: string, limit: number, offset: number) {
    const { count, rows: posts } = await this.postTagRepository.findAndCountAll(
      {
        offset,
        limit,
        where: { tagId },
        include: [
          {
            model: this.postRepository,
            include: [
              {
                model: this.userRepository,
                attributes: ["id", "email", "username"],
              },
              { model: this.tagRepository },
              { model: this.categoryRepository },
              { model: this.mediaLinkRepository },
            ],
          },
        ],
      }
    );
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async updatePost(
    postId: string,
    data: {
      title?: string;
      content?: string;
      authorId: string;
      tags?: string[];
      categories?: string[];
      mediaLinks?: string[];
    }
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      // Fetch the existing post
      const post = await this.postRepository.findByPk(postId, {
        // include: [
        //   { model: this.postTagRepository, attributes: ["tagId"] },
        //   { model: this.postCategoryRepository, attributes: ["categoryId"] },
        // ],
      });

      if (!post) {
        throw new CustomError("Post not found", 404);
      }

      // Check if the user is the author of the post
      if (post.authorId !== data.authorId) {
        throw new CustomError("You are not authorized to edit this post", 403);
      }

      // Update the post details
      await post.update(
        {
          title: data.title ?? post.title,
          content: data.content ?? post.content,
        },
        { transaction }
      );

      // Check if tags are valid if they are provided
      if (data.tags && data.tags.length > 0) {
        const tags = await this.tagRepository.findAll({
          where: { id: data.tags },
        });

        if (tags.length !== data.tags.length) {
          throw new CustomError("Some tags are invalid", 400);
        }
      }

      // Check if categories are valid if they are provided
      if (data.categories && data.categories.length > 0) {
        const categories = await this.categoryRepository.findAll({
          where: { id: data.categories },
        });

        if (categories.length !== data.categories.length) {
          throw new CustomError("Some categories are invalid", 400);
        }
      }

      // Update tags if provided
      if (data.tags) {
        await this.postTagRepository.destroy({
          where: { postId: post.id },
          transaction,
        });

        await this.postTagRepository.bulkCreate(
          data.tags.map((tag) => ({ postId: post.id, tagId: tag })),
          { transaction }
        );
      }

      // Update categories if provided
      if (data.categories) {
        await this.postCategoryRepository.destroy({
          where: { postId: post.id },
          transaction,
        });

        await this.postCategoryRepository.bulkCreate(
          data.categories.map((category) => ({
            postId: post.id,
            categoryId: category,
          })),
          { transaction }
        );
      }

      // Update media links if provided
      if (data.mediaLinks) {
        await this.mediaLinkRepository.destroy({
          where: { postId: post.id },
          transaction,
        });

        await this.mediaLinkRepository.bulkCreate(
          data.mediaLinks.map((mediaLink) => ({
            id: uuid(),
            postId: post.id,
            url: mediaLink,
            type: "image",
          })),
          { transaction }
        );
      }

      await transaction.commit();
      return post;
    } catch (error: any) {
      await transaction.rollback();
      throw new CustomError(`Failed to update post: ${error.message}`);
    }
  }

  async deletePost(postId: string, authorId: string) {
    const transaction = await this.sequelize.transaction();

    try {
      // Fetch the existing post
      const post = await this.postRepository.findByPk(postId);

      if (!post) {
        throw new CustomError("Post not found", 404);
      }

      // Check if the user is the author of the post
      if (post.authorId !== authorId) {
        throw new CustomError(
          "You are not authorized to delete this post",
          403
        );
      }

      // Delete the post
      await post.destroy({ transaction });

      await transaction.commit();
      return post;
    } catch (error: any) {
      await transaction.rollback();
      throw new CustomError(`Failed to delete post: ${error.message}`);
    }
  }
}
