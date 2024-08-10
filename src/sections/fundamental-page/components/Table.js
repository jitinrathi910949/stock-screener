import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getKeyExecutivesApi } from 'redux/fundamentals/stockApi';

export default function CustomTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { stockId } = router.query;

  const fundamental = useSelector((state) => state.fundamentalsReducer);

  const { keyExecutives } = fundamental

  useEffect(() => {
    dispatch(getKeyExecutivesApi({ ticker: stockId }));
  }, [])
  console.log(tableCellClasses.root);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ paddingLeft: { xs: '30px' } }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: 'white', paddingLeft: { xs: '30px' } }}>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5, paddingLeft: { xs: '30px' } }} >Name and title</TableCell>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Pay</TableCell>
            <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">Gender</TableCell>

            {/* <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">$Price</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {keyExecutives && keyExecutives.map((row) => {
            const { title, name, pay, currencyPay, gender, yearBorn, titleSince } = row
            return (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: 'white', position: "sticky", left: 0, }}>
                  <Stack >
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {name}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', opacity: '0.5' }}>
                      {title}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {pay}
                </TableCell>
                
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  {gender}
                </TableCell>
                {/* <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                {row.price}
              </TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
