import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT EXCEPTION! 🔥🔥🔥 Shutting down...");
  process.exit(1);
});

dotenv.config({ path: "./.env" });
import app from "./app.js";

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server is listen on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! 🔥🔥🔥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
