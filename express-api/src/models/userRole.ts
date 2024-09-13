import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class UserRole extends Model<
    InferAttributes<UserRole>,
    InferCreationAttributes<UserRole>
  > {
    declare userId: string;
    declare roleId: string;
  }
  
  UserRole.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      roleId: {
        type: DataTypes.UUID,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_roles",
      timestamps: false,
    }
  );
  
  export default UserRole;
  