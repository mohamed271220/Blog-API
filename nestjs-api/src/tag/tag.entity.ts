import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post } from '../post/entities/post.entity';
import { PostTag } from '../post/entities/post-tag.entity';

@Table({
  tableName: 'tags',
  timestamps: true,
})
export class Tag extends Model<Tag> {
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

  @BelongsToMany(() => Post, () => PostTag)
  posts: Post[];
}
