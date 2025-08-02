import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "tv_show"], required: true },
  director: { type: String, required: true },
  budget: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  year: { type: String, required: true },
  details: { type: String, required: true },
});

const Movie = mongoose.model("Movie", entrySchema);

export default Movie;
