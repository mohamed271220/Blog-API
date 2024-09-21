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
import { User } from './User.entity';
import { Comment } from './Comment.entity';
import { MediaLink } from './media-link.entity';
import { Tag } from './tag.entity';
import { PostTag } from './post-tag.entity';
import { Category } from './Category.entity';
import { PostCategory } from './post-category.entity';
import { Vote } from './vote.entity';
import { PostView } from './post-view.entity';

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

  @BelongsTo(() => User)
  author: User;

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
