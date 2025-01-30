const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mutualFundRoutes = require("./routes/mutualFundRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/mutualfunds", mutualFundRoutes);

const PORT = 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

// Export Express app for Vercel
module.exports = app;
