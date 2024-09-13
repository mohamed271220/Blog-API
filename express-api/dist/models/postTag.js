"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PostTag extends sequelize_1.Model {
}
PostTag.init({
    postId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "posts",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    tagId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "tags",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: database_1.default,
    modelName: "PostTag",
    tableName: "post_tags",
    timestamps: false,
});
exports.default = PostTag;
