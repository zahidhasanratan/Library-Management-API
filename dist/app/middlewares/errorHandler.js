"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    let statusCode = 500;
    let message = "Something went wrong";
    // Handle Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
    }
    // Handle invalid ObjectId cast error
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};
exports.errorHandler = errorHandler;
