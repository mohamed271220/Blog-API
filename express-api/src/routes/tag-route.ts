import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag-controller";
// /api/v1/tags
const router = express.Router();

// add a new tag
router.post(
  "/",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  createTag
);

// get all tags
router.get("/", getAllTags);

// get a tag by id
router.get("/:tagId", getTagById);

// update a tag by id
router.put(
  "/:tagId/name",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  updateTag
);

// delete a tag by id
router.delete(
  "/:tagId",
  authenticateToken,
  authorizeRoles("superadmin"),
  deleteTag
);

export default router;
