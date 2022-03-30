import React, { useState } from 'react';
import { Row, Col, Select } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useGetNewsQuery } from '../../services/newsApi';
import Spinner from '../Spinner';
const { Option } = Select;

const News = ({ isSimplified }) => {
  const [category, setCategory] = useState('Cryptocurrency');
  const count = isSimplified ? 6 : 12;
  const { data } = useGetCryptosQuery(100);
  const { data: news, isFetching } = useGetNewsQuery({ category, count });

  if (!news?.value || isFetching) return <Spinner></Spinner>;
  return (
    <Row gutter={[24, 24]}>
      {!isSimplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='Cryptocurency'>Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
    </Row>
  );
};

const Options = () => {
  <Select
    className='period-select'
    defaultValue='7d'
    placeholder='Choose time peirod'
    onChange={(value) => console.log(value)}
  >
    {[].map((item) => (
      <Option key={item}>{item}</Option>
    ))}
  </Select>;
};
export default News;
