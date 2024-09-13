import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class Tag extends Model<
    InferAttributes<Tag>,
    InferCreationAttributes<Tag>
  > {
    declare id: string;
    declare name: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
  }
  
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
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
      modelName: "Tag",
      tableName: "tags",
      timestamps: true,
    }
  );
  
  export default Tag;
  