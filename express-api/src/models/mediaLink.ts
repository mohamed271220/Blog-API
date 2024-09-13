import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class MediaLink extends Model<
    InferAttributes<MediaLink>,
    InferCreationAttributes<MediaLink>
  > {
    declare id: string;
    declare postId: string;
    declare url: string;
    declare type: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
  }
  
  MediaLink.init(
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
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
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
      modelName: "MediaLink",
      tableName: "media_links",
      timestamps: true,
    }
  );
  
  export default MediaLink;
  