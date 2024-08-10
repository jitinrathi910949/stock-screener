import React from 'react';
import { Box, Divider } from '@mui/material';
import IndustryType from '../../components/IndustryType';
import ProfileInformation from '../../components/ProfileInformation';
import GovernanceSection from '../../components/GovernanceSection'
import CustomTable from 'sections/fundamental-page/components/Table';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'redux/store';
import { getTickerDetailsApi } from 'redux/stock/stockApi';

export default function Metrics() {
  const router = useRouter();
  const dispatch= useDispatch();
  const { tickerDetails = {} } = useSelector(({ stockReducer }) => stockReducer);

  const { stockId } = router.query;
  React.useEffect(()=>{
    dispatch(getTickerDetailsApi({ ticker: stockId }));
  },[])
  return (
    <Box>
      <IndustryType />
      <Divider sx={{ my: '30px', color: '#E7EDF9' }} />
     <GovernanceSection />
    <Divider sx={{ my: '30px', color: '#E7EDF9' }} />
    
       <ProfileInformation/>
      <Divider sx={{ my: '30px', color: '#E7EDF9' }} />
      <CustomTable />
    </Box>
  );
}
