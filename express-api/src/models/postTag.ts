import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class PostTag extends Model<
    InferAttributes<PostTag>,
    InferCreationAttributes<PostTag>
  > {
    declare postId: string;
    declare tagId: string;
  }
  
  PostTag.init(
    {
      postId: {
        type: DataTypes.UUID,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        type: DataTypes.UUID,
        references: {
          model: "tags",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "PostTag",
      tableName: "post_tags",
      timestamps: false,
    }
  );
  
  export default PostTag;
  