import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";

import movieRoutes from "./routes/movie-route.js";

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use("/api/v1/movies", movieRoutes);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on this server!` });
});

export default app;
