import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <motion.h1
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.4,duration:1}}
        >
          Largest <br /> Crypto Marketplace
        </motion.h1>
        <motion.p
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.6,duration:1}}
        >
          Welcome to the world's largest cryptocurrency marketplace. <br /> Sign
          up to explore more about cryptos.
        </motion.p>
        <motion.form onSubmit={searchHandler}
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.8,duration:1}}
        >
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search Crypto..."
            required
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          {/* <button type="submit">Search</button> */}
          <button>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Submit</span>
          </button>
        </motion.form>
      </div>

      <motion.div className="crypto-table"
      initial={{opacity:0.2,y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      >
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="change">24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="coin image" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
