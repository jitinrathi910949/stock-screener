import * as React from 'react';
import { Box, Typography, Paper, Grid, ListItemIcon, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BalanceIcon from '@mui/icons-material/Balance';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getBalanceSheetStatementApi, getCashFlowStatementApi, getIncomeStatementApi } from 'redux/fundamentals/stockApi'
export default function Liner({ typeData }) {
  const [period, setPeriod] = React.useState('annual');
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  useEffect(() => {
    switch (typeData) {
      case 'income':
        dispatch(getIncomeStatementApi({ period: period, ticker: stockId }));
        return;
      case 'balance':
        dispatch(getBalanceSheetStatementApi({ period: period, ticker: stockId }));
        return;
      case 'cashFlow':
        dispatch(getCashFlowStatementApi({ period: period, ticker: stockId }));
        return;
      default:
        return;
    }
  }, [period])
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', mt: '30px', alignItems: 'center', textAlign: 'center' }}>
      <Stack direction="row" spacing={1} sx={{}}>
        {/* <CheckCircleOutlineIcon sx={{height:'16px'}}/> */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={period}
            onChange={handleChange}
            label="Period"
            sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}
          >
            <MenuItem sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }} value={"annual"}>Annual</MenuItem>
            <MenuItem sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }} value={"quarter"}>Quarterly</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* <Stack direction="row" spacing={1}>
        <BalanceIcon sx={{ height: '16px' }} />
        <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 500 }}>Compare to</Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} />
      </Stack> */}
    </Stack>

  )
}