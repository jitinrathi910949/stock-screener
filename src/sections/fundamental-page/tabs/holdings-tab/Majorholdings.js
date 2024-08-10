import * as React from 'react';
import { Box, Typography, Stack, Tab, Tabs, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getInstitutionalHoldersApi, getMutualFundHoldersApi } from 'redux/fundamentals/stockApi';
import { useRouter } from 'next/router';

function createData(name, shares, date, value, price) {
  return { name, shares, date, value, price };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function MajorHoldings() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { ticker, institutionalHolders, mutualFundHolders, isLoading } = fundamental;
  useEffect(() => {
    dispatch(getInstitutionalHoldersApi({ ticker: stockId }));
    dispatch(getMutualFundHoldersApi({ ticker: stockId }));

  }, [])

  console.log(tableCellClasses.root);
  return (
    <Box>

      <Typography sx={{ mb: '20px', fontFamily: 'Poppins', fontSize: '20px', color: '#302F42', fontWeight: 600, mt: 2 }}>
        Major holders breakdown
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 500 }}>Insitutional holders</Typography>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 600 }}> 56%</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 500 }}>Mutual fund holders</Typography>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 600 }}> 56%</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 500 }}>Public holders</Typography>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 600 }}> 56%</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 500 }}>Other holders</Typography>
          <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 600 }}> 56%</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: '30px' }} />

      <Typography sx={{ mb: '20px', fontFamily: 'Poppins', fontSize: '20px', color: '#302F42', fontWeight: 600, }}>
        Top Institutional Holders
      </Typography>

      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white', }}>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5 }} >Holders</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Share</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Date reported</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutionalHolders.slice(0,10).map((row) => (
              <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: 'white', position: "sticky", left: 0, }}>
                  <Stack>
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.holder}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', opacity: '0.5' }}>
                    {row.name?.info}
                  </Typography> */}
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {row?.shares}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {row?.dateReported}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {row?.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: '30px' }} />

      <Typography sx={{ mb: '20px', fontFamily: 'Poppins', fontSize: '20px', color: '#302F42', fontWeight: 600 }}>
        Top Mutual Fund Holders
      </Typography>

      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white', }}>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5 }} >Holders</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Share</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Date reported</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mutualFundHolders.slice(0,10).map((row) => (
              <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: 'white', position: "sticky", left: 0, }}>
                  <Stack>
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.holder}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', opacity: '0.5' }}>
                    {row.name?.info}
                  </Typography> */}
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {row?.shares}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {row?.dateReported}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {row?.change}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



    </Box>

  )
};






