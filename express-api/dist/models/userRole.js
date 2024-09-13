"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserRole extends sequelize_1.Model {
}
UserRole.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "roles",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: database_1.default,
    modelName: "UserRole",
    tableName: "user_roles",
    timestamps: false,
});
exports.default = UserRole;
