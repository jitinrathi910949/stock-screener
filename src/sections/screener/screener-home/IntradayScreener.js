import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Paper, Grid, Typography, Box, Divider, Card, Button } from '@mui/material';
import NewsPanel from './components/NewsPanel';
// import NewsPanel from './components/NewsPanelDemo';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { PATH_SCREENER } from 'routes/paths';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export const typeScreener = {
  ExploreScreener: `Explore Screener`,
  FundamentalScreener: 'Fundamental Screener',
  TechnicalScreener: `Technical Screener`,
  ChartPatternsScreener: 'Chart Patterns Screener',
  HarminicPatternScreener: 'Harminik Pattern Screener',
  CandlestickPatternScreener: 'Candlestick Pattern Screener',
};


export default function IntradayScreener(props) {
  const screener = useSelector((state) => state.screenerReducer);
  const router = useRouter()
  // const [data, setData] = useState([]);
  let data = []
  const { type } = props
  const { chartPatternsScreener, harminicPatternScreener, candlestickPatternScreener, isListLoading } = screener;
  switch (type) {
    case typeScreener.ChartPatternsScreener:
      data = chartPatternsScreener
      break;
    case typeScreener.HarminicPatternScreener:
      data = harminicPatternScreener
      break;
    case typeScreener.CandlestickPatternScreener:
      // setData(candlestickPatternScreener)
      data = candlestickPatternScreener

      break;

    default:
      break;
  }

  const goScreenCategory = (data) => {
    switch (data) {
      case typeScreener.ChartPatternsScreener:
        router.push(`${PATH_SCREENER.chartPatternScreener}`);
        break;
      case typeScreener.HarminicPatternScreener:
        router.push(`${PATH_SCREENER.harminicPatternScreener}`);
        break;
      case typeScreener.CandlestickPatternScreener:
        router.push(`${PATH_SCREENER.candleStickScreener}`);
        break;

      default:
        break;
    }
  };
  return (
    <Box>
      <Box
        as="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: { sm: '360px' }
        }}
      >
        <Typography onClick={() => goScreenCategory(type)} sx={{ fontSize: '14px', color: '#333333', fontWeight: 600, cursor: 'pointer' }}>{type}</Typography>
        <Box as="div">
          {/* <SearchIcon sx={{ fontSize: '25px', color: '#BDBDBD', marginRight: '15px' }} /> */}
          {/* <FilterAltIcon sx={{ fontSize: '25px', color: '#BDBDBD' }} /> */}
        </Box>
      </Box>
      <Divider sx={{ margin: '12px 0 0px', color: '#E0E0E0' }} />

      {!isListLoading ? data.map((value) => (
        <NextLink href={`${PATH_SCREENER.root}/${value?.slugUrl}`} passHref>
          <Box>
            <NewsPanel screenerData={value} />
          </Box>
        </NextLink>
      )) : <CircularProgress sx={{ position: 'absolute', top: '50%', left: '45%' }} />}
    </Box>
  );
}
