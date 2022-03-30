import React from 'react';
import { Typography, Select } from 'antd';

const { Option } = Select;

const News = () => {
  return <div>News</div>;
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
