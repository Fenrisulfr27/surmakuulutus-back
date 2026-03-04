import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    birthYear: String,
    deathYear: String,
    poem: String,
    bottomText: String,
    topText: String,
  },
  { timestamps: true },
);

export const Ad = mongoose.model("Ad", adSchema);
