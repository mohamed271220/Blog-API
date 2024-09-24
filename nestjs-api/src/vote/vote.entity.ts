import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';

@Table({
  tableName: 'votes',
  timestamps: true,
})
export class Vote extends Model<Vote> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

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
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [['upvote', 'downvote']],
    },
  })
  type: string; // "upvote" or "downvote"

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

  @BelongsTo(() => Post)
  post: Post;

  @BelongsTo(() => User)
  user: User;
}
