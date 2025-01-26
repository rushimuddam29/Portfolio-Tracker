const express = require("express");
const axios = require("axios");
const Stock = require("../models/Stock");
const router = express.Router();

// Get all stocks
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    const totalValue = await calculatePortfolioValue(stocks);
    res.json({ stocks, totalValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new stock
router.post("/", async (req, res) => {
  const { name, ticker, quantity, buyPrice } = req.body;
  const stock = new Stock({ name, ticker, quantity, buyPrice });
  try {
    const savedStock = await stock.save();
    res.status(201).json(savedStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a stock
router.put("/:id", async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a stock
router.delete("/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: "Stock deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Utility to calculate portfolio value
async function calculatePortfolioValue(stocks) {
  const apiKey = process.env.STOCK_API_KEY;
  let totalValue = 0;

  for (let stock of stocks) {
    const { ticker, quantity } = stock;
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: ticker,
          apikey: apiKey,
        },
      });
      const currentPrice = parseFloat(
        response.data["Global Quote"]["05. price"]
      );
      totalValue += currentPrice * quantity;
    } catch (err) {
      console.error(`Error fetching price for ${ticker}:`, err.message);
    }
  }
  return totalValue;
}

module.exports = router;
