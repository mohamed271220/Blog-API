import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
  > {
    declare id: string;
    declare postId: string;
    declare authorId: string;
    declare content: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
  }
  
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
      timestamps: true,
    }
  );
  
  export default Comment;
  