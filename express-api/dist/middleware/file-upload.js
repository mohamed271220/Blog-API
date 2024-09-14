"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_config_1 = __importDefault(require("../config/aws-config"));
const uuid_1 = require("uuid");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
const fileUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: aws_config_1.default,
        bucket: process.env.AWS_BUCKET_NAME,
        key: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, `${(0, uuid_1.v4)()}.${ext}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        const error = isValid
            ? null
            : new Error("Invalid mime type!");
        cb(error, isValid);
    },
    limits: { fileSize: 5000000 }, // 5MB
});
exports.default = fileUpload;
/**
test file
curl -X POST http://localhost:3000/api/v1/media/upload \
  -H "Content-Type: multipart/form-data" \
  -F "photos=@/path/to/your/image.jpg"

*/ 
