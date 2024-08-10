import { Box, Typography, Stack, Paper } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getHistoricalChartApi, getHistoricalDailyChartApi } from 'redux/fundamentals/stockApi';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DateRangePicker } from 'rsuite';
import moment from "moment";
const {
  allowedMaxDays,
  allowedDays,
  allowedRange,
  beforeToday,
  afterToday,
  combine
} = DateRangePicker;

export default function HistoricalDataTab(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { historicalChart, historicalDailyChart } = fundamental
  const [dataHistory, setDataHistory] = useState([]);
  const [period, setPeriod] = useState('1hour');
  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  const [dateValue, setDateValue] = useState([]);
  const [openCalender, setOpenCalender] = useState(false);

  useEffect(() => {
    if (historicalChart) {
      setDataHistory(historicalChart)
    }
  }, [historicalChart])

  useEffect(() => {
    if (historicalChart && dateValue) {
      const filterDate = historicalChart.filter(a => (moment(a.date).isAfter(moment(dateValue[0]).subtract(1, 'days')) && moment(a.date).isBefore(moment(dateValue[1]).add(1, 'days'))));
      setDataHistory(filterDate)
    }
  }, [dateValue])

  useEffect(() => {
    dispatch(getHistoricalChartApi({ period: period, ticker: stockId }));
    dispatch(getHistoricalDailyChartApi({ ticker: stockId }));

  }, [period])

    
  const openCalenderHandle = () => {
    setOpenCalender(true);
  }

  console.log(tableCellClasses.root);
  return ( historicalChart && 
    <Box>
      <Typography sx={{ mb: '20px', fontFamily: 'Poppins', fontSize: '20px', color: '#302F42', fontWeight: 600, paddingLeft: { xs: '0px' } }}>
        Historical Data
      </Typography>

      <Stack direction="row" spacing={1} sx={{ textAlign: 'center', alignItems: 'center', padding: '0px', justifyContent: 'space-between' }} >
        <Stack direction="row" sx={{ textAlign: 'center', alignItems: 'center', }}>
          {/* <DateRangeOutlinedIcon sx={{ height: '15px' }} /> */}
          {/* <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>Dec 1 2020 – Dec 19 2020</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} />
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42', ml: '20px' }}>Historical prices</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} /> */}
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42', marginLeft: '10px', paddingRight:'10px' }}>
            Date Range
          </Typography>
          <DateRangePicker
            style={ (!dateValue || !dateValue.length) ? { maxHeight: '200px', opacity: '0',position:'relative' } : {maxHeight: '200px', opacity: '1',position:'relative'}}
            startText="Start date"
            endText="End date"
            value={dateValue}
            placeholder="Select Date"
            open={openCalender}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            onOk={() => {
              setOpenCalender(false);
            }}
            onClick={() => {
              if (dateValue && dateValue.length) {
                setOpenCalender(true);
              }
            }}
            disabledDate={afterToday()}
            renderInput={({ inputProps, ...startProps }, endProps) => {
              const startValue = inputProps.value;
              delete inputProps.value
              return (
                <TextField
                  variant='outlined'
                  {...startProps}
                  inputProps={inputProps}
                  value={`${startValue}-${endProps.inputProps.value}`}
                />
              )
            }}
          />
         <Stack onClick={() => openCalenderHandle()} sx={{ cursor: 'pointer', display:'flex', flexFlow:'row' }}>
            <DateRangeOutlinedIcon sx={{ pl: '10px', height: '20px', marginRight:'10px'  }} />
            <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>
            All news
            </Typography>
          </Stack>
          {/* <CheckCircleOutlineIcon sx={{ ml: '20px', height: '16px' }} /> */}


          {/* <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>Daily</Typography> */}
          {/* <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} /> */}
        </Stack>
        <Stack direction="row" sx={{ textAlign: 'center', alignItems: 'center', }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={period}
              onChange={handleChange}
              label="Period"
              sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }}
            >
              <MenuItem sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} value={"1min"}>1 min</MenuItem>
              <MenuItem sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} value={"5min"}>5 min</MenuItem>
              <MenuItem sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} value={"15min"}>15 min</MenuItem>
              <MenuItem sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} value={"30min"}>30 min</MenuItem>
              <MenuItem sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} value={"1hour"}>1 hour</MenuItem>
              {/* <MenuItem value={"Daily"}>Daily</MenuItem> */}
            </Select>
          </FormControl>
        </Stack>
        {/* <Stack direction="row" sx={{ textAlign: 'center', alignItems: 'center', }}>
          <BalanceIcon sx={{ height: '16px' }} />
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>Compare to</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} />
        </Stack> */}
      </Stack>

      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white', }}>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5, minWidth: { xs: '150px', sm: '150px', md: '220px' } }}>Date</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="left">Open</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="left">High</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="left">Low</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="left">Close</TableCell>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="left">Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataHistory[0] && dataHistory.slice(0, 100)?.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: 'white', position: "sticky", left: 0, }}>
                  <Stack>
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.date}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', opacity: '0.5' }}>
                    {row.name?.info}
                  </Typography> */}
                  </Stack>
                </TableCell>

                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  <Stack direction="row">
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.open}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', paddingLeft: '4px' }}>
                      {row.pay}
                    </Typography> */}
                  </Stack>
                </TableCell>


                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', }}>
                  <Stack direction="row">
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.high}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', paddingLeft: '4px' }}>
                      {row.pay}
                    </Typography> */}
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  <Stack direction="row">
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.low}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', paddingLeft: '4px' }}>
                      {row.shares}
                    </Typography> */}
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  <Stack direction="row">
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.close}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', paddingLeft: '4px' }}>
                      {row.value}
                    </Typography> */}
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                  <Stack direction="row">
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.volume}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', paddingLeft: '4px' }}>
                      {row.price}
                    </Typography> */}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  )
};

