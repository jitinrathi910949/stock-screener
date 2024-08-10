import { useEffect } from 'react';
import Layout from 'layouts';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
// import FundamentalPage from 'sections/fundamental-page';
import OverviewTab from 'sections/fundamental-page/tabs/overview-tab';
import useResponsive from 'hooks/useResponsive';
import MobileOverview from 'sections/fundamental-page/tabs/overview-tab/Mobileoverview';
import { useRouter } from 'next/router';
import { getTickerDetailsApi, getTickerDividendAndSplitApi, getTickerFinancialApi, getTickerNewsApi } from 'redux/stock/stockApi';
import { getBalanceSheetStatementApi, getCashFlowStatementApi, getHistoricalChartApi, getHistoricalDailyChartApi, getIncomeStatementApi, getKeyMetricsApi, getQuoteApi } from 'redux/fundamentals/stockApi'
import { useDispatch } from 'react-redux';
import { stockFundamentalsAction } from 'redux/fundamentals/stockSlice';

// import NewScreenerPage from './NewScreenerPage';
// import ScreenerHomePage from '';

const RootStyle = styled(Page)(({ theme }) => ({
  // display: 'flex',
  // minHeight: '100%',
  // alignItems: 'center',
  // paddingTop: theme.spacing(15)
  // paddingBottom: theme.spacing(10)
  // pt: '76px',
}));

StocksPage.getLayout = function getLayout(page) {
  return <Layout variant="stocks">{page}</Layout>;
};

export default function StocksPage() {
  const isDesktop = useResponsive('up', 'md');
  const router = useRouter();
  const dispatch = useDispatch();

  const { stockId } = router.query;

  useEffect(() => {
    console.log('stock id is', stockId);
    if (stockId !== '[stockId]') {
      dispatch(getTickerDetailsApi({ ticker: stockId }));
      dispatch(getTickerDividendAndSplitApi({ ticker: stockId }));
      dispatch(getTickerFinancialApi({ ticker: stockId }));
      dispatch(getTickerNewsApi({ ticker: stockId }));
      dispatch(getKeyMetricsApi({ ticker: stockId }));
      dispatch(getHistoricalChartApi({ period: "1hour", ticker: stockId }));
      dispatch(getHistoricalDailyChartApi({ ticker: stockId }));
      dispatch(getIncomeStatementApi({ period: "annual", ticker: stockId }));
      dispatch(getBalanceSheetStatementApi({ period: "annual", ticker: stockId }));
      dispatch(getCashFlowStatementApi({ period: "annual", ticker: stockId }));
      dispatch(getQuoteApi({ ticker: stockId }));

      dispatch(stockFundamentalsAction.setStock(stockId));
    }
  }, [dispatch, stockId]);

  return (
    <RootStyle title="Overview">
      {/* <Paper sx={{position:'absolute', mt: -3,ml:-3, width: '100%', height: '46px' }} elevation={0}>
              <StockTicker />
      </Paper> */}
      {/* <FundamentalPage /> */}
      {isDesktop ? <OverviewTab /> : <MobileOverview />}
    </RootStyle>
  );
}
