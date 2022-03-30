import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../../services/cryptoApi';
import { StopOutlined, CheckOutlined, NumberOutlined } from '@ant-design/icons';
import Spinner from '../Spinner';
import LineChart from './LineChart';
import './crypto.css';
import millify from 'millify';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [period, setPeriod] = useState('24h');

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, period });
  const coinDetails = data?.data?.coin;
  const volumn = coinDetails ? coinDetails['24hVolume'] : '';
  console.log(coinDetails);
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
    },
    { title: 'Rank', value: coinDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${volumn && millify(volumn)}`,
    },
    {
      title: 'Market Cap',
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coinDetails?.numberOfMarkets,
    },
    {
      title: 'Number Of Exchanges',
      value: coinDetails?.numberOfExchanges,
    },
    {
      title: 'Aprroved Supply',
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
    },
    {
      title: 'Total Supply',
      value: `$ ${
        coinDetails?.supply?.total && millify(coinDetails?.supply?.total)
      }`,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(coinDetails?.supply?.circulating)
      }`,
    },
  ];

  if (isFetching) return <Spinner></Spinner>;

  return (
    <div className='details-container'>
      <div>
        <h2 className='deatils-title'>
          {coinDetails?.name} - {coinDetails?.symbol}
        </h2>
      </div>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coinDetails?.price)}
        coinName={coinDetails?.name}
      ></LineChart>
      <div className='info-contianer'>
        <div className='target-info-container'>
          <h1 className='info-title'> {coinDetails?.name} Statistics</h1>
          {stats.map(({ icon, value, title }, idx) => (
            <div key={idx} className='info-row'>
              {title}: {value}
            </div>
          ))}
        </div>
        <div className='other-info-cointianer'>
          <h1 className='info-title'> Other Statistics</h1>
          {genericStats.map(({ icon, value, title }, idx) => (
            <div key={idx} className='info-row'>
              {icon} {title}: {value}
            </div>
          ))}
        </div>
      </div>
      <div className='link-container'>
        <div className='link-description'>
          <h2 className='deatils-title'>
            {coinDetails?.name} - {coinDetails?.symbol}
          </h2>
          {HTMLReactParser(coinDetails?.description)}
        </div>
        <div>
          <h2 className='deatils-title'>Related Links</h2>
          {coinDetails?.links?.map((link) => (
            <div key={link.name}>
              <span>{link.type}</span>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
