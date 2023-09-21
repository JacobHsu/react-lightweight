import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { dayData, weekData, monthData, yearData } from "../data/";
import "./style.css";

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  var switcherElement = document.createElement("div");
  switcherElement.classList.add("switcher");

  var intervalElements = items.map(function (item) {
    var itemEl = document.createElement("button");
    itemEl.innerText = item;
    itemEl.classList.add("switcher-item");
    itemEl.classList.toggle("switcher-active-item", item === activeItem);
    itemEl.addEventListener("click", function () {
      onItemClicked(item);
    });
    switcherElement.appendChild(itemEl);
    return itemEl;
  });

  function onItemClicked(item) {
    if (item === activeItem) {
      return;
    }

    intervalElements.forEach(function (element, index) {
      element.classList.toggle("switcher-active-item", items[index] === item);
    });

    activeItem = item;

    activeItemChangedCallback(item);
  }

  return switcherElement;
}

export default function LightWeight({ etf }) {
  const chartRef = useRef(null);
  const buttonMenuRef = useRef();
  const [chartCreated, setChart] = useState();
  const isDark = false;

  var intervals = ["1D", "1W", "1M", "1Y"];
  var seriesesData = new Map([
    ["1D", dayData],
    ["1W", weekData],
    ["1M", monthData],
    ["1Y", yearData],
  ]);

  useEffect(() => {
    if (!chartRef?.current) return;

    const chart = createChart(chartRef?.current, {
      width: 600,
      height: 300,
      layout: {
        background: { color: "transparent" },
        textColor: isDark ? "#F4EEFF" : "#280D5F",
      },
      // autoSize: true,
      handleScale: false,
      handleScroll: false,
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: {
          visible: false,
        },
        horzLine: {
          visible: true,
          labelVisible: true,
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
    let areaSeries = null;
    function syncToInterval(interval) {
      if (areaSeries) {
        chart.removeSeries(areaSeries);
        areaSeries = null;
      }
      areaSeries = chart.addAreaSeries({
        topColor: "rgba(38, 198, 218, 0.56)",
        bottomColor: isDark ? "#3c3742" : "white",
        lineColor: "rgba(38, 198, 218, 1)",
        lineWidth: 2,
        crossHairMarkerVisible: false,
      });
      // areaSeries.applyOptions({
      //   priceFormat: {
      //     type: "price",
      //     precision: 4,
      //     minMove: 0.0001,
      //   },
      // });
      areaSeries.setData(seriesesData.get(interval));
    }

    syncToInterval(intervals[0]);
    setChart(chart);
    chart.timeScale().fitContent();

    var firstRow = document.createElement("div");
    firstRow.innerText = "ETC USD 7D VWAP";
    // firstRow.style.color = 'white';
    firstRow.classList.add("legend");
    chartRef.current.appendChild(firstRow);

    var switcherElement = createSimpleSwitcher(
      intervals,
      intervals[0],
      syncToInterval
    );
    buttonMenuRef.current.appendChild(switcherElement);

    return () => {
      chart.remove();
    };
  }, []);
  return (
    <>
      <div ref={buttonMenuRef}></div>
      {!chartCreated && <span>loading...</span>}
      <div style={{ display: "flex", flex: 1, height: "100%" }}>
        <div ref={chartRef} className="chart-container" />
      </div>
    </>
  );
}
