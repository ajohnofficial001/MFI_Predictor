const mutualFundModel = require('../models/mutualFundModel');
const mutualFundService = require('../services/mutualFundService');

async function getMutualFunds(req, res) {
    const funds = mutualFundModel.getAllMutualFunds();
    res.json(funds);
}

async function calculateFutureValue(req, res) {
    const { ticker, initialInvestment, timeHorizon } = req.body;
    const fund = mutualFundModel.getMutualFundByTicker(ticker);

    if (!fund) {
        return res.status(404).json({ error: 'Mutual fund not found' });
    }

    try {
        const riskFreeRate = 0.0457; // Example hardcoded value
        const marketReturnRate = await mutualFundService.getMarketReturnRate();
        console.log(ticker);
        //const beta = -0.6393704983386446;
        const beta = await mutualFundService.getBeta(ticker);
        console.log('beta:', beta);
        const rate = riskFreeRate + beta * (marketReturnRate - riskFreeRate);
        const futureValue = initialInvestment * Math.exp(rate * timeHorizon);

        res.json({
            ticker,
            mutualFundName: fund.name,
            marketReturnRate,
            initialInvestment,
            timeHorizon,
            riskFreeRate,
            beta,
            futureValue: futureValue.toFixed(2),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error calculating future value' });
    }
}

module.exports = { getMutualFunds, calculateFutureValue };