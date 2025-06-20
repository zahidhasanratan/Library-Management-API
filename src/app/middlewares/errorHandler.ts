import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
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
