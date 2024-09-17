import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { handleValidationErrors } from "./report-errors";

// Validator for creating a comment
export const validateCreateComment = [
  param("postId").isUUID().withMessage("Invalid post ID"),
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content cannot be empty"),
  body("parentId").optional().isUUID().withMessage("Invalid parent ID"),
  handleValidationErrors,
];

// Validator for updating a comment
export const validateUpdateComment = [
  param("commentId").isUUID().withMessage("Invalid comment ID"),
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content cannot be empty"),
  handleValidationErrors,
];
