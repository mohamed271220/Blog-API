import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class PostCategory extends Model<
  InferAttributes<PostCategory>,
  InferCreationAttributes<PostCategory>
> {
  declare postId: string;
  declare categoryId: string;
}

PostCategory.init(
  {
    postId: {
      type: DataTypes.UUID,
      references: {
        model: "posts",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "PostCategory",
    tableName: "post_categories",
    timestamps: false,
  }
);

export default PostCategory;
