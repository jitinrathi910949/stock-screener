import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Paper,Stack ,Grid} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Newsinfo = [
    {
      priText: 'Apple Increases iPhone Production, Boosting Confidence In 5G Supercycle',
      secText: 'Apple stock rose Tuesday after a news report said the consumer electronics giant is increasing its iPhone production orders for...',
      headline:' Business wire',
      daysAgo:' 21 days ago',
      imageSrc: '/assets/fund-page/overviewTab-img/News1.png',
    },
    {
        priText: 'Apple Increases iPhone Production, Boosting Confidence In 5G Supercycle',
        secText: 'Apple stock rose Tuesday after a news report said the consumer electronics giant is increasing its iPhone production orders for...',
        headline:' Business wire',
        daysAgo:' 21 days ago',
        imageSrc: '/assets/fund-page/overviewTab-img/News1.png',
      },
      {
        priText: 'Apple Increases iPhone Production, Boosting Confidence In 5G Supercycle',
        secText: 'Apple stock rose Tuesday after a news report said the consumer electronics giant is increasing its iPhone production orders for...',
        headline:' Business wire',
        daysAgo:' 21 days ago',
        imageSrc: '/assets/fund-page/overviewTab-img/News1.png',
      },   
  ];

export default function Newsre(props) {
    return (
   <Box sx={{ width:{xl:'784px', lg:'784px', md:'784px', sm:'600px',xs:'300px',},}} >
       <Paper sx={{ padding:'20px',mt:'20px'}}>
   <Stack direction="row" sx={{justifyContent:'space-between',alignItems:'center',mt:'20px'}}> 
   <Typography sx={{textAlign:'center',fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight:600}}>
   News
   </Typography>
   <Stack  direction="row" sx={{alignItems:'center'}}> 
   <Typography sx={{ fontSize: '12px', color: '#3886FA',fontWeight:500}}>
   Profile
   </Typography>
   <ChevronRightIcon sx={{fontSize: '14px', color: '#3886FA',}} />
   </Stack>
   </Stack>
   
   <Stack  spacing={2} sx={{ display:'flex', flexDirection:'column',mt:'20px'}}>
    {Newsinfo.map((val) =>  (  
         <>   
             <Stack direction="row" >
             <Box component="img" src={val.imageSrc} sx={{ height:{xs:'72px'}}}/>
             <Stack sx={{ paddingLeft:'20px'}}>
            <Stack direction="row">
                <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px' }}>
                    {val.headline}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', pl: '18px' }}>
                    {val.daysAgo}
                </Typography>
            </Stack>
            <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 700 }}>
                {val.priText}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px' }}>
                {val.secText}
            </Typography>
        </Stack>
        </Stack>
        </>
         ) )}   
   </Stack>
   </Paper>
   </Box>
);
}  