import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";

const router = express.Router();

// Get Views by Post ID
router.get("/:postId", getViewsByPostId);

// Get Views by User ID
router.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles("user"),
  getViewsByUserId
);

// Get Views by category
router.get(
  "/category/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  getViewsByCategoryId
);

// Get Views by tag
router.get(
  "/tag/:tagId",
  authenticateToken,
  authorizeRoles("admin"),
  getViewsByTagId
);

export default router;
