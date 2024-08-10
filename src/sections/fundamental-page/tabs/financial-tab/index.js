import * as React from 'react';
import { Box, Typography, Stack, Tab, Tabs, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Financialicome from './Financialincome';
import Financialbalance from './Financialbalance';
import Financialcashflow from './Financialcashflow';
import useResponsive from 'hooks/useResponsive';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'redux/store';
import { getTickerFinancialApi } from 'redux/stock/stockApi';
import { getStockFundamentalsApi } from 'redux/fundamentals/stockApi'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const router = useRouter();
  const dispatch= useDispatch();
  const { stockId } = router.query;
  // React.useEffect(()=>{
  //   console.log("stockId",stockId);
  //   dispatch(getTickerFinancialApi({ ticker: stockId }));
  // },[])
  // const { tickerFinance = {} } = useSelector(({ stockReducer }) => stockReducer);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box textColor="primary" indicator="none" sx={{ p: { xs: 0, sm: 0, md: 3 }, alignItems: 'flex-start' }}>
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

export default function Financials() {
  const isDesktop = useResponsive('up', 'md');

  const [value, setValue] = React.useState(0);
  const { tickerFinance= [] } = useSelector(({ stockReducer }) => stockReducer);
  // const { income_statement } = tickerFinance[0]?.financials;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box>
        <Paper sx={{}}>
          {isDesktop ? (
            <Box sx={{ alignItems: 'flex-start' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ paddingLeft: '5px' }}>
                <Tab label="Income" value={0} {...a11yProps(0)} sx={{ color: '#302F42', fontSize: '12px' }} />
                <Divider orientation="vertical" flexItem sx={{ marginRight: '30px', height: '40px' }} />

                <Tab label="Balance sheet" value={1} {...a11yProps(1)} sx={{ color: '#302F42', fontSize: '12px' }} />
                <Divider orientation="vertical" flexItem sx={{ marginRight: '30px', height: '40px' }} />

                <Tab label="Cash flow" value={2} {...a11yProps(2)} sx={{ color: '#302F42', fontSize: '12px' }} />
              </Tabs>
            </Box>
          ) : (
            <Box sx={{ alignItems: 'flex-start' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{}}>
                <Tab label="Income" value={0} {...a11yProps(0)} sx={{ color: '#302F42', fontSize: '12px' }} />
                <Tab label="Balance sheet" value={1} {...a11yProps(1)} sx={{ color: '#302F42', fontSize: '12px' }} />
                <Tab label="Cash flow" value={2} {...a11yProps(2)} sx={{ color: '#302F42', fontSize: '12px' }} />
              </Tabs>
            </Box>
          )}
          <TabPanel value={value} index={0}>
            <Financialicome />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Financialbalance />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Financialcashflow />
          </TabPanel>
        </Paper>
      </Box>
    </>
  );
}
