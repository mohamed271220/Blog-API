import express from "express";
import fileUpload from "../middleware/file-upload";
import { uploadFiles } from "../controllers/upload-controller";
import { authenticateToken } from "../middleware/auth-middleware";

///api/v1/media
const router = express.Router();

router.post(
  "/upload",
  authenticateToken,
  fileUpload.array("photos", 40),
  uploadFiles
);

export default router;
