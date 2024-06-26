import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockPage from './StockPage';
import SentimentAnalysis from './SentimentAnalysis';
import NewsletterSignup from './NewsletterSignup';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '20px' }}>
          <Link to="/" className="link-button" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/stocks" className="link-button" style={{ marginRight: '10px' }}>Stock Visualization</Link>
          <Link to="/sentiment" className="link-button" style={{ marginRight: '10px' }}>Sentiment Analysis</Link>
          <Link to="/newsletter" className="link-button">Newsletter Signup</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<StockPage />} />
          <Route path="/sentiment" element={<SentimentAnalysis />} />
          <Route path="/newsletter" element={<NewsletterSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Welcome to the Stock App!</h1>;
}

export default App;

