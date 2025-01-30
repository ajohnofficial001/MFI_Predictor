import React from "react";

const mutualFundOptions = [
  { value: "FXAIX", label: "Fidelity 500 Index Fund" },
  { value: "VFIAX", label: "Vanguard 500 Index Fund; Admiral" },
  { value: "VFFSX", label: "Vanguard 500 Index Fund; Institutional Select" },
  { value: "VIIIX", label: "Vanguard Institutional Index Fund; Inst Plus" },
  { value: "SWPPX", label: "Schwab S&P 500 Index Fund" },
  { value: "FUSEX", label: "Fidelity Spartan 500 Index Fund; Investor" },
  { value: "VFINX", label: "Vanguard 500 Index Fund; Investor" },
  { value: "SPXKX", label: "State Street S&P 500 Index Fund; Class K" },
  { value: "TRSPX", label: "T. Rowe Price S&P 500 Index Fund" },
  { value: "WFSPX", label: "Wells Fargo Index Fund; S&P 500 Portfolio" },
  { value: "PLFIX", label: "Principal Large Cap S&P 500 Index Fund; Inst" },
  { value: "SSPIX", label: "State Street Equity 500 Index Fund; Class I" },
  { value: "BGIXX", label: "BlackRock S&P 500 Index Fund; Class K" },
  { value: "MFCFX", label: "MassMutual S&P 500 Index Fund; Class I" },
  { value: "BSPAX", label: "BlackRock S&P 500 Index Fund; Investor A" },
  { value: "NSPFX", label: "Northern Trust S&P 500 Index Fund" },
  { value: "AEPFX", label: "American Funds Growth Fund of America (S&P 500-Based)" },
  { value: "GSPFX", label: "Goldman Sachs S&P 500 Index Fund" },
  { value: "JSPFX", label: "JPMorgan Equity Index Fund (S&P 500)" },
  { value: "FSSNX", label: "Fidelity S&P 500 Index Fund" }
];


const MutualFundSelector = ({fundFormVals, setFundFormVals, index}) => {
  const handleInputChange = (field, value) => {
    // Update the specific index of the fundFormVals array
    const updatedFormVals = [...fundFormVals];
    updatedFormVals[index] = {...updatedFormVals[index], [field]: value};
    setFundFormVals(updatedFormVals);
  };

  const handleDeleteSelector = () => {
    // Remove the specific index from the fundFormVals array
    const updatedFormVals = [...fundFormVals];
    updatedFormVals.splice(index, 1);
    setFundFormVals(updatedFormVals);
  };

  return (
    <div className="group-entry">
      <div className="form-group">
        <label>Mutual Fund</label>
        <select
          required
          value={fundFormVals[index].mutualFund}
          onChange={e => handleInputChange("mutualFund", e.target.value)}
        >
          <option value="select">Select a mutual fund</option>
          {mutualFundOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Initial Investment Amount (USD)</label>
        <input
          required
          type="number"
          value={fundFormVals[index].initialInvestment}
          onChange={e => handleInputChange("initialInvestment", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Time Horizon (in years)</label>
        <input
          required
          type="number"
          value={fundFormVals[index].timeHorizon}
          onChange={e => handleInputChange("timeHorizon", e.target.value)}
        />
      </div>
      <div className="form-group">
        <button onClick={handleDeleteSelector}>Delete</button>
      </div>
    </div>
  );
};

export default MutualFundSelector;
