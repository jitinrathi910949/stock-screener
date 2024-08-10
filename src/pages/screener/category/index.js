import * as React from 'react';
import Layout from 'layouts';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
import Category from 'sections/category';
import FundamentalScreener from 'sections/category/fundamental';
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
  return (
    <RootStyle title="Fundamental Screener" elevation={2}>
      {/* <Category /> */}
      <FundamentalScreener />
    </RootStyle>
  );
}
