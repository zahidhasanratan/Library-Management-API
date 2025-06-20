"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
// Create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: String(error),
            });
        }
    }
});
exports.createBook = createBook;
// Get all books (with filter, sort, limit)
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sort = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort })
            .limit(limit);
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Failed to get books",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Failed to get books",
                error: String(error),
            });
        }
    }
});
exports.getAllBooks = getAllBooks;
// Get book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Failed to retrieve book",
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Failed to retrieve book",
                success: false,
                error: String(error),
            });
        }
    }
});
exports.getBookById = getBookById;
// Update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: String(error),
            });
        }
    }
});
exports.updateBook = updateBook;
// Delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Failed to delete book",
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Failed to delete book",
                success: false,
                error: String(error),
            });
        }
    }
});
exports.deleteBook = deleteBook;
