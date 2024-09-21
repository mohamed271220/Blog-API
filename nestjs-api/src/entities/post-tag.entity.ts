import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

@Table({
  tableName: 'post_tags',
  timestamps: false,
})
export class PostTag extends Model<PostTag> {
  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  postId: string;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  tagId: string;
}
