import express, { Application } from "express";
import cors from "cors";
import bookRoutes from "./app/routes/book.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Library Management API is running");
});

export default app;
