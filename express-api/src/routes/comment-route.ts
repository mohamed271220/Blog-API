import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";
import {
  createComment,
  deleteComment,
  getAllCommentsIncludingDeleted,
  getCommentById,
  getCommentByIdIncludingDeleted,
  getCommentTree,
  getTopLevelComments,
  updateComment,
} from "../controllers/comment-controller";
import {
  validateCreateComment,
  validateUpdateComment,
} from "../middleware/validators/comment-validators";

const router = express.Router();

// Add a new comment to a post
router.post(
  "/post/:postId",
  authenticateToken,
  authorizeRoles("user"),
  validateCreateComment,
  createComment
);

// Get top-level comments of a post
router.get("/post/:postId/top-level", getTopLevelComments);

// Get the entire comment tree of a post
router.get("/post/:postId/tree", getCommentTree);

// Get replies of a specific comment
router.get("/:commentId", getCommentById);

// Update a comment by its ID
router.put(
  "/:commentId/content",
  authenticateToken,
  authorizeRoles("user"),
  validateUpdateComment,
  updateComment
);

// Delete a comment by its ID (soft delete)
router.delete(
  "/:commentId",
  authenticateToken,
  authorizeRoles("user"),
  deleteComment
);

// get all comments including deleted ones
router.get(
  "/post/:postId/tree/deleted",
  authenticateToken,
  authorizeRoles("admin"),
  getAllCommentsIncludingDeleted
);

router.get(
  "/:commentId/deleted",
  authenticateToken,
  authorizeRoles("admin"),
  getCommentByIdIncludingDeleted
);

export default router;
