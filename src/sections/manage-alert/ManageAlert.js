import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TableRow,
  TableCell,
  Container,
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';
import moment from 'moment';
import Page from 'components/Page';
import DialogConfirmation from 'components/DialogConfirmation';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import CustomTable from 'components/custom-data-table/CustomTable';
import { unwrapResult } from '@reduxjs/toolkit';
import { PATH_PROFILE, PATH_SCREENER } from 'routes/paths';
import { getScreenerByUserApi } from 'redux/screener/screenerApi';
import { deleteAlertApi } from 'redux/screener/alertApi';

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Created Date', alignRight: false },
  { id: 'screenerName', label: 'Screener Name', alignRight: false },
  { id: 'timePeriod', label: 'Time Period', alignRight: false },
  { id: 'offset', label: 'Offset', alignRight: false },
  { id: 'notification', label: 'Notify On', alignRight: false }
];

function ManageAlert() {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [rowSelForAction, setRowForAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onBtMenu = (event, rowItem) => {
    setAnchorEl(event.currentTarget);
    setRowForAction(rowItem);
  };

  const { alertList = [], isListLoading } = useSelector((state) => state.screenerReducer);

  const onMenuSelected = (menuItem) => {
    switch (menuItem) {
      case 'delete':
        setConfirmationDialog(true);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const deleteConsignAgree = async () => {
    console.log(rowSelForAction);
    let response = await dispatch(deleteAlertApi({ screenerId: rowSelForAction?.screenerId }));
    response = unwrapResult(response);
    if (response && !response.alert) {
      setConfirmationDialog(false);
      enqueueSnackbar('Deleted succesfully', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      dispatch(getScreenerByUserApi());
    }
  };

  return (
    <>
      <DialogConfirmation
        handleClose={() => setConfirmationDialog(false)}
        openDailogConfirmation={() => setConfirmationDialog(true)}
        dialogOpen={confirmationDialog}
        clikedOnAgree={() => deleteConsignAgree()}
        title="Delete Alert"
        message="Are you sure you want to delete this? You won't be able to recover the data after this action."
      />
      <Menu
        id="item-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {/* <MenuItem onClick={() => onMenuSelected('update')}>
          <ListItemIcon>
            <UpdateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Update Status</ListItemText>
        </MenuItem> */}
        {/* <MenuItem
          component={RouterLink}
          to={`${PATH_EMPLOYEE.edit}/${rowSelForAction?._id}`}
          onClick={() => onMenuSelected('edit')}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Screener</ListItemText>
        </MenuItem> */}
        <MenuItem onClick={() => onMenuSelected('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Alert</ListItemText>
        </MenuItem>
      </Menu>

      <Page title="Alert List | FindScan">
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Alert List"
            links={[
              { name: 'Profile', href: PATH_PROFILE.root },
              {
                name: 'Alert',
                href: PATH_PROFILE.alert
              }
            ]}
            // action={
            //   <Button
            //     variant="contained"
            //     component={RouterLink}
            //     to={PATH_SCREENER.root}
            //     startIcon={<Icon icon={plusFill} />}
            //   >
            //     New Screener
            //   </Button>
            // }
          />
          <CustomTable
            isListLoading={isListLoading}
            dataList={alertList}
            TABLE_HEAD={TABLE_HEAD}
            getTableRow={(row) => {
              const { _id, timePeriod, offset, notification, createdAt, screenerName, screenerId } = row;
              const createdDate = moment(createdAt).format('Do MMM YY');

              return (
                <TableRow
                  hover
                  key={_id}
                  tabIndex={-1}
                  // role="checkbox"
                  // selected={isItemSelected}
                  // aria-checked={isItemSelected}
                >
                  <TableCell align="left" padding="checkbox">
                    <IconButton color="primary" onClick={(event) => onBtMenu(event, row)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">{createdDate}</TableCell>
                  <TableCell align="left">
                    <NextLink href={`${PATH_SCREENER.root}/${screenerId}`}>
                    <Button>
                      {screenerName}{' '}
                    </Button>
                    </NextLink>
                  </TableCell>
                  <TableCell align="left">{timePeriod}</TableCell>
                  <TableCell align="left">{offset}</TableCell>
                  <TableCell align="left">{notification}</TableCell>
                </TableRow>
              );
            }}
          />
        </Container>
      </Page>
    </>
  );
}

export default ManageAlert;
