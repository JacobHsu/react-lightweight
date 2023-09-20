import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { dayData, weekData, monthData, yearData } from "../data/";
import "./style.css";
// 點擊 createSimpleSwitcher 不會刷新而是覆蓋如何解決
function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
	var switcherElement = document.createElement('div');
	switcherElement.classList.add('switcher');

	var intervalElements = items.map(function(item) {
		var itemEl = document.createElement('button');
		itemEl.innerText = item;
		itemEl.classList.add('switcher-item');
		itemEl.classList.toggle('switcher-active-item', item === activeItem);
		itemEl.addEventListener('click', function() {
			onItemClicked(item);
		});
		switcherElement.appendChild(itemEl);
		return itemEl;
	});

	function onItemClicked(item) {
		if (item === activeItem) {
			return;
		}

		intervalElements.forEach(function(element, index) {
			element.classList.toggle('switcher-active-item', items[index] === item);
		});

		activeItem = item;

		activeItemChangedCallback(item);
	}

	return switcherElement;
}

export default function LightWeight({etf}) {
  const chartContainerRef = useRef(null);
  useEffect(() => {
    var intervals = ['1D', '1W', '1M', '1Y'];
    var seriesesData = new Map([
      ['1D', dayData ],
      ['1W', weekData ],
      ['1M', monthData ],
      ['1Y', yearData ],
    ]);
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
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        vertLine: {
          visible: false,
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
    let areaSeries = null;
    function syncToInterval(interval) {
      if (areaSeries) {
        chart.removeSeries(areaSeries);
        areaSeries = null;
      }
      areaSeries = chart.addAreaSeries({
        topColor: "rgba(38, 198, 218, 0.56)",
        bottomColor: "rgba(38, 198, 218, 0.04)",
        lineColor: "rgba(38, 198, 218, 1)",
        lineWidth: 2,
        crossHairMarkerVisible: false,
      });
      areaSeries.setData(seriesesData.get(interval));
    }

    syncToInterval(intervals[0]);

    chart.timeScale().fitContent();

    var firstRow = document.createElement('div');
    firstRow.innerText = 'ETC USD 7D VWAP';
    firstRow.style.color = 'white';
    firstRow.classList.add('legend');
    chartContainerRef.current.appendChild(firstRow);

    var switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);
    chartContainerRef.current.appendChild(switcherElement);

  }, []);
  return (
    <>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
}
