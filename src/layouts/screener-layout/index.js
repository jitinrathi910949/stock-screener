import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Stack, AppBar, Tabs, Tab } from '@mui/material';
import { PATH_SCREENER } from 'routes/paths';

const COLLAPSE_WIDTH = 102;
const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 68;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: 'rgba(25, 23, 83, 0.2)'
}));

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }}>{children}</Box>}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(13),
  color: 'white',
  opacity: 0.6,
  '&:hover': {
    color: 'white',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: 'white',
    opacity: 1,
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const tabItems = [
  { value: PATH_SCREENER.root+'/', label: 'Explore Screener' },
  { value: PATH_SCREENER.fundamentalScreener+'/', label: 'Fundamental Screener' },
  { value: PATH_SCREENER.technicalScreener+'/', label: 'Technical Screener' },
  { value: PATH_SCREENER.chartPatternScreener+'/', label: 'Chart Patterns Screener' },
  { value: PATH_SCREENER.harminicPatternScreener+'/', label: 'Harminic Pattern Screener' },
  { value: PATH_SCREENER.candleStickScreener+'/', label: 'Candlestick Pattern Screener' },
];

ScreenerLayout.propTypes = {
  children: PropTypes.node,
};

export default function ScreenerLayout({ children }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const router = useRouter();
  const {asPath} = router;
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setValue(asPath);
  }, [asPath]);

  const handleChange = (event, newValue) => {
    router.push(newValue);
  };

  return (
    <>
      <RootStyle position="relative">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          centered
          // variant="fullWidth"
          variant={mobileView ? 'scrollable' : 'standard'}
          allowScrollButtonsMobile
          aria-label="main screen tabs"
          sx={{ backgroundColor: 'rgba(25, 23, 83, 0.95)' }}
        >
          {tabItems.map((item) => (
            <StyledTab label={item.label} value={item.value} key={item.value} {...a11yProps(0)} />
          ))}
        </Tabs>
      </RootStyle>

      {/* <TabPanel>
        {children}
      </TabPanel> */}
      <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }}>{children}</Box>
    </>
  );
}
