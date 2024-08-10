import { Paper, Grid, Typography, Box, Stack, Card, Button } from '@mui/material';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; import { getProfileApi } from 'redux/fundamentals/stockApi';

const AppleComponent = () => {
  const dispatch = useDispatch();

  const { tickerDetails = {} } = useSelector(({ stockReducer }) => stockReducer);
  const { name, ticker, primary_exchange } = tickerDetails;
  const router = useRouter();
  const { stockId } = router.query;
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { profile, isLoading } = fundamental
  useEffect(() => {
    dispatch(getProfileApi({ ticker: stockId }));
  }, [])
  const { image, symbol, companyName, price, changes } = (profile && profile[0]) ? profile[0] : {}
  const changePercent = (profile && profile[0]) ? (profile[0]?.changes / profile[0].price) * 100 : 0
  const changeStr = Number(changes) > 0 ? `+${Number(changes).toFixed(2)}` : Number(changes).toFixed(2)
  return (profile ? 
    <Box>
      <Stack direction="row" sx={{ marginTop: '10px', alignItems: 'center' }}>
        <Box component="img" src={image} sx={{ maxWidth: { xs: '23px', lg: '23px' }, width: 'auto', marginRight: "10px" }} />

        <Typography sx={{ fontSize: '20px', fontWeight: 600, lineHeight: '30px', color: '#302F42' }}>
          {companyName}  {symbol ? `(${symbol})` : ""}
        </Typography>

      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ fontSize: '12px', lineHeight: '30px', color: '#302F42' }}>{primary_exchange} </Typography>
        {/* <Typography sx={{ fontSize: '12px', lineHeight: '30px', color: '#302F42', ml: 2 }}>
          NasdaqGS Real Time Price
        </Typography> */}
      </Box>
      <Stack direction="row" sx={{ marginTop: '10px', alignItems: 'baseline' }}>
        <Typography sx={{ fontSize: '10px', fontWeight: 500, lineHeight: '15px', color: '#302F42' }}>{price ? '$' : ''}</Typography>
        <Typography
          sx={{ fontSize: '24px', fontWeight: 500, lineHeight: '36px', color: '#302F42', paddingLeft: '4px' }}
        >
          {price ? price : ""}
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: changePercent > 0 ? '#33883e' : '#F14B47', paddingLeft: '8px' }}
        >
          {changes ? changeStr : ""} {changePercent ? `(${changePercent.toFixed(2)}%)` : ""}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ marginTop: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          disableElevation
          variant="outlined"
          sx={[
            {
              '&:hover': {
                backgroundColor: 'white',
                borderColor: '#3886FA',
              },
              height: '28px',
              borderColor: '#3886FA',
              color: '#3886FA',
            },
          ]}
        >
          <NotificationAddOutlinedIcon sx={{ color: '#3886FA', height: '28px', mr: ' 6px' }} />
          Add alert
        </Button>
        <Button
          disableElevation
          variant="contained"
          sx={[
            {
              '&:hover': {
                backgroundColor: '#3886FA',
              },
              backgroundColor: '#3886FA',
              height: '28px',
              color: 'white',
              boxShadow: 'none',
            },
          ]}
        >
          Add to wishlist
        </Button>
      </Stack>
      <Divider sx={{ mt: '30px' }} />
    </Box> : <div />
  );
};
export default AppleComponent;
