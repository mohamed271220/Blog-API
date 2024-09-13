"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PostCategory extends sequelize_1.Model {
}
PostCategory.init({
    postId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "posts",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    categoryId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "categories",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: database_1.default,
    modelName: "PostCategory",
    tableName: "post_categories",
    timestamps: false,
});
exports.default = PostCategory;
