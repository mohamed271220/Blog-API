import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import { authorizeRoles } from "../middleware/role-middleware";
import * as userController from "../controllers/user-controller";
// /api/v1/users
const router = express.Router();

// get all users with their roles
router.get(
  "/",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  userController.getUsers
);

// get roles of a user
router.get(
  "/:userId",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  userController.getUser
);

// add an user role by id
router.post(
  "/:userId/role",
  authenticateToken,
  authorizeRoles("superadmin"),
  userController.addNewRoleToUser
);

// update user's (email and username) by id
router.put(
  "/:userId",
  authenticateToken,
  authorizeRoles("superadmin"),
  userController.updateUser
);

// delete user by id
router.delete(
  "/:userId",
  authenticateToken,
  authorizeRoles("superadmin"),
  userController.deleteUser
);

export default router;
