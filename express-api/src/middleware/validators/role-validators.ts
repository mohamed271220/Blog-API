import { body, param, validationResult } from "express-validator";
import { handleValidationErrors } from "./report-errors";

// Validators for creating a role
export const createRoleValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 })
    .withMessage("Name must not exceed 255 characters"),
  ,
  body("permissions").optional(),
  handleValidationErrors,
];

// Validators for updating a role
export const updateRoleValidators = [
  param("roleId").isUUID().withMessage("Invalid role ID"),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 255 })
    .withMessage("Name must not exceed 255 characters"),
  handleValidationErrors,
];
