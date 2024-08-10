import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Grid,Stack ,Paper} from '@mui/material';


const keyMetricsList = [
    {
      type : 'Market cap',
      price : '121.78',
      icon : '/assets/fund-page/overviewTab-img/marketCap.svg'
    },
    {
      type : 'Income',
      price : '124.34',
      icon : '/assets/fund-page/overviewTab-img/Ellipse.svg'
    },  {
      type : 'Price to earnings',
      price : '126.96',
      icon : '/assets/fund-page/overviewTab-img/Earning.svg'
    },
    {
      type : 'Quick ratio',
      price : '120.55',
      icon : '/assets/fund-page/overviewTab-img/Ellipse.svg'
    },
    {
      type : 'Debt to equity',
      price : '120.55',
      icon : '/assets/fund-page/overviewTab-img/Ellipse.svg'
    },
    {
      type : 'EPS',
      price : '122.89 x 800',
      icon : '/assets/fund-page/overviewTab-img/Ellipse.svg'
    },
    {
      type : 'ROE',
      price : '122.89 x 800',
      icon : '/assets/fund-page/overviewTab-img/Ellipse.svg'
    },
    {
      type : 'Gross margin',
      price : '62,452,563',
      icon : '/assets/fund-page/overviewTab-img/Ellipse.svg'
    }
  ]

export default function Keymetricsre() {
    return (
        <Box sx={{ width:{xl:'784px', lg:'784px', md:'784px', sm:'600px',xs:'300px',},}}>
        <Paper sx={{ padding:'20px',mt:'20px'}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 16 }}>
          {keyMetricsList.map((val, index) => (
            <Grid item xs={3} sm={4} md={4} key={index}>
              <Stack direction="row" spacing={1}>
                <Box component="img" src={val.icon} />
              <Box>              
                <Typography sx={{ fontSize:'12px',lineHeight:'18px',fontWeight:500, color:'#302F42'}}>{val.type}</Typography>
              <Typography sx={{ fontSize:'12px',lineHeight:'18px',fontWeight:600, color:'#302F42'}}>{val.price}</Typography>            
              </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>
      </Box>
      );
    }