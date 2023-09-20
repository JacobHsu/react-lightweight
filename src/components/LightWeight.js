import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { priceData } from "./priceData";
import "./style.css";

export default function LightWeight({etf}) {
  const chartContainerRef = useRef(null);
  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      layout: {
        textColor: "#d1d4dc",
        background: {
          type: "solid",
          color: "#000000",
        },
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      crosshair: {
        vertLine: {
          width: 5,
          color: "rgba(224, 227, 235, 0.1)",
          style: 0,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0)",
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0)",
        },
      },
    });
    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(38, 198, 218, 0.56)",
      bottomColor: "rgba(38, 198, 218, 0.04)",
      lineColor: "rgba(38, 198, 218, 1)",
      lineWidth: 2,
      crossHairMarkerVisible: false,
    });
    areaSeries.setData(etf); // etf // priceData

    chart.timeScale().fitContent();

    var firstRow = document.createElement('div');
    firstRow.innerText = 'ETC USD 7D VWAP';
    firstRow.style.color = 'white';
    firstRow.classList.add('legend');
    chartContainerRef.current.appendChild(firstRow);

  }, []);
  return (
    <>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
}
