import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { Paper, Grid, Typography, Box, Stack, List, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppleComponent from './tabs/overview-tab/AppleComponent';
import TabsSwitcher from './TabsSwitcher';
import Investment from './components/Investment';
import Investementre from './overview-retab/Investmentre';
import Keymetricsre from './overview-retab/Keymetricsre';
import Newsre from './overview-retab/Newsre';
// import Investment from './tabs/overview-tab/Investment';
// import 



const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  position: 'relative'
});

const useStyles = makeStyles((theme) => ({
  createStock: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  stockList: {
    width: '100%',
    height: 643,
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: 3,
  },
}));

function Dashboard() {
  return (
    <RootStyle>
      <Stack
        direction="row"
        spacing={2}
        style={{ display: 'flex',justifyContent: 'flex-start', alignItems: 'flex-start', mx: '150px', marginTop: '70px' }}
      >
        <Paper sx={{ width: '340px', height: '728px', padding: '30px', display:'block' }}>
          <AppleComponent />
          <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#302F42', mt: '30px' }}>
            Investment Checklist 
          </Typography>
          <List sx={{ width: '100%', py: 0, mt: '20px' }}>
            {/* {checklist.map((per) => (
              <Investment imageSrc={per.imageSrc} secondaryText={per.secText} primaryText={per.priText} />
            ))} */}
          </List>
        </Paper>
        <TabsSwitcher />
      </Stack>
    </RootStyle>
  );
}
export default Dashboard;
