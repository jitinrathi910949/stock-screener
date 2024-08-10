import * as React from 'react';
import { Box, Typography, Stack,Tab,Tabs,Paper,Grid } from '@mui/material';
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
import { getInsiderTradingApi, getInstitutionalHoldersApi, getMutualFundHoldersApi } from 'redux/fundamentals/stockApi';
import { useRouter } from 'next/router';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

export default function InsiderTraders() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { ticker, insiderTrading, isLoading } = fundamental;
  useEffect(() => {
    dispatch(getInsiderTradingApi({ ticker: stockId }));
  }, [])
  console.log(tableCellClasses.root);
    return(
      <Box>

       <Typography sx={{ mb: '20px', fontFamily: 'Poppins', fontSize: '20px', color: '#302F42', fontWeight: 600 ,mt:2}}>
       Insider trading
         </Typography>

      <TableContainer component={Paper} sx={{mt:'30px'}}>
      <Table>
        <TableHead>
          <TableRow sx={{backgroundColor: 'white',}}>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins',position: "sticky",left: 0, zIndex: 5 }} >Name and title</TableCell>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Date</TableCell>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Action</TableCell>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">#Shares</TableCell>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">$Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {insiderTrading.slice(0,10).map((row) => (
            <TableRow key={row.name}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{backgroundColor: 'white',position: "sticky",left: 0,}}>
                <Stack>
                  <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                    {row?.reportingName}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', opacity: '0.5' }}>
                    {row?.typeOfOwner}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                {row?.transactionDate}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                {row?.transactionType}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                {row?.securitiesTransacted}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                {row?.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

     )
    };
