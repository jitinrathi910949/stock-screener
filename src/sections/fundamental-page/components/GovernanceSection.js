import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import useResponsive from 'hooks/useResponsive';

const qualityScoreList = [
  {
    type: 'Audit',
    review: '1',
    outOf: '/10',
    icon: '/assets/fund-page/profileTab-img/audit.svg',
  },
  {
    type: 'Board',
    review: '1',
    outOf: '/10',
    icon: '/assets/fund-page/profileTab-img/board.svg',
  },
  {
    type: 'Shareholder Rights',
    review: '1',
    outOf: '/10',
    icon: '/assets/fund-page/profileTab-img/shareholder.svg',
  },
  {
    type: 'Compensation',
    review: '1',
    outOf: '/10',
    icon: '/assets/fund-page/profileTab-img',
  },
];
export default function Metrics() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
   { isDesktop ?   <Box sx={{display:'flex',flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Typography sx={{fontSize: '20px', lineHeight: '30px', color : '#302F42', fontWeight: 600, fontFamily: 'poppins', padding:{xs:'12px 16px 0 14px'}}}>
          ISS governance QualityScore: <span style={{color :'red'}}>1</span>
          <span style={{fontSize: '12px', lineHeight: '18px', color : '#302F42', fontWeight: 400}}>/10</span>
        </Typography>
        <HelpOutlinedIcon sx={{fontSize: '12px', ml: {md:'8px',xs:'0'},marginTop: '6px',
    color: '#A2B1CE'}} />
      </Box> :
      <Box sx={{display:'flex',flexDirection: 'column', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Typography sx={{fontSize: '20px', lineHeight: '30px', color : '#302F42', fontWeight: 600, fontFamily: 'poppins', padding:{xs:'12px 16px 0 0px'}}}>
          ISS governance QualityScore: 
          </Typography>
          <Typography sx={{fontSize: '20px', lineHeight: '30px', color : '#302F42', fontWeight: 500, fontFamily: 'poppins', padding:{xs:'0 0 0 0px'}}}style={{color :'red'}}>1
          <span style={{fontSize: '12px', lineHeight: '18px', color : '#302F42', fontWeight: 400}}>/10</span>
          
          <span><HelpOutlinedIcon sx={{fontSize: '12px', ml: {md:'8px',xs:'10px'},marginTop: '6px',
    color: '#A2B1CE'}} /> </span></Typography>
      </Box>}
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={12}
          sx={{ justifyContent: { sm: 'center', xs: 'space-between' }, alignItems: { sm: 'center', xs: 'center' } ,padding:{xs:'0 16px 16px 4px'} }}
        >
          {qualityScoreList.map((val, index) => (
            <Grid item xs={6} sm={7} md={3} key={index}>
              <Stack direction="row" spacing={1}>
                <Box component="img" src={val.icon} sx={{ mr: '10px', fontSize: '20px' }} />
                <Box sx={{ pt: '5px' }}>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      lineHeight: '18px',
                      fontWeight: 500,
                      color: '#302F42',
                      fontFamily: 'poppins',
                    }}
                  >
                    {val.type}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      lineHeight: '18px',
                      fontWeight: 400,
                      color: '#302F42',
                      fontFamily: 'poppins',
                    }}
                  >
                    {val.review}
                    <span
                      sx={{
                        fontSize: '12px',
                        lineHeight: '18px',
                        fontWeight: 600,
                        color: '#302F42',
                        fontFamily: 'poppins',
                      }}
                    >
                      {val.outOf}
                    </span>
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
