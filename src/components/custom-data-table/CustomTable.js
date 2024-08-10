import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, TableBody, TableContainer, TablePagination, LinearProgress } from '@mui/material';

import _ from 'lodash';
import CustomTableHead from './CustomTableHead';

function ManageScreener(props) {
  const { dataList, isListLoading, TABLE_HEAD, getTableRow } = props;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    if (query) {
      return _.filter(array, (_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const filteredProducts = applySortFilter(dataList, getComparator(order, orderBy), filterName);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card>
        {/* <Scrollbar> */}
        <TableContainer sx={{ minWidth: 800 }}>
          {isListLoading && <LinearProgress color="primary" />}
          <Table>
            <CustomTableHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              //   rowCount={products.length}
              //   numSelected={selected.length}
              onRequestSort={handleRequestSort}
              //   onSelectAllClick={handleSelectAllClick}
            />

            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => getTableRow(row))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

ManageScreener.propTypes = {
  dataList: PropTypes.array,
  isListLoading: PropTypes.bool,
  TABLE_HEAD: PropTypes.array,
  getTableRow: PropTypes.func,
};

export default ManageScreener;
