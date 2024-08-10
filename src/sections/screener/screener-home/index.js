import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography, Box, Stack, Card, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NextLink from 'next/link';
import { PATH_SCREENER } from 'routes/paths';

import StockBanner from 'components/StockBanner';
import { display } from '@mui/system';
import SwitchTab from './components/SwitchTabs';
import IntradayScreenerfrom, { typeScreener } from './IntradayScreener';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const useStyles = makeStyles((theme) => ({
  createStock: {
    ['@media (max-width:1200px)']: { 
      width: '100%'
    },
   
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '18px 16px',
    margin: '24px 0px',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '18px 16px',
    margin: '24px 0px',
    display: 'flex',
    flexDirection: 'row',
  },
  stockList: {
    width: '80%',
    height: 643,
    backgroundColor: 'white',
    marginTop: '44px',
    borderRadius: 2,
    boxShadow: 3,
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <RootStyle>
      <Paper elevation={3} className={classes.createStock}>
        <Grid sx={{ flexGrow: 1, flex: 1 }} container spacing={2}>
          <Grid item xs={12} lg={12}>
            <StockBanner />
          </Grid>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              width: '95%',
              marginLeft: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                sx={{ fontSize: '18px', color: '#333333', fontWeight: 600, marginTop: 2.1, marginBottom: '16px' }}
              >
                Stock Screener
              </Typography>
              <NextLink href={PATH_SCREENER.newScreener} passHref>
                <Button
                  variant="contained"
                  disableElevation
                  // onClick={onSaveClick}
                  sx={[
                    {
                      '&:hover': {
                        backgroundColor: 'rgba(0, 102, 204, .8)',
                      },
                      backgroundColor: 'secondary.main',
                      boxShadow: 'none',
                      display: { sm: 'block', xs: 'block', lg: 'none', md: 'none' },
                    },
                  ]}
                >
                  New Screener
                </Button>
              </NextLink>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <SwitchTab />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        spacing={{ lg: 2, sm: 0, xs: 0 }}
        sx={{
          width: { lg: '80%', sm: '100%', xs: '100%' },
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
          margin: '24px 0px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline'
        }}
      >
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card sx={{ flex: 1, minHeight: '428px', padding: '18px 16px 14px', width: '100%' }}>
            <IntradayScreenerfrom type={typeScreener.ChartPatternsScreener} />
          </Card>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12} sx={{ my: { sm: 2, xs: 2 } }}>
          <Card sx={{ flex: 1, minHeight: '428px', padding: '18px 16px 14px', width: '100%' }}>
            <IntradayScreenerfrom type={typeScreener.HarminicPatternScreener} />
          </Card>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card sx={{ flex: 1, minHeight: '428px', padding: '18px 16px 14px', width: '100%' }}>
            <IntradayScreenerfrom type={typeScreener.CandlestickPatternScreener} />
          </Card>
        </Grid>
      </Grid>
    </RootStyle >
  );
}
export default Dashboard;
