// @ts-nocheck
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./ads.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.get("/ads", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

app.post("/ads", (req, res) => {
  const ads = JSON.parse(fs.readFileSync(DATA_FILE));
  const newAd = { id: Date.now(), ...req.body };

  ads.push(newAd);
  fs.writeFileSync(DATA_FILE, JSON.stringify(ads, null, 2));

  res.status(201).json(newAd);
});

app.listen(PORT, () => {
  console.log(`Server working: http://localhost:${PORT}`);
});
