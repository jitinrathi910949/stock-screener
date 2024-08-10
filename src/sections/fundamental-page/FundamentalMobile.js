import { Typography, Paper, Stack, Button, Box, IconButton,Grid } from '@mui/material';
import Investment from './components/Investment';
import Keymetrics from './components/Keymetrics';
import News from './components/News';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Collapse } from '@mui/material';
import { useState } from 'react';
import IndustryType from './components/IndustryType';
import GovernanceSection from './components/GovernanceSection';
import ProfileInformation from './components/ProfileInformation';
import Table from './components/Table';
import FinancialTab from './tabs/financial-tab'
import HistoricalDataTab from './tabs/historicalData-tab';
import Holdings from './tabs/holdings-tab';
import EventsNews from './tabs/Events-News-tab';


const advisory = [
    {
      priText: 'Technology',
      secText: 'Technology – consumer electronics',
      imageSrc: '/assets/fund-page/overviewTab-img/Techno.svg',
    },
    {
      priText: 'Largecap',
      secText: 'With a market cap of 121,78 bil stock is ranked 1',
      imageSrc: '/assets/fund-page/overviewTab-img/cap.svg',
    },
    {
      priText: 'Low risk',
      secText: 'ISS score of this stock is ranked 1',
      imageSrc: '/assets/fund-page/overviewTab-img/Frame.svg',
    },
  ];


function FundamentalMobile(props) {
  const [showMore, setShowMore] = useState(false);
  const [collapse, setCollapse] = useState(false);
  return (
    <>
        <Paper sx={{ padding: '20px' }}>
        <Typography sx={{ fontSize:'20px',fontWeight:600,lineHeight:'30px',color:'#302F42'}}>
            Apple INC (AAPL)</Typography>
      <Box sx={{ display:'flex',flexDirection:'row',}}>
            <Typography sx={{ fontSize:'12px',lineHeight:'30px',color:'#302F42'}}>
            NasdaqGS </Typography>
            <Typography sx={{ fontSize:'12px',lineHeight:'30px',color:'#302F42',ml:2}}>
            NasdaqGS Real Time Price</Typography>
       </Box>
       <Stack  sx={{display:'flex',flexDirection:'row',mt:'8px'}}>
      {advisory.map((opt) => (
        <>
            <Stack  direction="row" sx={{ padding: 1 ,ml:'3px', alignItems:'center',justifycontent:'center',border:'1px solid grey', borderRadius:'25px'}}>
            <Box component="img" src={opt.imageSrc} sx={{ pt: '3px' ,height:'14px'}} />
              <Typography sx={{ fontSize: '10px', color: '#302F42', fontWeight: 600 ,ml:'6px'}}>
                {opt.priText}
              </Typography>
            </Stack>
        </>
      ))}
    
    </Stack>
        <Stack direction="row" sx={{marginTop:'10px', alignItems:'baseline'}}>
            <Typography sx={{ fontSize:'10px',fontWeight:500,lineHeight:'15px',color:'#302F42'}}>
            $</Typography>
            <Typography sx={{ fontSize:'24px',fontWeight:500,lineHeight:'36px',color:'#302F42',paddingLeft:'4px'}}>
            121.78</Typography>
            <Typography sx={{ fontSize:'16px',fontWeight:500,lineHeight:'24px',color:'#F14B47',paddingLeft:'8px'}}>
            -0.63 (-0.51%)</Typography>
       </Stack>
   <Box component="img" src='/assets/fund-page/overviewTab-img/chart.svg' sx={{ height:'200px',paddingRight:''}}/>
       </Paper>
 
      <Paper sx={{ padding: '20px' ,mt:2}}>
        <Investment />
      </Paper>

      <Paper sx={{ padding: '20px', mt: 2 }}>
        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 600, color: '#302F42' }}>
            Key metrics
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'baseline' }}>
            <LockOutlinedIcon sx={{ color: '#3886FA', height: '16px', pl: '12px', pt: '5px' }} />
            <Typography
              sx={{ color: '#3886FA', fontSize: '12px', lineHeight: '18px', fontWeight: 500, paddingLeft: '7px' }}
            >
              Settings
            </Typography>
          </Stack>
        </Stack>
        <Keymetrics />
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 3, alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#3886FA' }}>
            Financial statements
          </Typography>
          <ArrowForwardIosOutlinedIcon sx={{ color: '#3886FA', fontSize: '10px', paddingLeft: '4px' }} />
        </Stack>
      </Paper>

      <Paper sx={{ padding: '20px', mt: 2, alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600 }}
        >
          Company description
        </Typography>
        <Stack direction="row" sx={{ display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
        <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 500, mt: '20px' }}>
          Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and
          accessories worldwide. It sells
        </Typography>
        <Typography onClick={()=>setCollapse(true)} sx={{fontSize: '12px',backgroundColor:'', color: '#3886FA' }}>...</Typography>

        </Stack>
        <Collapse in={collapse}>
          <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 500 }}>
             various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal
            computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods,
            Apple TV, Apple Watch, Beats products, HomePod, iPod.
            <Typography onClick={()=>setCollapse(false)} sx={{fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#3886FA' ,}}>Read less
            </Typography>
          </Typography>
        </Collapse>
      </Paper>
      <Paper sx={{ padding: '20px', mt: 2 }}>
        <News />
      </Paper>
        
      {/* ProfileMobileview */}

      <Paper>
         <IndustryType />
         <GovernanceSection />
         <ProfileInformation />
         <Table />
      </Paper>
     
      {/* FinancialMobileview */}

      <Paper>
     <FinancialTab />
      </Paper>
     
      {/* HistoricalDataMobileview */}
      <Paper>
     <HistoricalDataTab />
      </Paper>

      <Paper>
     <Holdings />
      </Paper>

      <Paper>
     <EventsNews />
      </Paper>


    </>
  );
}

export default FundamentalMobile;
