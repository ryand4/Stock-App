const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

async function fetchYahooFinancePrice(ticker) {
  const url = `https://finance.yahoo.com/quote/${ticker}`;
  console.log(`Fetching stock price from URL: ${url}`);
  try {
    const response = await axios.get(url);
    console.log(`Response status: ${response.status}`);
    const data = response.data;

    const $ = cheerio.load(data);

    // Log the entire page's HTML structure
    // console.log(data);

    // Select the element containing the stock price
    const priceElement = $('fin-streamer[data-field="regularMarketPrice"]').first();
    const price = priceElement.text();

    console.log(`Fetched price: ${price}`);
    return price;
  } catch (error) {
    console.error(`Error fetching Yahoo Finance price for ${ticker}:`, error.message);
    throw new Error('Failed to fetch Yahoo Finance price');
  }
}

app.get('/api/price/:ticker', async (req, res) => {
  const { ticker } = req.params;
  console.log(`Received request for ticker: ${ticker}`);
  try {
    const price = await fetchYahooFinancePrice(ticker);
    res.json({ ticker, price });
  } catch (error) {
    console.error('Error fetching price:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

