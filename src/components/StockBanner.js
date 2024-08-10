import React from 'react';
import { Grid, Box } from '@mui/material';


export default function StockBanner() {
  return (
    <Grid sx={{ flexGrow: 1, flex: 1 }} container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Box component="img" src="/assets/img/free-shipping.jpg" />
          </Grid>
          <Grid item>
            <Box component="img" src="/assets/img/upgrade-premium.jpg" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
