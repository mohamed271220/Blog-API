import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/comment.entity';
import { MediaLink } from '../../entities/media-link.entity';
import { Tag } from '../../tag/tag.entity';
import { PostTag } from './post-tag.entity';
import { Category } from '../../category/category.entity';
import { PostCategory } from './post-category.entity';
import { Vote } from '../../vote/vote.entity';
import { PostView } from '../../post-views/post-view.entity';

@Table({
  tableName: 'posts',
  timestamps: true,
})
export class Post extends Model<Post> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  authorId: string;

  @BelongsTo(() => User, { foreignKey: 'authorId', targetKey: 'id' })
  author: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt?: Date;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => MediaLink)
  mediaLinks: MediaLink[];

  @BelongsToMany(() => Tag, () => PostTag)
  tags: Tag[];

  @BelongsToMany(() => Category, () => PostCategory)
  categories: Category[];

  @HasMany(() => Vote)
  votes: Vote[];

  @HasMany(() => PostView)
  postViews: PostView[];
}
