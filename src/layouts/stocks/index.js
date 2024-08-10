import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { Box, Paper, Typography, Stack, Tabs, Tab } from '@mui/material';
import StockTicker from 'components/StockTicker';
import LeftGenInfoContainer from 'sections/fundamental-page/LeftGenInfoContainer';
import { PATH_STOCK } from 'routes/paths';
import useResponsive from 'hooks/useResponsive';

const RootStyle = styled('div')({
  minHeight: '100%',
  //   overflow: 'hidden',

  width: '100%',
});

const tabVals = {
  profile: 'profile',
  financials: 'financials',
  history: 'history',
  holding: 'holding',
  news: 'news',
  overview: 'overview',
};

export default function StocksLayout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const [value, setValue] = useState(tabVals.overview);
  const isDesktop = useResponsive('up', 'md');

  const { stockId } = router.query;

  useEffect(() => {
    if (pathname) {
      let val = tabVals.overview;
      if (_.includes(pathname, tabVals.profile)) val = tabVals.profile;
      if (_.includes(pathname, tabVals.financials)) val = tabVals.financials;
      if (_.includes(pathname, tabVals.history)) val = tabVals.history;
      if (_.includes(pathname, tabVals.holding)) val = tabVals.holding;
      if (_.includes(pathname, tabVals.news)) val = tabVals.news;

      setValue(val);
    }
  }, [pathname]);

  const onTabChange = (event, value) => {
    const append = value === tabVals.overview ? '' : value;
    router.push(`${PATH_STOCK.root}/${stockId}/${append}`);
  };

  return (
    <RootStyle>
      <Paper sx={{ width: '100%', height: '46px', position: 'absolute' }} elevation={0}>
        <StockTicker />
      </Paper>
 {  isDesktop ?   <Box sx={{ pt: 8, width: '90vw', m: 'auto' }}>
        <Stack direction="row" spacing={2}>
          <LeftGenInfoContainer />
          <div style={{ width: '100%', overflowX: 'scroll' }}>
            <Paper sx={{ pt: 4, width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={onTabChange} sx={{ px: 2 }}>
                  <Tab label="Overview" value={tabVals.overview} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Profile" value={tabVals.profile} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Financials" value={tabVals.financials} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Historical data" value={tabVals.history} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Holdings" value={tabVals.holding} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Events and news" value={tabVals.news} sx={{ color: '#302F42', fontSize: '12px' }} />
                </Tabs>
              </Box>
              <Box sx={{ p: 4 }}>{children}</Box>
            </Paper>
          </div>
        </Stack>
      </Box> : 
     <Box sx={{ pt: 8, width: '100vw', m: 'auto' }}>
                <div style={{ width: '100%', overflowX: 'scroll', position: 'sticky', top: 0 }}>
            <Paper sx={{ pt: 1 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0  }}>
                <Tabs value={value} onChange={onTabChange} sx={{ px: 2 }}   variant="scrollable"   scrollButtons="auto">
                  <Tab label="Overview" value={tabVals.overview} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Profile" value={tabVals.profile} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Financials" value={tabVals.financials} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Historical data" value={tabVals.history} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Holdings" value={tabVals.holding} sx={{ color: '#302F42', fontSize: '12px' }} />
                  <Tab label="Events and news" value={tabVals.news} sx={{ color: '#302F42', fontSize: '12px' }} />
                </Tabs>
              </Box>
              <Box sx={{ p: {xs: 2, sm: 2,md: 4} }}>{children}</Box>
            </Paper>
          </div>
       </Box>
      }
    </RootStyle>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
