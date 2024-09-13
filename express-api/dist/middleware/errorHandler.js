"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const CustomError_1 = require("../utils/CustomError");
function errorHandler(err, req, res, next) {
    const statusCode = err instanceof CustomError_1.CustomError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        details: err instanceof CustomError_1.CustomError ? err.details : undefined,
    });
}
