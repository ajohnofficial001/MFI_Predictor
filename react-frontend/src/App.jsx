/* eslint-disable react/prop-types */
import {useState} from "react";
import axios from "axios";
import "./App.css";
import MutualFundSelector from "./MutualFundSelector";
import SearchHistory from "./SearchHistory";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {Line} from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const defaultFundFormVals = {
  initialInvestment: "",
  timeHorizon: "",
  mutualFund: "",
};

function App() {
  const [fundFormVals, setFundFormVals] = useState([defaultFundFormVals]);
  const [results, setResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [chartData, setChartData] = useState(null);

  // Generate evenly distributed growth data for the chart
  const generateEvenGrowthData = (initialInvestment, futureValue, years) => {
    const totalBalance = parseFloat(initialInvestment) + parseFloat(futureValue);
    const yearlyIncrement = (totalBalance - initialInvestment) / years;
    const growthData = [];

    let balance = parseFloat(initialInvestment);
    growthData.push({year: 0, balance: balance.toFixed(2)});

    for (let year = 1; year <= years; year++) {
      balance += yearlyIncrement;
      growthData.push({year, balance: balance.toFixed(2)});
    }

    return growthData;
  };

  const handleCalculate = async () => {
    const requests = fundFormVals.map(async form => {
      const {initialInvestment, timeHorizon, mutualFund: ticker} = form;

      if (!ticker && !initialInvestment && !timeHorizon) return null;
      if (!ticker || !initialInvestment || !timeHorizon) {
        alert("Please fill out all fields");
        return null;
      }

      try {
        const response = await axios.post("http://localhost:5001/api/mutualfunds/calculate", {
          ticker,
          initialInvestment: parseFloat(initialInvestment),
          timeHorizon: parseInt(timeHorizon),
        });

        if (!response.data) return null;

        // Generate growth data for charts
        const growthData = generateEvenGrowthData(
          parseFloat(initialInvestment),
          response.data.futureValue,
          parseInt(timeHorizon),
        );

        return {...response.data, growthData};
      } catch (error) {
        console.error("Error fetching calculation results", error);
        return null;
      }
    });

    try {
      const results = await Promise.all(requests);
      const filteredResults = results.filter(result => result !== null);

      setResults(filteredResults);

      if (filteredResults.length > 0) {
        // Get all unique years across all funds
        const allYears = Array.from(new Set(filteredResults.flatMap(fund => fund.growthData.map(d => d.year)))).sort(
          (a, b) => a - b,
        ); // Sort in ascending order

        setChartData({
          labels: allYears.map(year => `Year ${year}`), // X-axis labels

          datasets: filteredResults.map((fund, index) => {
            // Create a map of year -> balance for the current fund
            const yearBalanceMap = new Map(fund.growthData.map(d => [d.year, d.balance]));

            return {
              label: `${fund.mutualFundName} Growth (USD)`,
              data: allYears.map(year => yearBalanceMap.get(year) || null), // Fill gaps with null
              fill: false,
              borderColor: `hsl(${index * 60}, 70%, 50%)`, // Unique colors
              backgroundColor: `hsl(${index * 60}, 70%, 80%)`,
              tension: 0.3,
            };
          }),
        });
      }

      // Save search history
      setSearchHistory([
        ...searchHistory,
        ...filteredResults.map(result => ({
          ticker: result.mutualFundName,
          initialInvestment: result.initialInvestment,
          timeHorizon: result.timeHorizon,
          marketReturnRate: result.marketReturnRate,
          futureValue: result.futureValue,
        })),
      ]);
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
        <button onClick={() => setFundFormVals([...fundFormVals, defaultFundFormVals])}>Add Fund</button>
        <button onClick={handleCalculate}>Calculate</button>
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
                  <td>{result.mutualFundName}</td>
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

      {chartData && (
        <div className="chart-container">
          <h2>Investment Growth Over Time</h2>
          <Line data={chartData} />
        </div>
      )}

      <SearchHistory history={searchHistory} />
    </div>
  );
}

export default App;
