import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";

class PostView extends Model<
  InferAttributes<PostView>,
  InferCreationAttributes<PostView>
> {
  declare id: string;
  declare userId: string;
  declare postId: string;
  declare viewedAt: Date;
}

PostView.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    viewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "PostView",
    tableName: "post_views",
    timestamps: false,
  }
);

export default PostView;
