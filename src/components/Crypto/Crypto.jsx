import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Spinner from '../Spinner';

import { useGetCryptosQuery } from '../../services/cryptoApi';
const Crypto = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [filterText, setFilterText] = useState('');
  const [cryptos, setCryptos] = useState(data?.data?.coins);

  useEffect(() => {
    setCryptos(data?.data?.coins);
    const filteredCoins = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(filterText.trim().toLowerCase())
    );
    setCryptos(filteredCoins);
  }, [data, filterText]);

  if (isFetching) return <Spinner></Spinner>;

  return (
    <>
      {!simplified && (
        <div className='coin-search-input'>
          <Input
            placeholder='Search Coin...'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          ></Input>
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-container'>
        {cryptos?.map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.uuid}>
            <Link to={`/cryptos/${item.uuid}`}>
              <Card
                className='crypto-card'
                title={`${item.rank}. ${item.name} - ${item.symbol}`}
                extra={<img className='crypto-image' src={item.iconUrl}></img>}
                hoverable
              >
                <p>Price: ${millify(item.price)}</p>
                <p>Market Cap: ${millify(item.marketCap)}</p>
                <p>Daily Change: ${millify(item.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Crypto;
