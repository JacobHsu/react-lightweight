import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import LightWeight from "./components/LightWeight";
import TradingViewWidget from "./components/TradingViewWidget";
import { CurrencyAmount, Price } from "@pancakeswap/sdk";
import { bscTokens } from "@pancakeswap/tokens";


function App() {
  const [filelData, setFilelData] = React.useState(null);
  useEffect(() => {
  console.log(22222, bscTokens.bnb)
  const testRes = new Price({
    baseAmount: CurrencyAmount.fromRawAmount(bscTokens.bnb, "15671741929954778"),
    quoteAmount: CurrencyAmount.fromRawAmount(bscTokens.cake, "10000000000000"),
  })
  console.log(333, testRes)
    console.log()
    const baseURL = "https://node-etfs-api.onrender.com/api/etfs";
    axios.get(baseURL).then((response) => {
      if (response.data && response.data.errno === 0) {
        setFilelData(response.data.etf);
      }
    });
  }, []);

  return (
    <div className="App">
      {filelData && <LightWeight etf={filelData.VT.setData} />}
      <TradingViewWidget />
    </div>
  );
}

export default App;
