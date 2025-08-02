import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import movieRoutes from "./routes/movie-route.js";

const app = express();

// 1) GLOBAL MIDDLEWARES
// HTTP HEADERS SECURE
app.use(helmet());

// FOR LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

// BODY PARSER, READING DATA FROM BODY INTO req.body
app.use(express.json({ limit: "10kb" }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION (login or query with $ like {"$gt": ""})
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS (sending html with the request)
app.use(xss());

// 2) ROUTES
app.use("/api/v1/movies", movieRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`There is no route for ${req.originalUrl}`, 404));
});

export default app;
