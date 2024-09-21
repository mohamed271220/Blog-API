import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category-controller";

// /api/v1/categories
const router = express.Router();

// add a new category
router.post(
  "/",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  createCategory
);

// get all categories
router.get("/", getAllCategories);

// get a category by id
router.get("/:categoryId", getCategoryById);

// update a category by id
router.put(
  "/:categoryId/name",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  updateCategory
);

// delete a category by id
router.delete(
  "/:categoryId",
  authenticateToken,
  authorizeRoles("superadmin"),
  deleteCategory
);

export default router;
