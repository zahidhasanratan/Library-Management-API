"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "At least one copy must be borrowed"],
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
