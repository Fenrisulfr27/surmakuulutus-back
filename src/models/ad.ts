import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
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
