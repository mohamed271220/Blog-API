import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { PostCategory } from 'src/post/entities/post-category.entity';
import { Post } from '../post/entities/post.entity';

@Table({
  tableName: 'categories',
  timestamps: false,
})
export class Category extends Model {
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
  name: string;

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

  @BelongsToMany(() => Post, () => PostCategory, 'categoryId', 'postId')
  posts: Post[];
}
