import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Vote extends Model<InferAttributes<Vote>, InferCreationAttributes<Vote>> {
  declare id: string;
  declare postId: string;
  declare userId: string;
  declare type: string; // e.g., "upvote" or "downvote"
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Vote.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["upvote", "downvote"]],
      },
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
    modelName: "Vote",
    tableName: "votes",
    timestamps: true,
  }
);

export default Vote;
