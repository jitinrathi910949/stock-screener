import { Box, Typography, Stack, Grid } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getProfileApi } from 'redux/fundamentals/stockApi';
import { useEffect, useState } from 'react';

export default function CompanyShortDescription(props) {
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { profile } = fundamental
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;

  useEffect(() => {
      dispatch(getProfileApi({ ticker: stockId }));
  }, [])
  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600 }}
        >
          Company description
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={()=> router.push(`${router?.query?.stockId}/profile`)}>
          <Typography sx={{ fontSize: '12px', color: '#3886FA', fontWeight: 500 }}>Profile</Typography>
          <ChevronRightIcon sx={{ fontSize: '14px', color: '#3886FA' }} />
        </Stack>
      </Stack>
      <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 500, mt: '20px' }}>
        {profile && profile[0] && profile[0]?.description}
      </Typography>
    </Box>
  );
}
