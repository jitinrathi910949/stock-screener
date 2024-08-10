import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

let industryType = [
  {
    priText: 'Sector',
    secText: 'Technology',
    imageSrc: '/assets/fund-page/profileTab-img/sector.svg',
  },
  {
    priText: 'Industry',
    secText: 'Consumer Electronics',
    imageSrc: '/assets/fund-page/profileTab-img/industry.svg',
  },
  {
    priText: 'Full time employees',
    secText: '147 000',
    imageSrc: '/assets/fund-page/profileTab-img/employees.svg',
  },
];

const IndustryType = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { stockId } = router.query;

  const fundamental = useSelector((state) => state.fundamentalsReducer);

  const { profile } = fundamental

  const industryType = [
    {
      priText: 'Sector',
      secText: profile && profile[0] ? profile[0].sector : "",
      imageSrc: '/assets/fund-page/profileTab-img/sector.svg',
    },
    {
      priText: 'Industry',
      secText: profile && profile[0] ? profile[0].industry : "",
      imageSrc: '/assets/fund-page/profileTab-img/industry.svg',
    },
    {
      priText: 'Full time employees',
      secText: profile && profile[0] ? profile[0].fullTimeEmployees : "",
      imageSrc: '/assets/fund-page/profileTab-img/employees.svg',
    },
  ];
  return (
    <Stack spacing={1} container sx={{ mt: { md: '30px', xs: '0', sm: '0' } }}>
      <Grid container direction="row" sx={{ justifyContent: 'space-between' }} >
        {industryType.map((opt) => (
          <>
            <Grid
              xs={12}
              sm={12}
              md={3.8}
              lg={3.8}
              item
              direction="row"
              spacing={1}
              sx={{
                mb: { xs: '6px' },
                height: '76px',
                width: '228px',
                border: '1px solid grey',
                borderRadius: '4px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Box component="img" src={opt.imageSrc} sx={{ pt: '3px' }} />
              <Stack sx={{ padding: 0, ml: 1 }}>
                <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 600 }}>
                  {opt.priText}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px' }}>{opt.secText}</Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
    </Stack>
  )
};
export default IndustryType;
