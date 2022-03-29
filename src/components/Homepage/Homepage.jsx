import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import millify from 'millify';
import { Crypto, News } from '..';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <Row className='home-summary'>
        <Col span={12}>
          <Statistic
            title='Total Coins'
            value={globalStats.totalCoins}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Markets'
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Exchanges'
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Market Cap'
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='24h Volume'
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>
      </Row>

      <div className='homepage-heading-contianer'>
        <Title level={3} className='homepage-title'>
          Top 10 coins
        </Title>
        <Title level={4} className='show-more'>
          <Link to='/cryptos'>View All</Link>
        </Title>
      </div>
      <Crypto simplified></Crypto>
      <div className='homepage-heading-contianer'>
        <Title level={3} className='homepage-title'>
          Latest News
        </Title>
        <Title level={4} className='show-more'>
          <Link to='/news'>View All</Link>
        </Title>
      </div>
      <News simplified></News>
    </div>
  );
};

export default Home;
