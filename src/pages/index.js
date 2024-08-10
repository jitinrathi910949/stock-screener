import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Layout from 'layouts';
import Page from 'components/Page';
import ScreenerHomePage from 'sections/screener/screener-home';
import { PATH_SCREENER } from 'routes/paths';
import { PATH_AFTER_LOGIN } from '../config';
import { useDispatch } from 'react-redux';
import { getScreenerByCategoryApi } from 'redux/screener/screenerApi';

const RootStyle = styled(Page)(() => ({
  height: '100%',
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="screener">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  const { pathname, replace, prefetch } = useRouter();
  const dispatch = useDispatch()
  dispatch(getScreenerByCategoryApi({ categoryName: "Chart Patterns Screener" }));
  dispatch(getScreenerByCategoryApi({ categoryName: "Harminik Pattern Screener" }));
  dispatch(getScreenerByCategoryApi({ categoryName: "Candlestick Pattern Screener" }));
  useEffect(() => {
    if (pathname === PATH_SCREENER.root) {
      replace(PATH_AFTER_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RootStyle title="Explorer Screener" elevation={2}>
      <ScreenerHomePage />
    </RootStyle>
  );
}
