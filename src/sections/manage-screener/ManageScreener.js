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
  ListItemText,
} from '@mui/material';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import Page from 'components/Page';
import DialogConfirmation from 'components/DialogConfirmation';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import CustomTable from 'components/custom-data-table/CustomTable';
import { unwrapResult } from '@reduxjs/toolkit';
import { PATH_PROFILE, PATH_SCREENER } from 'routes/paths';
import { deleteUserScreenerApi, getScreenerByUserApi } from 'redux/screener/screenerApi';

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Created Date', alignRight: false },
  { id: 'screenerName', label: 'Screener Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'scanCategory', label: 'Category', alignRight: false },
  { id: 'isPrivate', label: 'Private/Public', alignRight: false },
];

function ManageScreener() {
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

  const { screenerList = [], isListLoading } = useSelector((state) => state.screenerReducer);

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
    try {
      let response = await dispatch(deleteUserScreenerApi({ screenerId: rowSelForAction?._id }));
      response = unwrapResult(response);
      setConfirmationDialog(false);
      if (response && response.deletedCount) {
        enqueueSnackbar('Deleted succesfully', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        dispatch(getScreenerByUserApi());
      }
    } catch (err) {
      setConfirmationDialog(false);
    }
  };

  return (
    <>
      <DialogConfirmation
        handleClose={() => setConfirmationDialog(false)}
        openDailogConfirmation={() => setConfirmationDialog(true)}
        dialogOpen={confirmationDialog}
        clikedOnAgree={() => deleteConsignAgree()}
        title="Delete Screener"
        message="Are you sure you want to delete this? You won't be able to recover the data after this action."
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
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
          <ListItemText>Delete Screener</ListItemText>
        </MenuItem>
      </Menu>

      <Page title="Screener List | FindScan">
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Screener List"
            links={[
              { name: 'Profile', href: PATH_PROFILE.root },
              {
                name: 'Screener',
                href: PATH_PROFILE.screener,
              },
            ]}
            action={
              <NextLink href={PATH_SCREENER.root} passHref>
                <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
                  New Screener
                </Button>
              </NextLink>
            }
          />
          <CustomTable
            isListLoading={isListLoading}
            dataList={screenerList}
            TABLE_HEAD={TABLE_HEAD}
            getTableRow={(row) => {
              const { _id, description, isPrivate, scanCategory, screenerName, createdAt, slugUrl } = row;
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
                    <NextLink href={`${PATH_SCREENER.root}/${slugUrl}`} passHref>
                      <Button>{screenerName} </Button>
                    </NextLink>
                  </TableCell>
                  <TableCell align="left">
                    {description && (
                      <div
                        style={{ height: '50px', overflow: 'scroll' }}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">{scanCategory}</TableCell>
                  <TableCell align="left">{isPrivate ? 'PRIVATE' : 'PUBLIC'}</TableCell>
                </TableRow>
              );
            }}
          />
        </Container>
      </Page>
    </>
  );
}

export default ManageScreener;
