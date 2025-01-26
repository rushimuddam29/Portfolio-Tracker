const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const stockRoutes = require("./routes/stocks");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/stocks", stockRoutes);

// Start the server
const PORT = 4000;
app.listen(4000, () => console.log(`Server running on port ${PORT}`));
