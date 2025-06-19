import app from "./app";
import { Request, Response } from "express";

const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World ratan!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
