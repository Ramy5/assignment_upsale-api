import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect only once, don't crash on Vercel
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(DB);
    isConnected = true;
    console.log("DB connected successfully!");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

await connectDB();

export default app; // ✅ Very important
