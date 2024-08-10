import * as React from 'react';
import Layout from 'layouts';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
import ScreenerHomePage from 'sections/screener/screener-home';
// import NewScreenerPage from './NewScreenerPage';
// import ScreenerHomePage from '';
import { useDispatch } from 'react-redux';
import { getScreenerByCategoryApi } from 'redux/screener/screenerApi';

const RootStyle = styled(Page)(() => ({
  // display: 'flex',
  // minHeight: '100%',
  // alignItems: 'center',
  // paddingTop: theme.spacing(15),
  // paddingBottom: theme.spacing(10)
}));

ScreenerPage.getLayout = function getLayout(page) {
  return <Layout variant="screener">{page}</Layout>;
};

export default function ScreenerPage() {
  const dispatch = useDispatch()
  dispatch(getScreenerByCategoryApi({ categoryName: "Chart Patterns Screener" }));
  dispatch(getScreenerByCategoryApi({ categoryName: "Harminik Pattern Screener" }));
  dispatch(getScreenerByCategoryApi({ categoryName: "Candlestick Pattern Screener" }));
  return (
    <RootStyle title="Explorer Screener" elevation={2}>
      <ScreenerHomePage />
    </RootStyle>
  );
}
