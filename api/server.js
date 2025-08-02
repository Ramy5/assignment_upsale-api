import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(DB);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
