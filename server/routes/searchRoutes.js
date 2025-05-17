import express from "express";
import axios from "axios";
import Search from "../models/Search.js";
import verifyToken from "../middlewares/verifyToken.js";
import TopSearch from "../models/TopSearch.js";

const searchRouter = express.Router();

// POST /api/search
searchRouter.post("/search", verifyToken, async (req, res) => {
  const { term } = req.body;
  const userId = req.user.id;

  if (!term)
    return res.status(400).json({ message: "Search term is required" });

  try {
    // 1. Save search to MongoDB
    await Search.create({ userId, term });

    // 2. Call Unsplash API
    const unsplashRes = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: { query: term, per_page: 20 },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    // 3. Return images
    res.json({
      results: unsplashRes.data.results,
      total: unsplashRes.data.total,
      term,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
});

searchRouter.get("/history", verifyToken, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(history);
  } catch (err) {
    console.error("Search history error:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

searchRouter.delete("/history", verifyToken, async (req, res) => {
  try {
    await Search.deleteMany({ userId: req.user.id });
    res.status(200).json({ message: "Search history cleared successfully" });
  } catch (error) {
    console.error("Delete history error:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

searchRouter.post("/", verifyToken, async (req, res) => {
  const { term } = req.body;

  try {
    const existing = await TopSearch.findOne({ term });
    if (existing) {
      existing.count += 1;
      await existing.save();
    } else {
      await TopSearch.create({ term });
    }
  } catch (err) {
    console.error("Failed to update top search", err);
  }

  res.json({ results: unsplashResults });
});

export default searchRouter;
