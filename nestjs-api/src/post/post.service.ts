import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { PostView } from 'src/post-views/post-view.entity';
import { PostTag } from './entities/post-tag.entity';
import { PostCategory } from './entities/post-category.entity';
import { MediaLink } from './entities/media-link.entity';
import { Tag } from 'src/tag/tag.entity';
import { Category } from 'src/category/category.entity';
import { Vote } from 'src/vote/vote.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuid } from 'uuid';
import { Sequelize } from 'sequelize-typescript';
import { getPagination, Pagination } from 'src/shared/utils/pagination';
import { Op } from 'sequelize';
import { UpdatePostDto } from './dto/edit-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(PostView)
    private postViewModel: typeof PostView,
    @InjectModel(PostTag)
    private postTagModel: typeof PostTag,
    @InjectModel(PostCategory)
    private postCategoryModel: typeof PostCategory,
    @InjectModel(MediaLink)
    private mediaLinkModel: typeof MediaLink,
    @InjectModel(Tag)
    private tagModel: typeof Tag,
    @InjectModel(Category)
    private categoryModel: typeof Category,
    @InjectModel(Vote)
    private voteModel: typeof Vote,
    @Inject(Sequelize) private readonly sequelize: Sequelize,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User) {
    const authorId = user.id;
    const transaction = await this.sequelize.transaction();

    try {
      // Check if tags are valid if they are provided
      if (createPostDto.tags && createPostDto.tags.length > 0) {
        const tags = await this.tagModel.findAll({
          where: { id: createPostDto.tags },
        });

        if (tags.length !== createPostDto.tags.length) {
          throw new BadRequestException('Some tags are invalid');
        }
      }

      // Check if categories are valid if they are provided
      if (createPostDto.categories && createPostDto.categories.length > 0) {
        const categories = await this.categoryModel.findAll({
          where: { id: createPostDto.categories },
        });

        if (categories.length !== createPostDto.categories.length) {
          throw new BadRequestException('Some categories are invalid');
        }
      }

      // Create the post
      const post = await this.postModel.create(
        {
          id: uuid(),
          title: createPostDto.title,
          content: createPostDto.content,
          authorId: authorId,
        },
        { transaction },
      );

      // Ensure the post was created
      if (!post) {
        throw new BadRequestException('Failed to create post');
      }

      // Associate tags with the post if provided
      if (createPostDto.tags && createPostDto.tags.length > 0) {
        await this.postTagModel.bulkCreate(
          createPostDto.tags.map((tag) => ({ postId: post.id, tagId: tag })),
          { transaction },
        );
      }

      // Associate categories with the post if provided
      if (createPostDto.categories && createPostDto.categories.length > 0) {
        await this.postCategoryModel.bulkCreate(
          createPostDto.categories.map((category) => ({
            postId: post.id,
            categoryId: category,
          })),
          { transaction },
        );
      }
      console.log(createPostDto.mediaLinks);

      // Associate media links with the post if provided
      if (createPostDto.mediaLinks && createPostDto.mediaLinks.length > 0) {
        await this.mediaLinkModel.bulkCreate(
          createPostDto.mediaLinks.map((mediaLink) => ({
            id: uuid(),
            postId: post.id,
            url: mediaLink,
            type: 'image',
          })),
          { transaction },
        );
      }

      await transaction.commit();
      return post;
    } catch (error: any) {
      await transaction.rollback();
      throw new BadRequestException(`Failed to create post: ${error.message}`);
    }
  }
  async getAllPosts(
    querySearch: string,
    limit: number,
    offset: number,
  ): Promise<{ posts: Post[]; pagination: Pagination }> {
    const { count, rows: posts } = await this.postModel.findAndCountAll({
      limit,
      offset,
      raw: true,
      nest: true,
      where: querySearch ? { title: { $iLike: `%${querySearch}%` } } : {},
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'email', 'username'],
        },
        { model: this.tagModel },
        { model: this.categoryModel },
        { model: this.mediaLinkModel },
      ],
    });
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getFeed(user: User, limit: number, offset: number) {
    const userId = user.id;

    // Fetch post IDs that the user has interacted with via views and upvotes
    const postViews = await this.postViewModel.findAll({ where: { userId } });
    const upvotes = await this.voteModel.findAll({
      where: { userId, type: 'upvote' },
    });

    const postIds = [
      ...new Set([
        ...postViews.map((view) => view.postId),
        ...upvotes.map((vote) => vote.postId),
      ]),
    ];

    // Fetch unique tag and category IDs associated with the posts the user has interacted with
    const [tags, categories] = await Promise.all([
      this.postTagModel.findAll({
        raw: true,
        nest: true,
        where: { postId: { [Op.in]: postIds } },
        attributes: ['tagId'],
        group: ['tagId'],
      }),
      this.postCategoryModel.findAll({
        raw: true,
        nest: true,
        where: { postId: { [Op.in]: postIds } },
        attributes: ['categoryId'],
        group: ['categoryId'],
      }),
    ]);

    const tagIds = tags.map((tag) => tag.tagId);
    const categoryIds = categories.map((category) => category.categoryId);

    // Fetch posts matching user interactions and associated tags and categories
    const { count, rows: posts } = await this.postModel.findAndCountAll({
      raw: true,
      nest: true,
      limit,
      offset,
      where: {
        [Op.or]: [
          { id: { [Op.in]: postIds } },
          ...(tagIds.length > 0
            ? [{ '$PostTags.tagId$': { [Op.in]: tagIds } }]
            : []),
          ...(categoryIds.length > 0
            ? [{ '$PostCategories.categoryId$': { [Op.in]: categoryIds } }]
            : []),
        ],
      },
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'email', 'username'],
        },
        {
          model: this.tagModel,
          as: 'tags', // Ensure this matches your association
        },
        {
          model: this.categoryModel,
          as: 'categories', // Ensure this matches your association
        },
        {
          model: this.mediaLinkModel,
        },
      ],
      distinct: true, // Avoid duplicate posts
    });

    // Handle pagination
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getPostById(user: User, postId: string): Promise<Post> {
    const userId = user.id;
    await this.postViewModel.create({
      id: uuid(),
      postId,
      userId,
      viewedAt: new Date(),
    });
    const post = await this.postModel.findByPk(postId, {
      raw: true,
      nest: true,
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'email', 'username'],
        },
        { model: this.tagModel },
        { model: this.categoryModel },
        { model: this.mediaLinkModel },
      ],
    });
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    return post;
  }

  async getPostsByCategory(categoryId: string, limit: number, offset: number) {
    const category = await this.categoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const { count, rows: posts } = await this.postCategoryModel.findAndCountAll(
      {
        raw: true,
        nest: true,
        offset,
        limit,
        where: { categoryId },
        include: [
          {
            model: this.postModel,
            include: [
              {
                model: this.userModel,
                attributes: ['id', 'email', 'username'],
              },
              { model: this.tagModel },
              { model: this.mediaLinkModel },
            ],
          },
        ],
      },
    );
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getPostsByTag(tagId: string, limit: number, offset: number) {
    const tag = await this.tagModel.findByPk(tagId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    const { count, rows: posts } = await this.postTagModel.findAndCountAll({
      raw: true,
      nest: true,
      offset,
      limit,
      where: { tagId },
      include: [
        {
          model: this.postModel,
          include: [
            {
              model: this.userModel,
              attributes: ['id', 'email', 'username'],
            },
            { model: this.tagModel },
            { model: this.categoryModel },
            { model: this.mediaLinkModel },
          ],
        },
      ],
    });
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async getPostsByAuthor(authorId: string, limit: number, offset: number) {
    const author = await this.userModel.findByPk(authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const { count, rows: posts } = await this.postModel.findAndCountAll({
      raw: true,
      nest: true,
      limit,
      offset,
      where: { authorId },
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'email', 'username'],
        },
        { model: this.tagModel },
        { model: this.categoryModel },
        { model: this.mediaLinkModel },
      ],
    });
    const pagination = getPagination(count, limit, offset);
    return { posts, pagination };
  }

  async updatePost(user: User, postId: string, data: UpdatePostDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const userId = user.id;
      // Fetch the existing post
      const post = await this.postModel.findByPk(postId, {
        // include: [
        //   { model: this.postTagModel, attributes: ["tagId"] },
        //   { model: this.postCategoryModel, attributes: ["categoryId"] },
        // ],
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      // Check if the user is the author of the post
      if (post.authorId !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to edit this post',
        );
      }

      // Update the post details
      await post.update(
        {
          title: data.title ?? post.title,
          content: data.content ?? post.content,
        },
        { transaction },
      );

      // Check if tags are valid if they are provided
      if (data.tags && data.tags.length > 0) {
        const tags = await this.tagModel.findAll({
          where: { id: data.tags },
        });

        if (tags.length !== data.tags.length) {
          throw new BadRequestException('Some tags are invalid');
        }
      }

      // Check if categories are valid if they are provided
      if (data.categories && data.categories.length > 0) {
        const categories = await this.categoryModel.findAll({
          where: { id: data.categories },
        });

        if (categories.length !== data.categories.length) {
          throw new BadRequestException('Some categories are invalid');
        }
      }

      // Update tags if provided
      if (data.tags) {
        await this.postTagModel.destroy({
          where: { postId: post.id },
          transaction,
        });

        await this.postTagModel.bulkCreate(
          data.tags.map((tag) => ({ postId: post.id, tagId: tag })),
          { transaction },
        );
      }

      // Update categories if provided
      if (data.categories) {
        await this.postCategoryModel.destroy({
          where: { postId: post.id },
          transaction,
        });

        await this.postCategoryModel.bulkCreate(
          data.categories.map((category) => ({
            postId: post.id,
            categoryId: category,
          })),
          { transaction },
        );
      }

      // Update media links if provided
      if (data.mediaLinks) {
        await this.mediaLinkModel.destroy({
          where: { postId: post.id },
          transaction,
        });

        await this.mediaLinkModel.bulkCreate(
          data.mediaLinks.map((mediaLink) => ({
            id: uuid(),
            postId: post.id,
            url: mediaLink,
            type: 'image',
          })),
          { transaction },
        );
      }

      await transaction.commit();
      return post;
    } catch (error: any) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        `Failed to update post: ${error.message}`,
      );
    }
  }

  async deletePost(user: User, postId: string): Promise<{ message: string }> {
    const userId = user.id;
    const transaction = await this.sequelize.transaction();

    try {
      // Fetch the post
      const post = await this.postModel.findByPk(postId);

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      // Check if the user is the author of the post
      if (post.authorId !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to delete this post',
        );
      }

      // Delete the post
      await post.destroy({ transaction });

      await transaction.commit();
      return { message: 'Post deleted successfully' };
    } catch (error: any) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        `Failed to delete post: ${error.message}`,
      );
    }
  }
}
