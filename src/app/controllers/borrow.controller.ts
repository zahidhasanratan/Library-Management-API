import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);

    if (!foundBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (foundBook.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available to borrow",
      });
    }

    foundBook.copies -= quantity;
    foundBook.available = foundBook.copies > 0;
    await foundBook.save();

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
};

export const getBorrowedSummary = async (_req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get summary",
      error,
    });
  }
};
