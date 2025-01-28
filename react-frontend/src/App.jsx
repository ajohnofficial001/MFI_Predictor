/* eslint-disable react/prop-types */
// App.js
import {useState} from "react";
import axios from "axios";
import "./App.css";
import MutualFundSelector from "./MutualFundSelector";

const defaultFundFormVals = {
  initialInvestment: "",
  timeHorizon: "",
  mutualFund: "",
};

function App() {
  const [fundFormVals, setFundFormVals] = useState([defaultFundFormVals]);
  const [results, setResults] = useState(null);
  console.log(results);

  const handleCalculate = async () => {
    // Map over fundFormVals to create an array of promises
    const requests = fundFormVals.map(async form => {
      const {initialInvestment, timeHorizon, mutualFund: ticker} = form;

      // Skip the calculation if any required field is missing
      if (!ticker && !initialInvestment && !timeHorizon) return null;
      if (!ticker || !initialInvestment || !timeHorizon) {
        alert("Please fill out all fields");
        return null; // Skip this request
      }

      try {
        const response = await axios.post("http://localhost:5001/api/mutualfunds/calculate", {
          ticker,
          initialInvestment: parseFloat(initialInvestment),
          timeHorizon: parseInt(timeHorizon),
        });
        return response.data; // Return response data if successful
      } catch (error) {
        console.error("Error fetching calculation results", error);
        return null; // Return null in case of an error
      }
    });

    try {
      // Wait for all the requests to complete in parallel
      const results = await Promise.all(requests);

      // Filter out null results (in case of missing fields or errors)
      const filteredResults = results.filter(result => result !== null);

      setResults(filteredResults); // Set the filtered results
    } catch (error) {
      console.error("Error during Promise.all execution", error);
    }
  };

  return (
    <div className="App">
      <h1>Mutual Fund Calculator</h1>
      {fundFormVals.map((form, index) => (
        <MutualFundSelector key={index} fundFormVals={fundFormVals} setFundFormVals={setFundFormVals} index={index} />
      ))}
      <div style={{display: "flex", gap: "1rem", justifyContent: "center"}}>
        <button onClick={() => setFundFormVals([...fundFormVals, defaultFundFormVals])}>Add fund</button>
        <button onClick={() => handleCalculate()}>Calculate</button>
      </div>

      {results && results.length > 0 && (
        <div className="results">
          <h2>Result Summary</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Fund</th>
                <th>Initial Amount (USD)</th>
                <th>Time Horizon (years)</th>
                <th>Return Rate (%)</th>
                <th>Risk Free Rate (%)</th>
                <th>Mutual Fund Beta</th>
                <th>Earnings (USD)</th>
                <th>Total Balance (USD)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>Fund {result.mutualFundName}</td>
                  <td>${result.initialInvestment}</td>
                  <td>{result.timeHorizon}</td>
                  <td>{result.marketReturnRate}%</td>
                  <td>{result.riskFreeRate}%</td>
                  <td>{result.beta}</td>
                  <td>${result.futureValue}</td>
                  <td>${parseFloat(result.futureValue) + parseFloat(result.initialInvestment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
