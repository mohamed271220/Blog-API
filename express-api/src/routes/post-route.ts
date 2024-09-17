import express from "express";
import {
  authenticateToken,
  optionalAuthenticateToken,
} from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFeed,
  getPostById,
  getPostsByAuthor,
  getPostsByCategory,
  getPostsByTag,
  updatePost,
} from "../controllers/post-controller";
import {
  createPostValidators,
  updatePostValidators,
} from "../middleware/validators/post-validators";

const router = express.Router();

// add a new post
router.post(
  "/",
  authenticateToken,
  authorizeRoles("user"),
  createPostValidators,
  createPost
);

// get all posts
router.get("/", getAllPosts);

// get feed based on special feed
router.get("/feed", authenticateToken, authorizeRoles("user"), getFeed);

// get post by id
router.get("/:postId", optionalAuthenticateToken, getPostById);

// get posts by category
router.get("/category/:categoryId", getPostsByCategory);

// get posts by tag
router.get("/tag/:tagId", getPostsByTag);

// get posts by author
router.get("/author/:authorId", getPostsByAuthor);

// update post by id
router.put(
  "/:postId",
  authenticateToken,
  authorizeRoles("user"),
  updatePostValidators,
  updatePost
);

// delete post by id
router.delete(
  "/:postId",
  authenticateToken,
  authorizeRoles("user", "admin", "superadmin"),
  deletePost
);

export default router;
