"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./app/routes/book.route"));
const borrow_routes_1 = __importDefault(require("./app/routes/borrow.routes"));
const errorHandler_1 = require("./app/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ API routes
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_routes_1.default);
// ✅ Root route
app.get("/", (req, res) => {
    res.send("Library Management API is running");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            path: req.originalUrl,
        },
    });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
