import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
  > {
    declare id: string;
    declare name: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
  }
  
  Role.init(
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
      modelName: "Role",
      tableName: "roles",
      timestamps: true,
    }
  );
  
  export default Role;
  