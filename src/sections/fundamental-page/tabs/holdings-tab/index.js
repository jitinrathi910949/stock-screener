import * as React from 'react';
import { Box, Typography, Stack,Tab,Tabs,Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import useResponsive from 'hooks/useResponsive';
import MajorHoldings from './Majorholdings';
import InsiderTraders from './InsiderTraders';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box  textColor="primary"
          indicator="none" sx={{ p: {xs: 0, sm: 0,md: 3} ,alignItems:'flex-start'}}>
            {children}
           </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }  

export default function Holdings() {
  const isDesktop = useResponsive('up', 'md');

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return  (
          <> 
 <Box>
 <Paper sx={{ }}>
 { isDesktop ?  <Box sx={{ alignItems:'flex-start'  }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  sx={{paddingLeft:'5px' }}>
    <Tab label="Major holders" value={0} {...a11yProps(0)}  sx={{color:'#302F42',fontSize: '12px'}}/>
    <Divider orientation="vertical" flexItem sx={{ marginRight:'30px', height:'40px'}} />
    <Tab label="Insider trading" value={1} {...a11yProps(1)}  sx={{color:'#302F42',fontSize: '12px'}}/>
  </Tabs>
</Box> :
<Box sx={{ alignItems:'flex-start'  }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  sx={{paddingLeft:'0px' }}>
    <Tab label="Major holders" value={0} {...a11yProps(0)}  sx={{color:'#302F42',fontSize: '12px'}}/>
    <Tab label="Insider trading" value={1} {...a11yProps(1)}  sx={{color:'#302F42',fontSize: '12px'}}/>
  </Tabs>
</Box> }
<TabPanel value={value} index={0} >
   <MajorHoldings />
</TabPanel>
    
<TabPanel value={value} index={1}>
 <InsiderTraders />
</TabPanel>

 
</Paper>
</Box>
        </>
    );
    }