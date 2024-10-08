import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { Tag } from '../../tag/tag.entity';

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

  @BelongsTo(() => Post, 'postId')
  post: Post;

  @BelongsTo(() => Tag, 'tagId')
  tag: Tag;
}
