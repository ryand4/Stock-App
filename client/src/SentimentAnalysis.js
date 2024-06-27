import React, { useState, useEffect } from 'react';

function SentimentAnalysis() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrice = async (ticker) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/price/${ticker}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPrice(data.price);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticker) {
      fetchPrice(ticker);
    }
  }, [ticker]);

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker"
      />
      <button onClick={() => fetchPrice(ticker)}>Fetch Price</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {price && (
        <div>
          <h3>Stock Price for {ticker}</h3>
          <p>{price}</p>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;


