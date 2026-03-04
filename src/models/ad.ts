import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    birthYear: { type: Number },
    deathYear: { type: Number },
    poem: String,
    bottomText: String,
    topText: String,
  },
  { timestamps: true },
);

adSchema.index({ createdAt: -1 });

export const Ad = mongoose.model("Ad", adSchema);
