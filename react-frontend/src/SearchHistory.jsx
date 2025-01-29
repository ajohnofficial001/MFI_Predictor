import React, { useState } from "react";
import PropTypes from "prop-types";
import "./css/searchHistory.css";

function SearchHistory({ history }) {
    const [showTable, setShowTable] = useState(false); // Toggle state

    if (!Array.isArray(history) || history.length === 0) {
        return <p>No search history available.</p>;
    }

    // Limit to the last 5 searches for recent view
    const recentHistory = history.slice(-5).reverse();

    const toggleView = () => {
        setShowTable(!showTable);
    };

    return (
        <div className="search-history">
            <h2>{showTable ? "Full Search History" : "Recent Searches"}</h2>

            <button onClick={toggleView} className="toggle-button">
                {showTable ? "Show Recent Searches" : "Show Full History"}
            </button>

            {showTable ? (
                <table>
                    <thead>
                        <tr>
                            <th>Mutual Fund</th>
                            <th>Initial Investment</th>
                            <th>Time Horizon</th>
                            <th>Return Rate</th>
                            <th>Earnings (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((search, index) => (
                            <tr key={index}>
                                <td>{search.ticker}</td>
                                <td>${search.initialInvestment}</td>
                                <td>{search.timeHorizon} years</td>
                                <td>{search.marketReturnRate}%</td>
                                <td>${search.futureValue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="search-history-cards">
                    {recentHistory.map((search, index) => (
                        <div className="search-history-card" key={index}>
                            <strong>Mutual Fund:</strong> {search.ticker}
                            <strong>Initial Investment:</strong> ${search.initialInvestment}
                            <strong>Time Horizon:</strong> {search.timeHorizon} years
                            <strong>Return Rate:</strong> {search.marketReturnRate}%
                            <strong>Earnings (USD):</strong> ${search.futureValue}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

SearchHistory.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            ticker: PropTypes.string.isRequired,
            initialInvestment: PropTypes.number.isRequired,
            timeHorizon: PropTypes.number.isRequired,
            marketReturnRate: PropTypes.number.isRequired,
            futureValue: PropTypes.number.isRequired,
        })
    ),
};

export default SearchHistory;