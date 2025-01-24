const mutualFunds = {
    'VSMPX': ['Vanguard Total Stock Market Index Fund;Institutional Plus', -0.5818896016531226],
    'FXAIX': ['Fidelity 500 Index Fund', -0.6393704983386446], 
    'VFIAX': ['Vanguard 500 Index Fund;Admiral', -0.5432423766830379], 
    'VTSAX': ['Vanguard Total Stock Market Index Fund;Admiral', -0.5820232742711782],
    'VMFXX': ['Vanguard Federal Money Market Fund;Investor', 0], 
    'FGTXX': ['Goldman Sachs FS Government Fund;Institutional', 0], 
    'SWVXX': ['Schwab Value Advantage Money Fund;Investor', 0], 
    'VGTSX': ['Vanguard Total International Stock Index Fund;Investor', -0.3909034849880557], 'VFFSX': ['Vanguard 500 Index Fund;Institutional Select', -0.5427655456614914], 
    'VIIIX': ['Vanguard Institutional Index Fund;Inst Plus', -0.5268788298447168], 
    'MVRXX': ['Morgan Stanley Inst Liq Government Port;Institutional', 0], 
    'VTBNX': ['Vanguard Total Bond Market II Index Fund;Institutional', -0.2877491689767315], 'AGTHX': ['American Funds Growth Fund of America;A', -0.7882370100761013], 
    'VTBIX': ['Vanguard Total Bond Market II Index Fund;Investor', -0.28820841552178367], 'GVMXX': ['State Street US Government Money Market Fund;Prem', 0], 
    'FCTDX': ['Fidelity Strategic Advisers Fidelity US Total Stk', -0.6495069385206195], 'FCNTX': ['Fidelity Contrafund', -0.549596982587108], 
    'VINIX': ['Vanguard Institutional Index Fund;Institutional', -0.5273840684857244], 
    'VMRXX': ['Vanguard Cash Reserves Federal Money Market Fd;Adm', 0],
    'VTSMX': ['Vanguard Total Stock Market Index Fund;Investor', -0.5873466069727344], 
    'SWPPX': ['Schwab S&P 500 Index Fund', -0.6381263407123897], 
    'VWITX': ['Vanguard Intermediate-Term Tax-Exempt Fund;Investor', -0.19521529706212765], 'FBGRX': ['Fidelity Blue Chip Growth Fund', -0.14326789312014937], 
    'FUSEX': ['Fidelity Spartan 500 Index Fund;Investor', -0.5336124607413378],
    'VSMGX': ['Vanguard LifeStrategy Moderate Growth Fund', -0.5062481440444941], 
    'DODFX': ['Dodge & Cox International Stock Fund', -0.4658454718635177], 
    'PRGFX': ['T. Rowe Price Growth Stock Fund', -0.6222863056335618], 
    'TRBCX': ['T. Rowe Price Blue Chip Growth Fund', -0.5850619077550362],
    'FSKAX': ['Fidelity Total Market Index Fund', -0.6571901537383956], 
    'VEMAX': ['Vanguard Emerging Markets Stock Index Fund;Admiral', -0.24599155766667863], 'VBTLX': ['Vanguard Total Bond Market Index Fund;Admiral', -0.29188147755242216], 
    'VWELX': ['Vanguard Wellington Fund;Investor', -0.46385395565962445], 
    'VFIJX': ['Vanguard GNMA Fund;Admiral', -0.30809214774754395], 
    'RERGX': ['American Funds EuroPacific Growth Fund;R6', -0.5262550437918937],
    'FSTVX': ['Fidelity Total Market Index Fund;Premium Class', -0.46579999072037176], 
    'VBMFX': ['Vanguard Total Bond Market Index Fund;Investor', -0.2918665008585247], 
    'FTRNX': ['Fidelity Advisor New Insights Fund;Class A', -1.0213108004875537], 
    'FSCSX': ['Fidelity Select Software and IT Services Portfolio', -0.9778526876599554]
};

function getAllMutualFunds() {
    return mutualFunds;
}

function getMutualFundByTicker(ticker) {
    return mutualFunds[ticker] || null;
}

module.exports = { getAllMutualFunds, getMutualFundByTicker };