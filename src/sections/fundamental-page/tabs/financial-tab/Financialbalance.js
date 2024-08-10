import * as React from 'react';
import { Box, Typography, Paper, Grid, ListItemIcon, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Liner from './Liner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBalanceSheetStatementApi } from 'redux/fundamentals/stockApi'
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Financialbalance(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const [rows, setRows] = useState([
    { label: "cashAndCashEquivalents", name: "Cash and cash equivalents" },
    { label: "shortTermInvestments", name: "Short term investments" },
    { label: "cashAndShortTermInvestments", name: "Cash and short term investments" },
    { label: "netReceivables", name: "Net receivables" },
    { label: "inventory", name: "Inventory" },
    { label: "otherCurrentAssets", name: "Other current assets" },
    { label: "totalCurrentAssets", name: "Total current assets" },
    { label: "propertyPlantEquipmentNet", name: "Property plant equipment net" },
    { label: "goodwill", name: "Goodwill" },
    { label: "intangibleAssets", name: "Intangible assets" },
    { label: "goodwillAndIntangibleAssets", name: "Goodwill and intangible assets" },
    { label: "longTermInvestments", name: "Long term investments" },
    { label: "taxAssets", name: "Tax assets" },
    { label: "otherNonCurrentAssets", name: "Other non current assets" },
    { label: "totalNonCurrentAssets", name: "Total non current assets" },
    { label: "otherAssets", name: "Other assets" },
    { label: "totalAssets", name: "Total assets" },
    { label: "accountPayables", name: "Account payables" },
    { label: "shortTermDebt", name: "Short termDebt" },
    { label: "taxPayables", name: "Tax payables" },
    { label: "deferredRevenue", name: "Deferred revenue" },
    { label: "otherCurrentLiabilities", name: "Other current liabilities" },
    { label: "totalCurrentLiabilities", name: "Total current liabilities" },
    { label: "longTermDebt", name: "Long term debt" },
    { label: "deferredRevenueNonCurrent", name: "Deferred revenue non current" },
    { label: "deferredTaxLiabilitiesNonCurrent", name: "Deferred tax liabilities non current" },
    { label: "otherNonCurrentLiabilities", name: "Other non current liabilities" },
    { label: "totalNonCurrentLiabilities", name: "Total non current liabilities" },
    { label: "otherLiabilities", name: "Other liabilities" },
    { label: "capitalLeaseObligations", name: "Capital lease obligations" },
    { label: "totalLiabilities", name: "Total liabilities" },
    { label: "preferredStock", name: "Preferred stock" },
    { label: "commonStock", name: "Common stock" },
    { label: "retainedEarnings", name: "Retained earnings" },
    { label: "accumulatedOtherComprehensiveIncomeLoss", name: "Accumulated other comprehensive income loss" },
    { label: "othertotalStockholdersEquity", name: "Other total stock holders equity" },
    { label: "totalStockholdersEquity", name: "Total stock holders equity" },
    { label: "totalLiabilitiesAndStockholdersEquity", name: "Total liabilities and stock holders equity" },
    { label: "minorityInterest", name: "Minority interest" },
    { label: "totalEquity", name: "Total equity" },
    { label: "totalLiabilitiesAndTotalEquity", name: "Total liabilities and total equity" },
    { label: "totalInvestments", name: "Total investments" },
    { label: "totalDebt", name: "Total debt" },
    { label: "netDebt", name: "Net debt" },
  ]);
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  // const { tickerDetails = {} } = useSelector(({ fundamentalsReducer }) => fundamentalsReducer);
  const { balanceSheetStatement } = fundamental
  // useEffect(() => {
  //   dispatch(getBalanceSheetStatementApi({ period: "annual", ticker: stockId }));

  // }, [])

  useEffect(() => {
    console.log("balanceSheetStatement", balanceSheetStatement);
    let rowsClone = [...rows]
    if (balanceSheetStatement) {
      rowsClone.map(row => {
        Object.keys(balanceSheetStatement).forEach(key => {
          const rowData = balanceSheetStatement[key]
          const data = balanceSheetStatement[key]
          row[data.fillingDate] = rowData[row.label]
        })
      })
      console.log("rowsClone", rowsClone);
    }
    setRows(rowsClone)

  }, [dispatch, balanceSheetStatement, router])

  
  console.log(tableCellClasses.root);
  return (
    <Box sx={{}}>
      <Typography sx={{ fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600, mt: 2 }}>
        Balance sheet
      </Typography>
      <Box sx={{ width: '100%', mt: '18px' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <Box component="img" src='/assets/fund-page/plus.svg' />
              <Stack sx={{ paddingLeft: '10px' }}>
                <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '21px', fontWeight: 700, }}>
                  Higher than Industry Revenue Growth
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px' }}>
                  Over the last 5 years, revenue has grown at a yearly rate of 9.72%, vs industry avg of 4.37%
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <Box component="img" src='/assets/fund-page/minus.svg' />
              <Stack sx={{ paddingLeft: '10px' }}>
                <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '21px', fontWeight: 700, }}>
                  Higher than Industry Net Income
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px' }}>
                  Over the last 5 years, net income has grown at a yearly rate of 10.8%, vs industry avg of 3.3%
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mt: '30px' }} />
      <Liner typeData={"balance"}/>

      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white', }}>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5 }} >Financial year</TableCell>
              {Object.keys(balanceSheetStatement).map((i) => (
                <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">{balanceSheetStatement[i].fillingDate}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: 'white', position: "sticky", left: 0, }}>
                  <Stack>
                    <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                      {row?.name}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins', opacity: '0.5' }}>
                    {row.name?.info}
                  </Typography> */}
                  </Stack>
                </TableCell>
                { balanceSheetStatement[0] && balanceSheetStatement[0].fillingDate && Object.keys(balanceSheetStatement).map((i) => (
                  <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                    {row[balanceSheetStatement[i].fillingDate] !== undefined ? row[balanceSheetStatement[i].fillingDate].toLocaleString() : "          "}

                  </TableCell>

                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



    </Box>
  );
}
