"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_upload_1 = __importDefault(require("../middleware/file-upload"));
const upload_controller_1 = require("../controllers/upload-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const router = express_1.default.Router();
router.post("/upload", auth_middleware_1.authenticateToken, file_upload_1.default.array("photos", 40), upload_controller_1.uploadFiles);
exports.default = router;
