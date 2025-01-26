import React from 'react';

function SearchHistory({ history }) {
    if (history.length === 0) {
        return <p>No search history available.</p>
    }
    return (
        <div className="search-history">
            <h2>Search History</h2>
            <ul>
                {history.map((search, index) => (
                    <li key={index}>
                        <strong>Mutual Fund:</strong> {search.ticker} <br />
                        <strong>Initial Investment:</strong> ${search.initialInvestment} <br />
                        <strong>Time Horizon:</strong> {search.timeHorizon} years <br />
                        <strong>Return Rate:</strong> {search.marketReturnRate}% <br />
                        <strong>Earnings (USD):</strong> ${search.futureValue} <br />
                    </li>
                    ))}
            </ul>
        </div>
    );
}
export default SearchHistory;