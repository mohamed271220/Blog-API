import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../config/database";
import Role from "./role";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare resetPasswordToken: string | null;
  declare resetPasswordExpires: Date | null;
  // Method for getting associated roles
  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true, // This field can be null
      defaultValue: null,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true, // This field can be null
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
