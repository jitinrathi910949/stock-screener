import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper, Grid, Typography, Box, Stack, Card, Button } from '@mui/material';
import ProfileTab from './tabs/profile-tab';
import OverviewTab from './tabs/overview-tab';
import FinancialTab from './tabs/financial-tab';
import Historicaldata from './tabs/Events-News-tab';
import HistoricalDataTab from './tabs/historicalData-tab';
import EventsNews from './tabs/Events-News-tab';
import Holdings from './tabs/holdings-tab';

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
        <Box textColor="primary" indicatorColor="primary" sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
export default function Maintabs() {
  const [value, setValue] = React.useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Paper sx={{ width: '784px', minHeight: '728px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ paddingLeft: '30px', pt: '30px' }}
          >
            <Tab label="Overview" {...a11yProps(0)} sx={{ color: '#302F42', fontSize: '12px' }} />
            <Tab label="Profile" {...a11yProps(1)} sx={{ color: '#302F42', fontSize: '12px' }} />
            <Tab label="Financials" {...a11yProps(2)} sx={{ color: '#302F42', fontSize: '12px' }} />
            <Tab label="Historical data" {...a11yProps(3)} sx={{ color: '#302F42', fontSize: '12px' }} />
            <Tab label="Holdings" {...a11yProps(4)} sx={{ color: '#302F42', fontSize: '12px' }} />
            <Tab label="Events and news" {...a11yProps(5)} sx={{ color: '#302F42', fontSize: '12px' }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OverviewTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FinancialTab />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <HistoricalDataTab />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Holdings />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <EventsNews />
        </TabPanel>
      </Paper>
    </Box>
  );
}
