const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mutualFundRoutes = require('./routes/mutualFundRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/mutualfunds', mutualFundRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
