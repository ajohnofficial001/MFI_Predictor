const express = require("express");
const cors = require("cors");
const mutualFundRoutes = require("./routes/mutualFundRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Instead of bodyParser.json()

// Root Test Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

// Mutual Fund API Routes
app.use("/api/mutualfunds", mutualFundRoutes);

// ❌ NO app.listen(PORT), as Vercel does not use a persistent server

// Export Express app for Vercel as a Serverless Function
module.exports = app;
