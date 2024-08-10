import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { Paper, Grid, Typography, Box, Stack, List, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppleComponent from './tabs/overview-tab/AppleComponent';
import TabsSwitcher from './TabsSwitcher';
import Investment from './components/Investment';


const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  });

function FundamentalDesktop(props) {
    return(
        <RootStyle>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: 'flex',flexDirection:'row', mt: 5, mx: '150px' }}
        >
         <Paper elevation={0} sx={{ width: '340px', height: '728px', padding: '30px' }}>
         <AppleComponent />       
        <Investment  />
        </Paper> 
        <TabsSwitcher />
        </Stack>
    </RootStyle>
  );
}
       
export default FundamentalDesktop;