import React from 'react';
import Ticker from 'react-ticker';
import Ticks from 'components/Ticks';
import { Box } from '@mui/material';

const stocksDataList= [
  {
    name: 'DOW',
    price: '29861.6',
    priceVariationPer: '0.62%',
    priceVariationRup: '184.82',
  }
]
const MoveStuffAround = () => (
  <Ticker>
    {({ index }) => (
      <>
        <Ticks />
      </>
    )}
  </Ticker>
);

export default MoveStuffAround;
