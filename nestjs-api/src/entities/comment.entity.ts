import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { User } from './user.entity';

@Table({
  tableName: 'comments',
  timestamps: true,
  paranoid: true,
})
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  parentId: string | null;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  postId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  authorId: string;

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

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date | null;

  @BelongsTo(() => Post)
  post: Post;

  @BelongsTo(() => User)
  author: User;

  @BelongsTo(() => Comment)
  parent: Comment;

  @HasMany(() => Comment)
  replies: Comment[];
}
