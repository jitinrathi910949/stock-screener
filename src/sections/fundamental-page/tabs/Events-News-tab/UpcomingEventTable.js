import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Typography, Paper, Grid, ListItemIcon, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

function createData(name, pay, shares, value, price) {
  return { name, pay, shares, value, price };
}

const rows = [createData({ label: 'Feb 06, 2021', info: 'CEO & Director' }, 'Dividend', '-', '-')];

export default function UpcomingEventTable(props) {
  const { upcomingEvent = [] } = props;
  console.log(tableCellClasses.root);
  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white' }}>
              <TableCell
                sx={{
                  fontSize: '12px',
                  color: '#302F42',
                  fontWeight: 400,
                  fontFamily: 'Poppins',
                  position: 'sticky',
                  left: 0,
                  zIndex: 5,
                }}
              >
                Record/Execution date
              </TableCell>
              <TableCell
                sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins' }}
                align="right"
              >
                Event type
              </TableCell>
              <TableCell
                sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins' }}
                align="right"
              >
                Dividend/share
              </TableCell>
              <TableCell
                sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins' }}
                align="right"
              >
                Ratio
              </TableCell>
              {/* <TableCell sx={{ fontSize: '12px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins', }} align="right">$Price</TableCell> */}
            </TableRow>
          </TableHead>
           <TableBody>
            {
              upcomingEvent.map((event) => {
                const { execution_date, record_date, cash_amount, split_from, split_to } = event;
                const date = moment(execution_date || record_date).format('LL');
                return (
                  <TableRow key={event?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ backgroundColor: 'white', position: 'sticky', left: 0 }}
                    >
                      <Stack>
                        <Typography sx={{ fontSize: '12px', color: '#302F42', fontWeight: 600, fontFamily: 'Poppins' }}>
                          {date}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                      {execution_date ? 'Split' : 'Dividend'}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                      {cash_amount}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '12px', color: '#302F42', fontFamily: 'Poppins' }}>
                      {split_from && `${split_from}: ${split_to}`}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody> 
        

        </Table>
        {_.isEmpty(upcomingEvent) && <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}>No Data Found</Box> }
      </TableContainer>
    </Box>
  );
}
