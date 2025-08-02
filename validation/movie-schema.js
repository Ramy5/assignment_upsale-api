import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["movie", "tv_show"]),
  director: z
    .string()
    .min(1, { message: "Director name must be at least 1 character long" }),
  budget: z
    .string()
    .min(1, { message: "Budget must be at least 1 character long" }),
  location: z
    .string()
    .min(1, { message: "Location must be at least 1 character long" }),
  duration: z
    .string()
    .min(1, { message: "Duration must be at least 1 character long" }),
  year: z
    .string()
    .min(1, { message: "Year must be at least 1 character long" }),
  details: z
    .string()
    .min(1, { message: "Details must be at least 1 character long" }),
});
