import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Ad } from "./models/ad.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://surmakuulutus.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.get("/ads", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const totalAds = await Ad.countDocuments();

    const ads = await Ad.find()
      .sort({ createdAt: -1 }) // uuemad ees (soovituslik)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalAds / limit);

    res.json({
      data: ads,
      totalPages,
      currentPage: page,
      totalAds,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});
app.get("/ads/:id", async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: "Kuulutust ei leitud" });
    }

    res.json(ad);
  } catch {
    res.status(400).json({ error: "Vale ID formaat" });
  }
});

app.post("/ads", async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ error: message });
  }
});

app.listen(PORT, () => console.log(`Server töötab port ${PORT}`));
