import React from "react";

const mutualFundOptions = [
  {value: "VSMPX", label: "Vanguard Total Stock Market Index Fund;Institutional Plus"},
  {value: "FXAIX", label: "Fidelity 500 Index Fund"},
  {value: "VFIAX", label: "Vanguard 500 Index Fund;Admiral"},
  {value: "VTSAX", label: "Vanguard Total Stock Market Index Fund;Admiral"},
  {value: "VMFXX", label: "Vanguard Federal Money Market Fund;Investor"},
  {value: "FGTXX", label: "Goldman Sachs FS Government Fund;Institutional"},
  {value: "SWVXX", label: "Schwab Value Advantage Money Fund;Investor"},
  {value: "VGTSX", label: "Vanguard Total International Stock Index Fund;Investor"},
  {value: "VFFSX", label: "Vanguard 500 Index Fund;Institutional Select"},
  {value: "VIIIX", label: "Vanguard Institutional Index Fund;Inst Plus"},
  {value: "MVRXX", label: "Morgan Stanley Inst Liq Government Port;Institutional"},
  {value: "VTBNX", label: "Vanguard Total Bond Market II Index Fund;Institutional"},
  {value: "AGTHX", label: "American Funds Growth Fund of America;A"},
  {value: "VTBIX", label: "Vanguard Total Bond Market II Index Fund;Investor"},
  {value: "GVMXX", label: "State Street US Government Money Market Fund;Prem"},
  {value: "FCTDX", label: "Fidelity Strategic Advisers Fidelity US Total Stk"},
  {value: "FCNTX", label: "Fidelity Contrafund"},
  {value: "VINIX", label: "Vanguard Institutional Index Fund;Institutional"},
  {value: "VMRXX", label: "Vanguard Cash Reserves Federal Money Market Fd;Adm"},
  {value: "VTSMX", label: "Vanguard Total Stock Market Index Fund;Investor"},
  {value: "SWPPX", label: "Schwab S&P 500 Index Fund"},
  {value: "VWITX", label: "Vanguard Intermediate-Term Tax-Exempt Fund;Investor"},
  {value: "FBGRX", label: "Fidelity Blue Chip Growth Fund"},
  {value: "FUSEX", label: "Fidelity Spartan 500 Index Fund;Investor"},
  {value: "VSMGX", label: "Vanguard LifeStrategy Moderate Growth Fund"},
  {value: "DODFX", label: "Dodge & Cox International Stock Fund"},
  {value: "PRGFX", label: "T. Rowe Price Growth Stock Fund"},
  {value: "TRBCX", label: "T. Rowe Price Blue Chip Growth Fund"},
  {value: "FSKAX", label: "Fidelity Total Market Index Fund"},
  {value: "VEMAX", label: "Vanguard Emerging Markets Stock Index Fund;Admiral"},
  {value: "VBTLX", label: "Vanguard Total Bond Market Index Fund;Admiral"},
  {value: "VWELX", label: "Vanguard Wellington Fund;Investor"},
  {value: "VFIJX", label: "Vanguard GNMA Fund;Admiral"},
  {value: "RERGX", label: "American Funds EuroPacific Growth Fund;R6"},
  {value: "FSTVX", label: "Fidelity Total Market Index Fund;Premium Class"},
  {value: "VBMFX", label: "Vanguard Total Bond Market Index Fund;Investor"},
  {value: "FTRNX", label: "Fidelity Advisor New Insights Fund;Class A"},
  {value: "FSCSX", label: "Fidelity Select Software and IT Services Portfolio"},
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
