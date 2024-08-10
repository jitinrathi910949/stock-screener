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
import { getIncomeStatementApi } from 'redux/fundamentals/stockApi'
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Financialicome(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const [rows, setRows] = useState([
    { label: "revenue", name: "Revenue" },
    { label: "grossProfit", name: "Gross profit" },
    { label: "researchAndDevelopmentExpenses", name: "Research and development expenses" },
    { label: "generalAndAdministrativeExpenses", name: "General and administrative expenses" },
    { label: "sellingAndMarketingExpenses", name: "Selling and marketing expenses" },
    { label: "sellingGeneralAndAdministrativeExpenses", name: "Selling general and administrative expenses" },
    { label: "otherExpenses", name: "Other expenses" },
    { label: "operatingExpenses", name: "Operating expenses" },
    { label: "costAndExpenses", name: "Cost and expenses" },
    { label: "interestIncome", name: "Interest income" },
    { label: "interestExpense", name: "Interest expense" },
    { label: "depreciationAndAmortization", name: "Depreciation and amortization" },
    { label: "ebitda", name: "Ebitda" },
    { label: "ebitdaratio", name: "Ebitdaratio" },
    { label: "operatingIncome", name: "Operating income" },
    { label: "operatingIncomeRatio", name: "Operating income ratio" },
    { label: "totalOtherIncomeExpensesNet", name: "Total other income expenses net" },
    { label: "incomeBeforeTax", name: "Income before tax" },
    { label: "incomeBeforeTaxRatio", name: "Income before tax ratio" },
    { label: "incomeTaxExpense", name: "Income tax expense" },
    { label: "netIncome", name: "Net income" },
    { label: "netIncomeRatio", name: "Net income ratio" },
    { label: "eps", name: "EPS" },
    { label: "epsdiluted", name: "Epsdiluted" },
    { label: "weightedAverageShsOut", name: "Weighted average shs out" },
    { label: "weightedAverageShsOutDil", name: "Weighted average shs out dil" },
  ]);
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { tickerDetails = {} } = useSelector(({ fundamentalsReducer }) => fundamentalsReducer);
  const { incomeStatement } = fundamental
  // useEffect(() => {
  //   dispatch(getIncomeStatementApi({ period: "annual", ticker: stockId }));

  // }, [])

  useEffect(() => {
    console.log("incomeStatement", incomeStatement);
    let rowsClone = [...rows]
    if (incomeStatement) {
      rowsClone.map(row => {
        Object.keys(incomeStatement).forEach(key => {
          const rowData = incomeStatement[key]
          const data = incomeStatement[key]
          row[data.fillingDate] = rowData[row.label]
        })
      })
      console.log("rowsClone", rowsClone);
    }
    setRows(rowsClone)

  }, [dispatch, incomeStatement, router])
  
  console.log(tableCellClasses.root);
  return (
    <Box sx={{}}>
      <Typography sx={{ fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600, mt: 2 }}>
        Income statement
      </Typography>
      <Box sx={{ width: '100%', mt: '18px' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
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
              <Box component="img" src='/assets/fund-page/plus.svg' />
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
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <Box component="img" src='/assets/fund-page/plus.svg' />
              <Stack sx={{ paddingLeft: '10px' }}>
                <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '21px', fontWeight: 700, }}>
                  Increasing Market Share
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px' }}>
                  Over the last 5 years, market share increased from 27.25% to 34.99%
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mt: '30px' }} />
      <Liner typeData={"income"} />

      <TableContainer component={Paper} sx={{ mt: '30px', }}>
        <Table >
          <TableHead sx={{}}>
            <TableRow sx={{ backgroundColor: 'white', width: '100%' }}>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5, minWidth: { xs: '150px', sm: '150px', md: '220px' } }} >Financial year</TableCell>
              {Object.keys(incomeStatement).map((i) => (
                <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">{incomeStatement[i].fillingDate}</TableCell>

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

                  </Stack>
                </TableCell>
                {incomeStatement[0] && incomeStatement[0].fillingDate && Object.keys(incomeStatement).map((i) => (
                  <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                    {row[incomeStatement[i].fillingDate] !== undefined ? row[incomeStatement[i].fillingDate].toLocaleString() : "          "}

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