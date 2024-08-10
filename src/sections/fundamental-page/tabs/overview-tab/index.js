import React, { useEffect } from 'react';
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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stockchart from './Stockchart';
import Keymetrics from 'sections/fundamental-page/components/Keymetrics';
import KeyData from './KeyData';
import CompanyShortDescription from './CompanyShortDescription';
import News from '../../components/News';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '../../../../../styles/overview-tab.module.scss';
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
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
  overflow: 'auto',
  overflowY: 'scroll',
};

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
      name : 'Market Cap',
    });
    rowlist.push({
      type: 'incomeQualityTTM',
      price: infors['incomeQualityTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name : 'Income Quality',
    });
    rowlist.push({
      type: 'priceToSalesRatioTTM',
      price: infors['priceToSalesRatioTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name : 'Price To Sales Ratio',
    });
    rowlist.push({
      type: 'currentRatioTTM',
      price: infors['currentRatioTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name : 'Current Ratio',
    });
    rowlist.push({
      type: 'debtToEquityTTM',
      price: infors['debtToEquityTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name : 'Debt To Equity',
    });
    rowlist.push({
      type: 'freeCashFlowPerShareTTM',
      price: infors['freeCashFlowPerShareTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name : 'Free Cash Flow Per Share',
    });
    rowlist.push({ type: 'roeTTM', price: infors['roeTTM'], icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',name : 'Roe', });
    rowlist.push({
      type: 'averageInventoryTTM',
      price: infors['averageInventoryTTM'],
      icon: '/assets/fund-page/overviewTab-img/Ellipse.svg',
      name : 'Average Inventory',
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
    Object.assign(rowlist[0], {name: 'Revenue Per Share'});
    Object.assign(rowlist[1], {name: 'Net Income Per Share'});
    Object.assign(rowlist[2], {name: 'Operating Cash Flow Per Share'});
    Object.assign(rowlist[3], {name: 'Free Cash Flow Per Share'});
    Object.assign(rowlist[4], {name: 'Cash Per Share'});
    Object.assign(rowlist[5], {name: 'Book Value Per Share'});
    Object.assign(rowlist[6], {name: 'Tangible Book Value Per Share'});
    Object.assign(rowlist[7], {name: 'Shareholders Equity Per Share'});
    Object.assign(rowlist[8], {name: 'Interest Debt Per Share'});
    Object.assign(rowlist[9], {name: 'Market Cap'});
    Object.assign(rowlist[10], {name: 'Enterprise Value'});
    Object.assign(rowlist[11], {name: 'Pe Ratio'});
    Object.assign(rowlist[12], {name: 'Price To Sales Ratio'});
    Object.assign(rowlist[13], {name: 'Pocfratio'});
    Object.assign(rowlist[14], {name: 'Pfcf Ratio'});
    Object.assign(rowlist[15], {name: 'Pb Ratio'});
    Object.assign(rowlist[16], {name: 'Ptb Ratio'});
    Object.assign(rowlist[17], {name: 'Ev To Sales'});
    Object.assign(rowlist[18], {name: 'Enterprise Value Over EBITDA'});
    Object.assign(rowlist[19], {name: 'Ev To Operating Cash Flow'});
    Object.assign(rowlist[20], {name: 'Ev To Free Cash Flow'});
    Object.assign(rowlist[21], {name: 'Earnings Yield'});
    Object.assign(rowlist[22], {name: 'Free Cash Flow Yield'});
    Object.assign(rowlist[23], {name: 'Debt To Equity'});
    Object.assign(rowlist[24], {name: 'Debt To Assets'});
    Object.assign(rowlist[25], {name: 'Net Debt To EBITDA'});
    Object.assign(rowlist[26], {name: 'Current Ratio'});
    Object.assign(rowlist[27], {name: 'Interest Coverage'});
    Object.assign(rowlist[28], {name: 'Income Quality'});
    Object.assign(rowlist[29], {name: 'Dividend Yield'});
    Object.assign(rowlist[30], {name: 'Dividend Yield Percentage'});
    Object.assign(rowlist[31], {name: 'Payout Ratio'});
    Object.assign(rowlist[32], {name: 'Sales General And Administrative To Revenue'});
    Object.assign(rowlist[33], {name: 'Research And Developement To Revenue'});
    Object.assign(rowlist[34], {name: 'Intangibles To Total Assets'});
    Object.assign(rowlist[35], {name: 'Capex To Operating Cash Flow'});
    Object.assign(rowlist[36], {name: 'Capex To Revenue'});
    Object.assign(rowlist[37], {name: 'Capex To Depreciation'});
    Object.assign(rowlist[38], {name: 'Stock Based Compensation To Revenue'});
    Object.assign(rowlist[39], {name: 'Graham Number'});
    Object.assign(rowlist[40], {name: 'Roic'});
    Object.assign(rowlist[41], {name: 'Return On Tangible Assets'});
    Object.assign(rowlist[42], {name: 'Graham Net Net'});
    Object.assign(rowlist[43], {name: 'Working Capital'});
    Object.assign(rowlist[44], {name: 'Tangible Asset Value'});
    Object.assign(rowlist[45], {name: 'Net Current Asset Value'});
    Object.assign(rowlist[46], {name: 'Invested Capital'});
    Object.assign(rowlist[47], {name: 'Average Receivables'});
    Object.assign(rowlist[48], {name: 'Average Payables'});
    Object.assign(rowlist[49], {name: 'Average Inventory'});
    Object.assign(rowlist[50], {name: 'Days Sales Outstanding'});
    Object.assign(rowlist[51], {name: 'Days Payables Outstanding'});
    Object.assign(rowlist[52], {name: 'Days Of Inventory On Hand'});
    Object.assign(rowlist[53], {name: 'Receivables Turnover'});
    Object.assign(rowlist[54], {name: 'Payables Turnover'});
    Object.assign(rowlist[55], {name: 'Inventory Turnover'});
    Object.assign(rowlist[56], {name: 'Roe'});
    Object.assign(rowlist[57], {name: 'Capex Per Share'});
    Object.assign(rowlist[58], {name: 'Dividend Per Share'});
    Object.assign(rowlist[59], {name: 'Debt To Market Cap'});
  }
  return rowlist;
}

export default function OverviewTab(props) {

  const [age, setAge] = React.useState(1);
  const [keyMetricsListDefaultState, setKeyMetricsListDefaultState] = React.useState([]);
  const [keyMetricsListState, setKeyMetricsListState] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { ticker, keyMetrics, isLoading } = fundamental;
  var dataKeyMetrics = keyMetrics[0];
  var keyMetricsListDefault = createkeyMetricsListDefault(dataKeyMetrics);
  var keyMetricsList = createkeyMetricsList(dataKeyMetrics);

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

  return (
    <>
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
                <Grid item xs={5} spacing={20} className={styles.gridTable}>
                  {keyMetricsListState.slice(0, 20).map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem key={value.type}>
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
                <Grid item spacing={20} xs={6} className={styles.gridTable}>
                  {keyMetricsListState.slice(20, 40).map((value) => {
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
                <Grid item spacing={20} xs={5} className={styles.gridTable}>
                  {keyMetricsListState.slice(40, 60).map((value) => {
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
        >
          <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: '#3886FA' }}>
            Financial statements
          </Typography>
          <ArrowForwardIosOutlinedIcon sx={{ color: '#3886FA', fontSize: '10px', paddingLeft: '4px' }} />
        </Stack>
      </Box>
      <Keymetrics
        age={age}
        dataKeyMetrics={dataKeyMetrics}
        keyMetricsListDefaultState={keyMetricsListDefaultState}
        key={keyMetricsListDefaultState}
      />
      <Divider sx={{ mt: '30px' }} />
      <Stockchart />
      <Divider sx={{ mt: '30px' }} />
      <KeyData />
      <Divider sx={{ mt: '30px' }} />
      <CompanyShortDescription />
      <Divider sx={{ mt: '30px' }} />
      <News />
    </>
  );
}
