const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ticker: { type: String, required: true },
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Stock", StockSchema);
