// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [initialInvestment, setInitialInvestment] = useState('');
    const [timeHorizon, setTimeHorizon] = useState('');
    const [mutualFund, setMutualFund] = useState('select');
    const [results, setResults] = useState(null);

    const handleCalculate = async () => {
        const ticker = mutualFund;
        if (!ticker || !initialInvestment || !timeHorizon) {
            alert('Please fill out all fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/mutualfunds/calculate', {
                ticker,
                initialInvestment: parseFloat(initialInvestment),
                timeHorizon: parseInt(timeHorizon)
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching calculation results', error);
        }
    };

    return (
        <div className="App">
            <h1>Mutual Fund Calculator</h1>
            <div className='group-entry'>
              <div className="form-group">
                  <label>Mutual Fund</label>
                  <select required="required" value={mutualFund} onChange={(e) => setMutualFund(e.target.value)}>
                    <option value="select">Select a mutual fund</option>
                    <option value="VSMPX">Vanguard Total Stock Market Index Fund;Institutional Plus</option>
                    <option value="FXAIX">Fidelity 500 Index Fund</option>
                    <option value="VFIAX">Vanguard 500 Index Fund;Admiral</option>
                    <option value="VTSAX">Vanguard Total Stock Market Index Fund;Admiral</option>
                    <option value="VMFXX">Vanguard Federal Money Market Fund;Investor</option>
                    <option value="FGTXX">Goldman Sachs FS Government Fund;Institutional</option>
                    <option value="SWVXX">Schwab Value Advantage Money Fund;Investor</option>
                    <option value="VGTSX">Vanguard Total International Stock Index Fund;Investor</option>
                    <option value="VFFSX">Vanguard 500 Index Fund;Institutional Select</option>
                    <option value="VIIIX">Vanguard Institutional Index Fund;Inst Plus</option>
                    <option value="MVRXX">Morgan Stanley Inst Liq Government Port;Institutional</option>
                    <option value="VTBNX">Vanguard Total Bond Market II Index Fund;Institutional</option>
                    <option value="AGTHX">American Funds Growth Fund of America;A</option>
                    <option value="VTBIX">Vanguard Total Bond Market II Index Fund;Investor</option>
                    <option value="GVMXX">State Street US Government Money Market Fund;Prem</option>
                    <option value="FCTDX">Fidelity Strategic Advisers Fidelity US Total Stk</option>
                    <option value="FCNTX">Fidelity Contrafund</option>
                    <option value="VINIX">Vanguard Institutional Index Fund;Institutional</option>
                    <option value="VMRXX">Vanguard Cash Reserves Federal Money Market Fd;Adm</option>
                    <option value="VTSMX">Vanguard Total Stock Market Index Fund;Investor</option>
                    <option value="SWPPX">Schwab S&P 500 Index Fund</option>
                    <option value="VWITX">Vanguard Intermediate-Term Tax-Exempt Fund;Investor</option>
                    <option value="FBGRX">Fidelity Blue Chip Growth Fund</option>
                    <option value="FUSEX">Fidelity Spartan 500 Index Fund;Investor</option>
                    <option value="VSMGX">Vanguard LifeStrategy Moderate Growth Fund</option>
                    <option value="DODFX">Dodge & Cox International Stock Fund</option>
                    <option value="PRGFX">T. Rowe Price Growth Stock Fund</option>
                    <option value="TRBCX">T. Rowe Price Blue Chip Growth Fund</option>
                    <option value="FSKAX">Fidelity Total Market Index Fund</option>
                    <option value="VEMAX">Vanguard Emerging Markets Stock Index Fund;Admiral</option>
                    <option value="VBTLX">Vanguard Total Bond Market Index Fund;Admiral</option>
                    <option value="VWELX">Vanguard Wellington Fund;Investor</option>
                    <option value="VFIJX">Vanguard GNMA Fund;Admiral</option>
                    <option value="RERGX">American Funds EuroPacific Growth Fund;R6</option>
                    <option value="FSTVX">Fidelity Total Market Index Fund;Premium Class</option>
                    <option value="VBMFX">Vanguard Total Bond Market Index Fund;Investor</option>
                    <option value="FTRNX">Fidelity Advisor New Insights Fund;Class A</option>
                    <option value="FSCSX">Fidelity Select Software and IT Services Portfolio</option>
                  </select>
              </div>
              <div className="form-group">
                  <label>Initial Investment Amount (USD)</label>
                  <input required="required" type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Time Horizon (in years)</label>
                  <input required="required" type="number" value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)} />
              </div>
            </div>
            <button onClick={handleCalculate}>Calculate</button>
            {results && (
                <div className="results">
                    <h2>Result Summary</h2>
                    <p>Initial Amount (USD): ${initialInvestment}</p>
                    <p>Time Horizon (years): {timeHorizon}</p>
                    <p>Return Rate: {results.marketReturnRate}%</p>
                    <p>Risk Free Rate: {results.riskFreeRate}%</p>
                    <p>Mutual Fund Beta: {results.beta}</p>
                    <p>Earnings (USD): ${results.futureValue}</p>
                    <p>Total Balance (USD): ${parseFloat(results.futureValue) + parseFloat(initialInvestment)}</p>
                </div>
            )}
        </div>
    );
}

export default App;
