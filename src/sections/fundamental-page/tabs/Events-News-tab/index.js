import * as React from 'react';
import { Box, Typography, Stack, Tab, Tabs, Paper, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UpcomingEventTable from './UpcomingEventTable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PastEventTable from './PastEventTable';
import { useRouter } from 'next/router';
import { useDispatch } from 'redux/store';
import { getTickerNewsApi, getTickerDividendAndSplitApi, loadMoreNewsApi } from 'redux/stock/stockApi';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getStockNewsApi } from 'redux/fundamentals/stockApi';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { DateRangePicker } from 'rsuite';
import _ from 'lodash';
const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } = DateRangePicker;
export default function EventsNews() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState([]);
  const [stockNewsData, setStockNewsData] = useState([]);
  const [pageLoadMore, setPageLoadMore] = useState(10);
  const [openCalender, setOpenCalender] = useState(false);

  const { stockId } = router.query;

  const shortTickerNews = !_.isEmpty(tickerNews) && _.chunk(tickerNews, 3)[0];
  const fundamental = useSelector((state) => state.fundamentalsReducer);

  const { stockNews } = fundamental;

  useEffect(() => {
    dispatch(getStockNewsApi({ ticker: stockId }));
  }, []);

  useEffect(() => {
    if (stockNews) {
      setStockNewsData(stockNews);
    }
  }, [stockNews]);

  useEffect(() => {
    if (stockNewsData && dateValue && dateValue[1]) {
      const filterDate = stockNewsData.filter(
        (a) =>
          moment(a.publishedDate).isAfter(moment(dateValue[0]).subtract(1, 'days')) &&
          moment(a.publishedDate).isBefore(moment(dateValue[1]).add(1, 'days'))
      );
      setStockNewsData(filterDate);
    }
  }, [dateValue]);

  React.useEffect(() => {
    dispatch(getTickerNewsApi({ ticker: stockId }));
    dispatch(getTickerDividendAndSplitApi({ ticker: stockId }));
  }, []);
  const {
    tickerNews = [],
    tickerDividendAndSplit = {},
    loadMoreNewsUrl,
  } = useSelector(({ stockReducer }) => stockReducer);
  const { pastEvent = [], upcomingEvent = [] } = tickerDividendAndSplit;

  const onLoadMoreClick = () => {
    console.log('loadmore', pageLoadMore);
    // dispatch(loadMoreNewsApi({ loadMoreNews: loadMoreNewsUrl }));
    setPageLoadMore(pageLoadMore + 10);
  };

  const openCalenderHandle = () => {
    setOpenCalender(true);
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600, paddingLeft: { xs: '0px' } }}
      >
        Upcoming events
      </Typography>
      <UpcomingEventTable upcomingEvent={upcomingEvent} />
      <Divider sx={{ mt: '30px' }} />
      <Typography
        sx={{
          mt: '30px',
          fontSize: '20px',
          color: '#302F42',
          lineHeight: '30px',
          fontWeight: 600,
          paddingLeft: { xs: '0px' },
        }}
      >
        Past events
      </Typography>
      <Stack direction="row" sx={{ textAlign: 'center', alignItems: 'center', mt: '20px', paddingLeft: { xs: '6px' } }}>
        <StarBorderIcon sx={{ height: '15px' }} />
        <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>
          All events
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} />
      </Stack>
      <PastEventTable pastEvent={pastEvent} />
      <Divider sx={{ mt: '30px' }} />
      <Typography
        sx={{
          mt: '30px',
          fontSize: '20px',
          color: '#302F42',
          lineHeight: '30px',
          fontWeight: 600,
          paddingLeft: { xs: '0px' },
        }}
      >
        News
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ textAlign: 'center', alignItems: 'center', padding: 0, mt: '15px', paddingLeft: { xs: '6px' } }}
      >
        <Stack direction="row" sx={{ textAlign: 'center', alignItems: 'center' }}>
          {/* <DateRangeOutlinedIcon sx={{ height: '15px' }} /> */}
          {/* <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>Dec 1 2020 – Dec 19 2020</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} />
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42', ml: '20px' }}>Historical prices</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} /> */}
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 500,
              color: '#302F42',
              marginLeft: '10px',
              paddingRight: '10px',
            }}
          >
            Date Range
          </Typography>
          <DateRangePicker
            style={
              !dateValue || !dateValue.length
                ? { maxHeight: '200px', opacity: '0', position: 'relative' }
                : { maxHeight: '200px', opacity: '1', position: 'relative' }
            }
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
              delete inputProps.value;
              return (
                <TextField
                  variant="outlined"
                  {...startProps}
                  inputProps={inputProps}
                  value={`${startValue}-${endProps.inputProps.value}`}
                />
              );
            }}
          />
          {/* <CheckCircleOutlineIcon sx={{ ml: '20px', height: '16px' }} /> */}

          {/* <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>Daily</Typography> */}
          {/* <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} /> */}
        </Stack>
        {/* <DateRangeOutlinedIcon sx={{ height: '15px' }} />
        <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>
          Data Range
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} /> */}
        <Stack onClick={() => openCalenderHandle()} sx={{ cursor: 'pointer', display: 'flex', flexFlow: 'row' }}>
          <DateRangeOutlinedIcon sx={{ pl: '10px', height: '20px', marginRight: '10px' }} />
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#302F42' }}>
            All news
          </Typography>
        </Stack>
        <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} />
      </Stack>

      <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', mt: '20px', padding: { xs: '14px' } }}>
        {stockNewsData.slice(0, pageLoadMore).map((news) => {
          const { site, title, image, publishedDate, url, text } = news;
          const publishedOn = publishedDate && moment(publishedDate)?.fromNow();
          return (
            <>
              <Stack direction="row">
                <Box
                  component="img"
                  src={image}
                  sx={{
                    maxWidth: { xs: '100px', lg: '200px' },
                    maxHeight: '120px',
                    width: 'auto',
                    objectFit: 'stretch',
                  }}
                />
                <Stack sx={{ paddingLeft: '20px' }}>
                  <Stack direction="row">
                    <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px' }}>{site}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', pl: '18px' }}>
                      {publishedOn}
                    </Typography>
                  </Stack>
                  <Link href={url} sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 700 }}>
                    {title}
                  </Link>
                  <Stack direction="row" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px' }}>
                      {text}
                      {/* <ChevronRightIcon sx={{ height: '12px', padding: '0', color: '#3886FA' }} /> */}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </>
          );
        })}
      </Stack>
      <Stack
        direction="row"
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'flex-end',
          cursor: 'pointer',
          paddingRight: { xs: '14px' },
        }}
      >
        <Typography
          sx={{ fontSize: '12px', color: '#3886FA', lineHeight: '30px', fontWeight: 500 }}
          onClick={onLoadMoreClick}
        >
          Load more
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '12px', color: '#3886FA' }} />
      </Stack>
    </Box>
  );
}
