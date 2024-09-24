import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { Category } from '../../category/category.entity';

@Table({
  tableName: 'post_categories',
  timestamps: false,
})
export class PostCategory extends Model<PostCategory> {
  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  postId: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId: string;
}
