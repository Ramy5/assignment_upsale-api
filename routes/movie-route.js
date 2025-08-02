import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../controller/movie-controller.js";
import { validate } from "../middleware/validate-middleware.js";
import { movieSchema } from "../validation/movie-schema.js";

const router = express.Router();

router.route("/").get(getAllMovies).post(validate(movieSchema), createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default router;
