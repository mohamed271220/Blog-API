"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const uploadFiles = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files uploaded.");
    }
    const uploadedFiles = req.files.map((file) => file.location);
    res.status(200).send(uploadedFiles);
};
exports.uploadFiles = uploadFiles;
