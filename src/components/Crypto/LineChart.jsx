import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import './crypto.css';

const LineChart = React.memo(({ coinHistory, currentPrice, coinName }) => {
  const priceList = [],
    timestamp = [];
  if (!coinHistory) {
    return <h2>Data not available.</h2>;
  }
  const historyData = coinHistory?.data ? coinHistory.data.history : [];
  historyData?.forEach((item) => {
    priceList.push(item.price);
    timestamp.push(moment(new Date(item.timestamp * 1000)).format('hh:mm A'));
  });

  const lineChartData = {
    labels: timestamp,
    datasets: [
      {
        label: 'Price $',
        data: priceList,
        fill: false,
        backgroundColor: '#147EB3',
        borderColor: '#147EB3',
      },
    ],
  };

  return (
    <div>
      <div className='price-container'>
        <span className='price-line-title'>{coinName} Price in 24h</span>
        <span>
          Current {coinName} Price: $ {currentPrice}
        </span>
      </div>
      <Line data={lineChartData} className='price-line-chart'></Line>
    </div>
  );
});

export default LineChart;
