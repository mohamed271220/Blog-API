"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const comment_1 = __importDefault(require("./comment"));
const mediaLink_1 = __importDefault(require("./mediaLink"));
const tag_1 = __importDefault(require("./tag"));
const postTag_1 = __importDefault(require("./postTag"));
const vote_1 = __importDefault(require("./vote"));
const category_1 = __importDefault(require("./category"));
const postCategory_1 = __importDefault(require("./postCategory"));
const role_1 = __importDefault(require("./role"));
const userRole_1 = __importDefault(require("./userRole"));
const database_1 = __importDefault(require("../config/database"));
// Initialize models
exports.models = {
    User: user_1.default,
    Post: post_1.default,
    Comment: comment_1.default,
    MediaLink: mediaLink_1.default,
    Tag: tag_1.default,
    PostTag: postTag_1.default,
    Vote: vote_1.default,
    Category: category_1.default,
    PostCategory: postCategory_1.default,
    Role: role_1.default,
    UserRole: userRole_1.default,
};
// Define associations
// User has many Posts (One-to-Many)
// A user can author many posts
user_1.default.hasMany(post_1.default, { foreignKey: "authorId" });
// A post belongs to one User
post_1.default.belongsTo(user_1.default, { foreignKey: "authorId" });
// User has many Comments (One-to-Many)
// A user can write many comments
user_1.default.hasMany(comment_1.default, { foreignKey: "authorId" });
// A comment belongs to one User
comment_1.default.belongsTo(user_1.default, { foreignKey: "authorId" });
// Post has many Comments (One-to-Many)
// A post can have many comments
post_1.default.hasMany(comment_1.default, { foreignKey: "postId" });
// A comment belongs to one Post
comment_1.default.belongsTo(post_1.default, { foreignKey: "postId" });
// Post has many MediaLinks (One-to-Many)
// A post can have many media links
post_1.default.hasMany(mediaLink_1.default, { foreignKey: "postId" });
// A media link belongs to one Post
mediaLink_1.default.belongsTo(post_1.default, { foreignKey: "postId" });
// Post belongs to many Tags through PostTag (Many-to-Many)
// A post can have many tags
post_1.default.belongsToMany(tag_1.default, { through: postTag_1.default, foreignKey: "postId" });
// A tag can belong to many posts
tag_1.default.belongsToMany(post_1.default, { through: postTag_1.default, foreignKey: "tagId" });
// Post belongs to many Categories through PostCategory (Many-to-Many)
// A post can belong to many categories
post_1.default.belongsToMany(category_1.default, { through: postCategory_1.default, foreignKey: "postId" });
// A category can have many posts
category_1.default.belongsToMany(post_1.default, {
    through: postCategory_1.default,
    foreignKey: "categoryId",
});
// Post has many Votes (One-to-Many)
// A post can have many votes
post_1.default.hasMany(vote_1.default, { foreignKey: "postId" });
// A vote belongs to one Post
vote_1.default.belongsTo(post_1.default, { foreignKey: "postId" });
// User has many Votes (One-to-Many)
// A user can cast many votes
user_1.default.hasMany(vote_1.default, { foreignKey: "userId" });
// A vote belongs to one User
vote_1.default.belongsTo(user_1.default, { foreignKey: "userId" });
// Role belongs to many Users through UserRole (Many-to-Many)
role_1.default.belongsToMany(user_1.default, {
    through: userRole_1.default,
    foreignKey: "roleId",
    otherKey: "userId",
});
// User belongs to many Roles through UserRole (Many-to-Many)
user_1.default.belongsToMany(role_1.default, {
    through: userRole_1.default,
    foreignKey: "userId",
    otherKey: "roleId",
});
userRole_1.default.belongsTo(user_1.default, { foreignKey: "userId" });
userRole_1.default.belongsTo(role_1.default, { foreignKey: "roleId" });
// Sync models with database
// This will create or alter tables as necessary based on the models
database_1.default.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
});
exports.default = exports.models;
