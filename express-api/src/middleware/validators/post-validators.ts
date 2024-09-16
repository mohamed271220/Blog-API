import { body, param, validationResult } from "express-validator";
import { handleValidationErrors } from "./report-errors";

// Validators for creating a post
export const createPostValidators = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),
  body("authorId").isUUID().withMessage("Invalid author ID"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag: any) => typeof tag === "string"))
    .withMessage("Each tag must be a string"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .custom((categories) =>
      categories.every((category: any) => typeof category === "string")
    )
    .withMessage("Each category must be a string"),
  body("mediaLinks")
    .optional()
    .isArray()
    .withMessage("Media links must be an array")
    .custom((mediaLinks) =>
      mediaLinks.every((link: any) => typeof link === "string")
    )
    .withMessage("Each media link must be a string"),
  handleValidationErrors,
];

// Validators for updating a post
export const updatePostValidators = [
  param("postId").isUUID().withMessage("Invalid post ID"),
  body("title").optional().isString().withMessage("Title must be a string"),
  body("content").optional().isString().withMessage("Content must be a string"),
  body("authorId").isUUID().withMessage("Invalid author ID"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag: any) => typeof tag === "string"))
    .withMessage("Each tag must be a string"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .custom((categories) =>
      categories.every((category: any) => typeof category === "string")
    )
    .withMessage("Each category must be a string"),
  body("mediaLinks")
    .optional()
    .isArray()
    .withMessage("Media links must be an array")
    .custom((mediaLinks) =>
      mediaLinks.every((link: any) => typeof link === "string")
    )
    .withMessage("Each media link must be a string"),
  handleValidationErrors,
];
