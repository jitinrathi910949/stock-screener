import React, { useEffect } from 'react';
import { Paper, Typography, Box, Button, Card, Grid, CircularProgress } from '@mui/material';
import NextLink from 'next/link';
import { PATH_AUTH } from 'routes/paths';
import useAuth from 'hooks/useAuth';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import NewsPanel from './components/NewsPanelDemo';
import { PATH_SCREENER } from 'routes/paths';

import { getMostPopularScreenerIdsApi, getScreenerByUserApi, getScreenersIdApi } from 'redux/screener/screenerApi';
import { useRouter } from 'next/router';

export default function MostPopular() {
    const router = useRouter()
    const navigate = useRouter();
    const { screenerList = [] } = useSelector((state) => state.screenerReducer);
    const screener = useSelector((state) => state.screenerReducer);

    const { mostPopularScreenerIds, screenersId, isScreenerQueryLoading } = screener

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMostPopularScreenerIdsApi());
    }, [router]);

    useEffect(() => {
        if (mostPopularScreenerIds[0]) {
            dispatch(getScreenersIdApi({ screenerId: mostPopularScreenerIds[0]._id }));
        }
    }, [mostPopularScreenerIds]);

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
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#F2F4F9',
                borderRadius: '4px',
                padding: '24px',
            }}
        >
            {(
                <>
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            {!isScreenerQueryLoading ? <NextLink href={`${PATH_SCREENER.root}/${screenersId?.slugUrl}`} passHref>
                                <Card sx={{ flex: 1, p: 1, width: '100%' }}>
                                    <NewsPanel screenerData={screenersId} />
                                </Card>
                            </NextLink> : <CircularProgress sx={{ position: 'absolute', top: '50%', left: '45%' }} />}

                        </Grid>

                    </Grid>
                </>
            )}
        </Paper>
    );
}