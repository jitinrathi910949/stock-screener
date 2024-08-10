import * as React from 'react';
import Layout from 'layouts';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
// import FundamentalSection from 'sections/fundamental-page';
import OverviewTab from 'sections/fundamental-page/tabs/overview-tab';
import FundamentalDesktop from 'sections/fundamental-page/FundamentalDesktop';
import FundamentalMobile from 'sections/fundamental-page/FundamentalMobile';
import useResponsive from 'hooks/useResponsive';

// import NewScreenerPage from './NewScreenerPage';
// import ScreenerHomePage from '';

const RootStyle = styled(Page)(({ theme }) => ({
  // display: 'flex',
  // minHeight: '100%',
  // alignItems: 'center',
  // paddingTop: theme.spacing(15),
  // paddingBottom: theme.spacing(10)
  // pt: '76px',
}));

StocksPage.getLayout = function getLayout(page) {
  return <Layout variant="stocks">{page}</Layout>;
};

export default function StocksPage() {
  return (
    <RootStyle title="Overview">
      {/* <Paper sx={{position:'absolute', mt: -3,ml:-3, width: '100%', height: '46px' }} elevation={0}>
              <StockTicker />
      </Paper> */}
      {/* <FundamentalPage /> */}
      <OverviewTab />
      {/* {isDesktop ? <FundamentalDesktop /> : <FundamentalMobile />} */}

    </RootStyle>
  );
}
