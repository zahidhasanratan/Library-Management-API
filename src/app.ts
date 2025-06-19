import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRoutes from "./app/routes/book.route";
import borrowRoutes from "./app/routes/borrow.routes";
import { errorHandler } from "./app/middlewares/errorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

// ✅ API routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// ✅ Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API is running");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {
      path: req.originalUrl,
    },
  });
});

app.use(errorHandler);

export default app;
