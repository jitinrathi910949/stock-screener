import * as React from 'react';
import { Box, Typography, Paper, Grid,  ListItemIcon,Stack } from '@mui/material';
import Liner from './Liner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCashFlowStatementApi } from 'redux/fundamentals/stockApi'
import { useRouter } from 'next/router';

export default function Financialcashflow(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stockId } = router.query;
  const [rows, setRows] = useState([
{label: "netIncome",name: "Net income"},
{label: "depreciationAndAmortization",name: "Depreciation and amortization"},
{label: "deferredIncomeTax",name: "Deferred income tax"},
{label: "stockBasedCompensation",name: "Stock based compensation"},
{label: "changeInWorkingCapital",name: "Change in working capital"},
{label: "accountsReceivables",name: "Accounts receivables"},
{label: "inventory",name: "Inventory"},
{label: "accountsPayables",name: "Accounts payables"},
{label: "otherWorkingCapital",name: "Other working capital"},
{label: "otherNonCashItems",name: "Other non cash items"},
{label: "netCashProvidedByOperatingActivities",name: "Net cash provided by operating activities"},
{label: "investmentsInPropertyPlantAndEquipment",name: "Investments in property plant and equipment"},
{label: "acquisitionsNet",name: "Acquisitions net"},
{label: "purchasesOfInvestments",name: "Purchases of investments"},
{label: "salesMaturitiesOfInvestments",name: "Sales maturities of investments"},
{label: "otherInvestingActivites",name: "Other investing activites"},
{label: "netCashUsedForInvestingActivites",name: "Net cash used for investing activites"},
{label: "debtRepayment",name: "DebtRepayment"},
{label: "commonStockIssued",name: "Common stock issued"},
{label: "commonStockRepurchased",name: "Common stock repurchased"},
{label: "dividendsPaid",name: "Dividends paid"},
{label: "otherFinancingActivites",name: "Other financing activites"},
{label: "netCashUsedProvidedByFinancingActivities",name: "Net cash used provided by financing activities"},
{label: "effectOfForexChangesOnCash",name: "Effect of forex changes on cash"},
{label: "netChangeInCash",name: "Net change in cash"},
{label: "cashAtEndOfPeriod",name: "Cash at end of period"},
{label: "cashAtBeginningOfPeriod",name: "Cash at beginning of period"},
{label: "operatingCashFlow",name: "Operating cash flow"},
{label: "capitalExpenditure",name: "Capital expenditure"},
{label: "freeCashFlow",name: "Free cash flow"},
  ]);
  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { tickerDetails = {} } = useSelector(({ fundamentalsReducer }) => fundamentalsReducer);
  const { cashFlowStatement } = fundamental
  // useEffect(() => {
  //   dispatch(getCashFlowStatementApi({ period: "annual",ticker: stockId }));

  // }, [])
  useEffect(() => {
    console.log("cashFlowStatement", cashFlowStatement);
    let rowsClone = [...rows]
    if (cashFlowStatement) {
      rowsClone.map(row => {
        Object.keys(cashFlowStatement).forEach(key => {
          const rowData = cashFlowStatement[key]
          const data = cashFlowStatement[key]
          row[data.fillingDate] = rowData[row.label]
        })
      })
      console.log("rowsClone", rowsClone);
    }
    setRows(rowsClone)

  }, [dispatch, cashFlowStatement, router])
  console.log(tableCellClasses.root);
    return  (
        <Box>
      <Typography sx={{ fontSize:'20px', color:'#302F42', lineHeight:'30px',fontWeight:600,mt:2}}>
      Cash flow statement
      </Typography>
      <Liner typeData={"cashFlow"}/>

     <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white', }}>
              <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', position: "sticky", left: 0, zIndex: 5 }} >Financial year</TableCell>
              {Object.keys(cashFlowStatement).map((i) => (
                <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">{cashFlowStatement[i].fillingDate}</TableCell>
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
                { cashFlowStatement[0] && cashFlowStatement[0].fillingDate && Object.keys(cashFlowStatement).map((i) => (
                  <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                    {row[cashFlowStatement[i].fillingDate] !== undefined ? row[cashFlowStatement[i].fillingDate].toLocaleString() : "          "}

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



