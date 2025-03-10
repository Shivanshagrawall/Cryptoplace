import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../component/LineCharts/LineChart";
import { motion } from "framer-motion";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-oqCKgR76N8PMK3xiSmvTxAGk",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-oqCKgR76N8PMK3xiSmvTxAGk",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <motion.div
          className="coin-name"
          initial={{ opacity: 0.2, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <img src={coinData.image.large} alt="image" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </motion.div>

        <motion.div
          className="coin-chart"
          initial={{ opacity: 0.2, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <LineChart historicalData={historicalData} />
        </motion.div>

        <motion.div
          className="coin-info"
          initial={{ opacity: 0.2, y: 50 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ul>
            <li>Crypto Market Cap</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
