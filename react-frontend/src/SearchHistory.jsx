import  'react';
import PropTypes from 'prop-types';

function SearchHistory({ history }) {
    if (!Array.isArray(history) || history.length === 0) {
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

// Add proptypes for type-checking
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