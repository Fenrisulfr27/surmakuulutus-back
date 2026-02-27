// @ts-nocheck
import express from "express";
import mongoose from "mongoose";
import { Ad } from "./models/Ad.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  }),
);

mongoose;
mongoose
  .connect("mongodb://mongo:27017/surmakuulutus")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/ads/:id", async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: "Kuulutust ei leitud" });
    }

    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: "Vale ID formaat" });
  }
});

app.post("/ads", async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, "0.0.0.0", () => console.log("Server töötab port 5000"));
