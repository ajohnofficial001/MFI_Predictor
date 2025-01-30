const mutualFunds = {
    'FXAIX': ['Fidelity 500 Index Fund', -0.6393], 
    'VFIAX': ['Vanguard 500 Index Fund; Admiral', -0.5432], 
    'VFFSX': ['Vanguard 500 Index Fund; Institutional Select', -0.5427], 
    'VIIIX': ['Vanguard Institutional Index Fund; Inst Plus', -0.5268], 
    'SWPPX': ['Schwab S&P 500 Index Fund', -0.6381], 
    'FUSEX': ['Fidelity Spartan 500 Index Fund; Investor', -0.5336],
    'VFINX': ['Vanguard 500 Index Fund; Investor', -0.5480],
    'SPXKX': ['State Street S&P 500 Index Fund; Class K', -0.5100],
    'TRSPX': ['T. Rowe Price S&P 500 Index Fund', -0.5350],
    'WFSPX': ['Wells Fargo Index Fund; S&P 500 Portfolio', -0.5290],
    'PLFIX': ['Principal Large Cap S&P 500 Index Fund; Inst', -0.5200],
    'SSPIX': ['State Street Equity 500 Index Fund; Class I', -0.5210],
    'BGIXX': ['BlackRock S&P 500 Index Fund; Class K', -0.5390],
    'MFCFX': ['MassMutual S&P 500 Index Fund; Class I', -0.5285],
    'BSPAX': ['BlackRock S&P 500 Index Fund; Investor A', -0.5375],
    'NSPFX': ['Northern Trust S&P 500 Index Fund', -0.5305],
    'AEPFX': ['American Funds Growth Fund of America (S&P 500-Based)', -0.5500],
    'GSPFX': ['Goldman Sachs S&P 500 Index Fund', -0.5315],
    'JSPFX': ['JPMorgan Equity Index Fund (S&P 500)', -0.5405],
    'FSSNX': ['Fidelity S&P 500 Index Fund', -0.5299]
};


function getAllMutualFunds() {
    return mutualFunds;
}

function getMutualFundByTicker(ticker) {
    return mutualFunds[ticker] || null;
}

module.exports = { getAllMutualFunds, getMutualFundByTicker };