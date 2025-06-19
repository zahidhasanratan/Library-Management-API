import { Request, Response } from "express";
import { Book } from "../models/book.model";

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

// Get all books (with filter, sort, limit)
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string | undefined;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sort = (req.query.sort as string) === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: Record<string, any> = {};
    if (filter) {
      query.genre = filter;
    }

    // Fetch books from DB with filter, sort and limit
    const books = await Book.find(query)
      .sort({ [sortBy]: sort })
      .limit(limit);

    return res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to get books",
      error,
    });
  }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve book",
      success: false,
      error,
    });
  }
};

// Update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

// Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to delete book",
      success: false,
      error,
    });
  }
};
