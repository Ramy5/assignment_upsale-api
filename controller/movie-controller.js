import ApiFeatures from "../utils/ApiFeatures.js";
import AppError from "../utils/AppError.js";
import CatchAsync from "../utils/CatchAsync.js";
import Movie from "../models/movie-model.js";

const createMovie = CatchAsync(async (req, res) => {
  const newDoc = await Movie.create(req.body);

  res.status(201).json({
    status: "Success",
    message: "Movie created successfully",
    data: {
      movie: newDoc,
    },
  });
});

const deleteMovie = CatchAsync(async (req, res, next) => {
  const doc = await Movie.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found for this ID", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Movie deleted successfully",
    data: null,
  });
});

const updateMovie = CatchAsync(async (req, res, next) => {
  const doc = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!doc) {
    return next(new AppError("No document found for this ID", 404));
  }

  res.status(200).json({
    status: "Success",
    message: "Movie updated successfully",
    data: {
      movie: doc,
    },
  });
});

const getMovie = CatchAsync(async (req, res, next) => {
  const doc = await Movie.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found for this ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      movies: doc,
    },
  });
});

const getAllMovies = CatchAsync(async (req, res, next) => {
  const allDocsInDB = await Movie.find();

  // EXECUTE QUERY
  const features = new ApiFeatures(Movie.find(), req.query)
    .filters()
    .pagination()
    .sort()
    .limitFields();

  const allDoc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "Success",
    perPage: Number(req.query.limit) || 10,
    page: Number(req.query.page) || 1,
    total: allDocsInDB.length,
    pages: Math.ceil(allDocsInDB.length / (Number(req.query.limit) || 10)),
    result: allDoc.length,
    data: {
      movies: allDoc,
    },
  });
});

export { createMovie, deleteMovie, updateMovie, getMovie, getAllMovies };
