import React, { useEffect } from 'react';
import { Paper, Typography, Box, Button, Card, Grid } from '@mui/material';
import NextLink from 'next/link';
import { PATH_AUTH } from 'routes/paths';
import useAuth from 'hooks/useAuth';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import NewsPanel from './components/NewsPanelDemo';
import { PATH_SCREENER } from 'routes/paths';

import { getScreenerByUserApi } from 'redux/screener/screenerApi';
import { useRouter } from 'next/router';

export default function YourScreener() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth();
  const navigate = useRouter();
  const { screenerList = [] } = useSelector((state) => state.screenerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    
      dispatch(getScreenerByUserApi());
    
  }, [router]);
  function onScreenerClick(id) {
    navigate.push(`${id}`);
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '280px',
        justifyContent: !_.isEmpty(user) ? 'flex-start' : 'center',
        alignItems: !_.isEmpty(user) ? 'flex-start' : 'center',
        backgroundColor: '#F2F4F9',
        borderRadius: '4px',
        padding: '24px',
      }}
    >
      {_.isEmpty(user) ? (
        <>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '280px',
              justifyContent: ' center',
              alignItems: 'center',
              border: '2px dashed #C7D0E8',
              borderRadius: '4px',
            }}
          >
            <Box component="img" src="/assets/img/browser.svg" />
            <Typography sx={{ marginTop: '15px', marginBottom: '30px' }}>
              Sign in to view your saved screener
            </Typography>
            <NextLink href={PATH_AUTH.login} passHref>
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
                  },
                ]}
              >
                Sign in
              </Button>
            </NextLink>
            {/* <Typography>first Tab</Typography> */}
          </Box>
        </>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
            {screenerList?.slice(0,10)
              .filter((scr) => !!scr?.screenerName)
              .map((scr, ind) => (
                <Grid key={`${ind}-keys`} item lg={6} md={6} sm={12} xs={12}>
                  <NextLink href={`${PATH_SCREENER.root}/${scr?.slugUrl}`} passHref>
                    <Card sx={{ flex: 1, p: 1, width: '100%' }}>
                      <NewsPanel screenerData={scr} scrName={scr?.screenerName} scrDesc={scr?.description} />
                    </Card>
                  </NextLink>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Paper>
  );
}
