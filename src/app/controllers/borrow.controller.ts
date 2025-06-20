import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);

    if (!foundBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    if (foundBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available to borrow",
      });
      return;
    }

    foundBook.copies -= quantity;
    foundBook.available = foundBook.copies > 0;
    await foundBook.save();

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};

export const getBorrowedSummary = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};
