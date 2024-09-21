import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";
import {
  createVote,
  deleteVote,
  getVotesByPostId,
  getVotesByUserId,
  getVotesByCategoryId,
  getVotesByTagId,
} from "../controllers/vote-controller";

// /api/v1/votes
const router = express.Router();

// Create a vote
router.post(
  "/post/:postId",
  authenticateToken,
  authorizeRoles("user"),
  createVote
);

// remove vote
router.delete(
  "/:voteId",
  authenticateToken,
  authorizeRoles("user"),
  deleteVote
);

// Get Votes by Post ID
router.get("/post/:postId", getVotesByPostId);

// TODO: Get upvotes of a post by post id
// TODO: Get downvotes of a post by post id

// Get Votes by User
router.get(
  "/user",
  authenticateToken,
  authorizeRoles("user"),
  getVotesByUserId
);

// Get Votes by category
router.get(
  "/category/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  getVotesByCategoryId
);

// Get Votes by tag
router.get(
  "/tag/:tagId",
  authenticateToken,
  authorizeRoles("admin"),
  getVotesByTagId
);

export default router;
