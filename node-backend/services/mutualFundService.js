const axios = require('axios');
const mutualFundModel = require('../models/mutualFundModel');

async function getMarketReturnRate() {
    const url = 'https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json';
    try {
        const response = await axios.get(url);
        const observations = response.data.observations;
        const firstDayValue = parseFloat(observations[0].value);
        const lastDayValue = parseFloat(observations[observations.length - 1].value);
        return (lastDayValue - firstDayValue) / firstDayValue;
    } catch (error) {
        console.error('Error fetching market return rate:', error);
        return 0.1572; // Fallback hardcoded value
    }
}

async function getBeta(ticker) {
    const url = `https://api.newtonanalytics.com/stock-beta/?ticker=${ticker}&index=%5EGSPC&interval=1mo&observations=12`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching beta: ', error);
        return mutualFundModel.getMutualFundByTicker(ticker)?.beta || 0;
    }
}

module.exports = { getMarketReturnRate, getBeta };