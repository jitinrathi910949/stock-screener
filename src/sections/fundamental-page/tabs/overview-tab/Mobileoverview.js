import React from 'react';
import Investment from '../../components/Investment';
import Keymetrics from '../../components/Keymetrics';
import News from '../../components/News';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Collapse } from '@mui/material';
import Stockchart from './Stockchart';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProfileApi } from 'redux/fundamentals/stockApi';
import styles from '../../../../../styles/overview-tab.module.scss';
import Divider from '@mui/material/Divider';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Stack,
  MenuItem,
  Checkbox,
  Select,
  FormControl,
  Button,
  Modal,
  Paper,
  Grid
} from '@mui/material';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '50%',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
  overflow: 'auto',
  overflowY: 'scroll',
  paddingLeft: '0px',
  paddingRight: '0px',
};
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
const styleText = {
  fontSize: '13px',
  lineHeight: '18px',
  fontWeight: 500,
  color: '#3886FA',
};

function createkeyMetricsListDefault(infors) {
  var rowlist = [];
  if (infors) {
    rowlist.push({
      type: 'marketCapTTM',
      price: infors['marketCapTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Market Cap',
    });
    rowlist.push({
      type: 'incomeQualityTTM',
      price: infors['incomeQualityTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Income Quality',
    });
    rowlist.push({
      type: 'priceToSalesRatioTTM',
      price: infors['priceToSalesRatioTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Price To Sales Ratio',
    });
    rowlist.push({
      type: 'currentRatioTTM',
      price: infors['currentRatioTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Current Ratio',
    });
    rowlist.push({
      type: 'debtToEquityTTM',
      price: infors['debtToEquityTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Debt To Equity',
    });
    rowlist.push({
      type: 'freeCashFlowPerShareTTM',
      price: infors['freeCashFlowPerShareTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Free Cash Flow Per Share',
    });
    rowlist.push({ type: 'roeTTM', price: infors['roeTTM'], icon: '/assets/fund-page/overviewTab-img/Ellipse.svg', name: 'Roe', });
    rowlist.push({
      type: 'averageInventoryTTM',
      price: infors['averageInventoryTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name: 'Average Inventory',
    });
  }
  return rowlist;
}

function createkeyMetricsList(infors) {
  var rowlist = [];
  if (infors) {
    Object.keys(infors).forEach(function (k) {
      rowlist.push({
        type: k,
        price: infors[k],
        icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
        isChecked: false,
      });
    });
  }
  if (rowlist.length > 0) {
    Object.assign(rowlist[0], { name: 'Revenue Per Share' });
    Object.assign(rowlist[1], { name: 'Net Income Per Share' });
    Object.assign(rowlist[2], { name: 'Operating Cash Flow Per Share' });
    Object.assign(rowlist[3], { name: 'Free Cash Flow Per Share' });
    Object.assign(rowlist[4], { name: 'Cash Per Share' });
    Object.assign(rowlist[5], { name: 'Book Value Per Share' });
    Object.assign(rowlist[6], { name: 'Tangible Book Value Per Share' });
    Object.assign(rowlist[7], { name: 'Shareholders Equity Per Share' });
    Object.assign(rowlist[8], { name: 'Interest Debt Per Share' });
    Object.assign(rowlist[9], { name: 'Market Cap' });
    Object.assign(rowlist[10], { name: 'Enterprise Value' });
    Object.assign(rowlist[11], { name: 'Pe Ratio' });
    Object.assign(rowlist[12], { name: 'Price To Sales Ratio' });
    Object.assign(rowlist[13], { name: 'Pocfratio' });
    Object.assign(rowlist[14], { name: 'Pfcf Ratio' });
    Object.assign(rowlist[15], { name: 'Pb Ratio' });
    Object.assign(rowlist[16], { name: 'Ptb Ratio' });
    Object.assign(rowlist[17], { name: 'Ev To Sales' });
    Object.assign(rowlist[18], { name: 'Enterprise Value Over EBITDA' });
    Object.assign(rowlist[19], { name: 'Ev To Operating Cash Flow' });
    Object.assign(rowlist[20], { name: 'Ev To Free Cash Flow' });
    Object.assign(rowlist[21], { name: 'Earnings Yield' });
    Object.assign(rowlist[22], { name: 'Free Cash Flow Yield' });
    Object.assign(rowlist[23], { name: 'Debt To Equity' });
    Object.assign(rowlist[24], { name: 'Debt To Assets' });
    Object.assign(rowlist[25], { name: 'Net Debt To EBITDA' });
    Object.assign(rowlist[26], { name: 'Current Ratio' });
    Object.assign(rowlist[27], { name: 'Interest Coverage' });
    Object.assign(rowlist[28], { name: 'Income Quality' });
    Object.assign(rowlist[29], { name: 'Dividend Yield' });
    Object.assign(rowlist[30], { name: 'Dividend Yield Percentage' });
    Object.assign(rowlist[31], { name: 'Payout Ratio' });
    Object.assign(rowlist[32], { name: 'Sales General And Administrative To Revenue' });
    Object.assign(rowlist[33], { name: 'Research And Developement To Revenue' });
    Object.assign(rowlist[34], { name: 'Intangibles To Total Assets' });
    Object.assign(rowlist[35], { name: 'Capex To Operating Cash Flow' });
    Object.assign(rowlist[36], { name: 'Capex To Revenue' });
    Object.assign(rowlist[37], { name: 'Capex To Depreciation' });
    Object.assign(rowlist[38], { name: 'Stock Based Compensation To Revenue' });
    Object.assign(rowlist[39], { name: 'Graham Number' });
    Object.assign(rowlist[40], { name: 'Roic' });
    Object.assign(rowlist[41], { name: 'Return On Tangible Assets' });
    Object.assign(rowlist[42], { name: 'Graham Net Net' });
    Object.assign(rowlist[43], { name: 'Working Capital' });
    Object.assign(rowlist[44], { name: 'Tangible Asset Value' });
    Object.assign(rowlist[45], { name: 'Net Current Asset Value' });
    Object.assign(rowlist[46], { name: 'Invested Capital' });
    Object.assign(rowlist[47], { name: 'Average Receivables' });
    Object.assign(rowlist[48], { name: 'Average Payables' });
    Object.assign(rowlist[49], { name: 'Average Inventory' });
    Object.assign(rowlist[50], { name: 'Days Sales Outstanding' });
    Object.assign(rowlist[51], { name: 'Days Payables Outstanding' });
    Object.assign(rowlist[52], { name: 'Days Of Inventory On Hand' });
    Object.assign(rowlist[53], { name: 'Receivables Turnover' });
    Object.assign(rowlist[54], { name: 'Payables Turnover' });
    Object.assign(rowlist[55], { name: 'Inventory Turnover' });
    Object.assign(rowlist[56], { name: 'Roe' });
    Object.assign(rowlist[57], { name: 'Capex Per Share' });
    Object.assign(rowlist[58], { name: 'Dividend Per Share' });
    Object.assign(rowlist[59], { name: 'Debt To Market Cap' });
  }
  return rowlist;
}
function MobileOverview(props) {
  const dispatch = useDispatch();

  // const { tickerDetails = {} } = useSelector(({ stockReducer }) => stockReducer);
  // const { name, ticker, primary_exchange } = tickerDetails;

  const router = useRouter();
  const { stockId } = router.query;
  const [age, setAge] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const [keyMetricsListDefaultState, setKeyMetricsListDefaultState] = React.useState([]);
  const [keyMetricsListState, setKeyMetricsListState] = React.useState([]);

  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { ticker, keyMetrics, isLoading, profile } = fundamental;

  const dataKeyMetrics = keyMetrics[0];
  const keyMetricsListDefault = createkeyMetricsListDefault(dataKeyMetrics);
  const keyMetricsList = createkeyMetricsList(dataKeyMetrics);


  const [showMore, setShowMore] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const changePercent = (profile && profile[0]) ? (profile[0]?.changes / profile[0].price) * 100 : 0

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getProfileApi({ ticker: stockId }));
  }, [])

  useEffect(() => {
    setKeyMetricsListDefaultState(...[keyMetricsListDefault]);
    updateCheckedkeyMetrics();
  }, [dataKeyMetrics]);


  const handleChange = (data) => {
    const array = JSON.parse(JSON.stringify(keyMetricsListState))
    const arrayDefaultsCheck = keyMetricsListState.filter((obj) => obj.isChecked === true);
    if (arrayDefaultsCheck.length <= 8) {
      var objIndex = array.findIndex((obj => obj.type == data.type));
      array[objIndex].isChecked = !array[objIndex].isChecked
      const arrayCheck = array.filter((obj) => obj.isChecked === true);
      if (arrayCheck.length <= 8) {
        setKeyMetricsListState(array);
        setAge(age + 1);
        let arrayDefaults = array.filter(obj => obj.isChecked === true);
        setKeyMetricsListDefaultState(arrayDefaults);
      }
    }
  };

  const updateCheckedkeyMetrics = () => {
    var array = [];
    array = keyMetricsList;
    keyMetricsListDefault.forEach(function (element) {
      var objIndex = array.findIndex((obj) => obj.type == element.type);
      array[objIndex].isChecked = true;
    });
    setKeyMetricsListState(array);
  };
  const { image, symbol, companyName, price, changes, exchangeShortName } = (profile && profile[0]) ? profile[0] : {}

  return (
    <>
      <Paper sx={{ padding: '0 10px 10px 0' }}>
        <Stack direction="row" sx={{ marginTop: '10px', alignItems: 'center' }}>
          <Box component="img" src={image} sx={{ maxWidth: { xs: '23px', lg: '23px' }, width: 'auto', marginRight: "10px" }} />

          <Typography sx={{ fontSize: '20px', fontWeight: 600, lineHeight: '30px', color: '#302F42' }}>
            {companyName} ({stockId.toUpperCase()})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', }} />

        </Stack>
        <Typography sx={{ fontSize: '12px', lineHeight: '30px', color: '#302F42' }}>
          {exchangeShortName} </Typography>
        {/* <Typography sx={{ fontSize: '12px', lineHeight: '30px', color: '#302F42', ml: 2 }}>
    NasdaqGS Real Time Price</Typography> */}
        <Stack sx={{ display: 'flex', flexDirection: 'row', mt: '8px' }}>
          {advisory.map((opt) => (
            <>
              <Stack direction="row" sx={{ padding: 1, ml: '3px', alignItems: 'center', justifycontent: 'center', border: '1px solid grey', borderRadius: '25px' }}>
                <Box component="img" src={opt.imageSrc} sx={{ pt: '3px', height: '14px' }} />
                <Typography sx={{ fontSize: '10px', color: '#302F42', fontWeight: 600, ml: '6px' }}>
                  {opt.priText}
                </Typography>
              </Stack>
            </>
          ))}

        </Stack>
        <Stack direction="row" sx={{ marginTop: '10px', alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: '10px', fontWeight: 500, lineHeight: '15px', color: '#302F42' }}>
            $</Typography>
          <Typography sx={{ fontSize: '24px', fontWeight: 500, lineHeight: '36px', color: '#302F42', paddingLeft: '4px' }}>
            {price}</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: changePercent > 0 ? '#33883e' : '#F14B47', paddingLeft: '8px' }}>
            {profile && profile[0] && profile[0]?.changes.toFixed(2)} ({changePercent.toFixed(2)}%)</Typography>
        </Stack>

        <Divider sx={{ mt: "20px" }} />

        <Stockchart />
      </Paper>

      <Divider />

      <Paper sx={{ padding: '0 10px 10px 0', mt: 1 }}>
        <Investment />
      </Paper>

      <Divider />

      <Paper sx={{ padding: '0 10px 10px 0', mt: 2 }}>
        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>

          <Stack direction="row" sx={{ alignItems: 'baseline' }}>
            {/* <LockOutlinedIcon sx={{ color: '#3886FA', height: '16px', pl: '12px', pt: '5px' }} /> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <Typography sx={{ fontSize: '20px', lineHeight: '30px', fontWeight: 600, color: '#302F42' }}>
                  Key metrics
                </Typography>
                <LockOutlinedIcon sx={{ color: '#3886FA', height: '16px', pl: '12px', pt: '5px' }} />
                <Button onClick={handleOpen}>Settings</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Grid container spacing={20} columns={20}>

                      <Grid item spacing={20} xs={7} className={styles.gridTable}>
                        {keyMetricsListState.slice(0, 30).map((value) => {
                          const labelId = `checkbox-list-label-${value}`;
                          return (
                            <ListItem key={value.type} >
                              <ListItemButton role={undefined} onClick={() => handleChange(value)} dense>
                                <ListItemIcon className={styles.checkboxIcon}>
                                  <Checkbox
                                    edge="start"
                                    checked={value.isChecked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  className={styles.textCheckbox}
                                  sx={styleText}
                                  id={labelId}
                                  primary={value.name}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </Grid>
                      <Grid item spacing={20} xs={7} className={styles.gridTable}>
                        {keyMetricsListState.slice(30, 60).map((value) => {
                          const labelId = `checkbox-list-label-${value}`;
                          return (
                            <ListItem key={value.type} className={styles.listItem}>
                              <ListItemButton role={undefined} onClick={() => handleChange(value)} dense>
                                <ListItemIcon className={styles.checkboxIcon}>
                                  <Checkbox
                                    edge="start"
                                    checked={value.isChecked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  className={styles.textCheckbox}
                                  sx={styleText}
                                  id={labelId}
                                  primary={value.name}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </Stack>
              <Stack
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => router.push(`${router?.query?.stockId}/financials`)}
               />
            </Box>
          </Stack>
        </Stack>
        <Keymetrics
          age={age}
          dataKeyMetrics={dataKeyMetrics}
          keyMetricsListDefaultState={keyMetricsListDefaultState}
          key={keyMetricsListDefaultState}
        />
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 3, alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#3886FA' }}>
            Financial statements
          </Typography>
          <ArrowForwardIosOutlinedIcon sx={{ color: '#3886FA', fontSize: '10px', paddingLeft: '4px' }} />
        </Stack>
      </Paper>

      <Divider sx={{ mt: "20px", mb:"20px" }}/>

      <Paper sx={{ padding: '0 10px 10px 0', mt: 1, alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600 }}
        >
          Company description
        </Typography>
        <Stack direction="row" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 500, mt: '20px' }}>
            Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and
            accessories worldwide. It sells
          </Typography>
          <Typography onClick={() => setCollapse(true)} sx={{ fontSize: '12px', backgroundColor: '', color: '#3886FA' }}>...</Typography>

        </Stack>
        <Collapse in={collapse}>
          <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 500 }}>
            various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal
            computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods,
            Apple TV, Apple Watch, Beats products, HomePod, iPod.
            <Typography onClick={() => setCollapse(false)} sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#3886FA', }}>Read less
            </Typography>
          </Typography>
        </Collapse>
      </Paper>

      <Divider sx={{ mt: "20px", mb:"20px" }}/>

      <Paper sx={{ padding: '0 10px 10px 0', mt: 2 }}>
        <News />
      </Paper>


    </>
  );
}

export default MobileOverview;
