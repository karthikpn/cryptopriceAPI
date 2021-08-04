import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Coin from "./Coin";
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert("There's an error bruh");
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin">
      <div className="coin__search">
        <h1 className="coin__text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin__input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            price={coin.current_price}
            symbol={coin.symbol}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
