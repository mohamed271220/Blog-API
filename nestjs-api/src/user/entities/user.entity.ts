import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/comment.entity';
import { Vote } from '../../vote/vote.entity';
import { PostView } from '../../post-views/post-view.entity';
import { Role } from '../../role/role.entity';
import { UserRole } from './user-role.entity';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

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
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  resetPasswordToken: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
  })
  resetPasswordExpires: Date | null;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Vote)
  votes: Vote[];

  @HasMany(() => PostView)
  postViews: PostView[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
