import {useEffect} from 'react';
import Layout from 'layouts';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Box, Typography, Button, Card, OutlinedInput, InputAdornment } from '@mui/material';
import Page from 'components/Page';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import useResponsive from 'hooks/useResponsive';
import ScreenerHomePage from 'sections/screener/screener-home';
import StockBanner from 'components/StockBanner';
import NewsPanel from 'sections/screener/screener-home/components/NewsPanel';
import SearchIcon from '@mui/icons-material/Search';
import { getScreenerByUserApi } from 'redux/screener/screenerApi';

import { useSelector } from 'react-redux';
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
      [theme?.breakpoints?.down('md')]: {
        width: '100%',
      },
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '18px 16px',
      margin: '24px 0px',
    },
}));

ScreenerPage.getLayout = function getLayout(page) {
  return <Layout variant="screener">{page}</Layout>;
};

export default function ScreenerPage() {
  const dispatch= useDispatch();

  useEffect(() => {
    if (_.isEmpty(screenerList)) {
      dispatch(getScreenerByUserApi());
    }
  }, []);
  const { screenerList = [] } = useSelector((state) => state.screenerReducer);
 const classes = useStyles();
 const isDesktop = useResponsive('up', 'md');

  return (
    <RootStyle title="Fundamental Screener" elevation={2}>
      <Paper elevation={3} className={classes.createStock}>
        <Grid sx={{ flexGrow: 1, flex: 1 }} container spacing={2}>
          <Grid item  lg={12}>
            <StockBanner />
          </Grid>
          <Grid lg={12} xs={12} item sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography as="div" sx={{ fontSize: '18px', fontWeight: '500', my: '11px' }}>
              Search Screeners :{' '}
            </Typography>
            {/* <Grid
              container
              direction="row"
              lg={12} 
              sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <OutlinedInput
                sx={{ px: '0 !important', height: '36px', borderRadius: '4px' }}
                fullWidth
                type="text"
                placeholder="search terms eg : RSI, BreakOut, Uptrend, Short term .."
                color="primary"
                // onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end" sx={{ height: '100%' }}>
                {  isDesktop ?  <Button variant="contained" sx={{ boxShadow: 'none', borderBottomRightRadius: '4px', borderTopRightRadius: '4px'}}>
                      <SearchIcon />
                       Search scans 
                    </Button> :
                    <Button variant="contained" sx={{ boxShadow: 'none', borderBottomRightRadius: '4px', borderTopRightRadius: '4px'}}>
                      <SearchIcon />
                       
                    </Button>}
                  </InputAdornment>
                }
                InputLabelProps={{shrink: false}}
              />
            </Grid> */}
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                sx={{ fontSize: '12px', color: '#3a2f27', fontWeight: 400, marginBottom: '11px' }}
              >
               Search results in all screeners for search term:
              </Typography>
              {/* <NextLink href={PATH_SCREENER.newScreener} passHref> */}
              {/* </NextLink> */}
            </Box>
            <Box sx={{ display: 'flex',flexDirection: 'column' }}>
              {screenerList
                .filter((scr) => !!scr?.screenerName)
                .map((scr) => (
                  <Grid item lg={12} md={12} sm={12} sx={12}>
                    <Card sx={{ flex: 1, p: 1 }}>
                      <NewsPanel screenerData={scr} scrName={scr?.screenerName} scrDesc={scr?.description} />
                    </Card>
                  </Grid>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </RootStyle>
  );
}
