import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

const connectDB = async () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  await mongoose.connect(DB);
  console.log("DB connected successfully!");
};

connectDB();

// Required export for Vercel
export default app;
