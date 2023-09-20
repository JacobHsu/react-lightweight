import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import LightWeight from "./components/LightWeight";
import TradingViewWidget from "./components/TradingViewWidget";

function App() {
  const [filelData, setFilelData] = React.useState(null);
  useEffect(() => {
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
