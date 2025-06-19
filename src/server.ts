import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "";

const client = new MongoClient(MONGO_URI);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

startServer();
