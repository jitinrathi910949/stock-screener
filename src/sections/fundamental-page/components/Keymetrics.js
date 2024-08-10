import React,{useEffect} from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';

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
  ];

  function createkeyMetricsList(infors) {
    var rowlist = [];
    if(infors) {
      Object.keys(infors).forEach(function(k){
        rowlist.push({ type: k, price: infors[k], icon: '/assets/fund-page/overviewTab-img/Ellipse.svg' });
      });
    }
    return rowlist;
  }
  const nFormatter = (num) => {
    const absNum = Math.abs(num)
    if (absNum >= 1000000000000) {
      return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + ' Trillion';
    }
    if (absNum >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' Billion';
    }
    if (absNum >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' Million';
    }
    if (absNum >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' Thousand';
    }
    return num;
  }

export default function Keymetrics(data){
  const [keyMetricsList, setKeyMetricsList] = React.useState([]);
  var dataKeyMetrics = data.dataKeyMetrics
  var keyMetricsListDefaultState = data.keyMetricsListDefaultState
  useEffect(() => {
    setKeyMetricsList(... [keyMetricsListDefaultState]);
  },[data,keyMetricsListDefaultState]);
    return(
        <Box sx={{ flexGrow: 1 , mt:2}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 16 }} sx={{ justifyContent:{xs:'space-between'}}}>
          { keyMetricsList ? keyMetricsList.map((val, index) => (
            <Grid item xs={3} sm={4} md={4} key={index}>
              <Stack direction="row" spacing={1}>
                <Box component="img" src={val?.icon} />
              <Box>              
                <Typography sx={{ fontSize:'12px',lineHeight:'18px',fontWeight:500, color:'#302F42'}}>{val?.name}</Typography>
              <Typography sx={{ fontSize:'12px',lineHeight:'18px',fontWeight:600, color:'#302F42'}}>{val?.price && nFormatter(val?.price.toFixed(4))}</Typography>            
              </Box>
              </Stack>
            </Grid>
          )): ""} 
        </Grid>
      </Box>

    )
}