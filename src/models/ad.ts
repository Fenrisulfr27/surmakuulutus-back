import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    birthYear: { type: String, required: true },
    deathYear: { type: String, required: true },
    poem: String,
    bottomText: String,
    topText: String,
  },
  { timestamps: true },
);

export const Ad = mongoose.model("Ad", adSchema);
