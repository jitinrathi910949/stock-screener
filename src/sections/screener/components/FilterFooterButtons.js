import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Paper, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MHidden } from 'components/@material-extend';
import { useSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';
import _ from 'lodash';

FilterFooterButtons.propTypes = {
  onSaveClick: PropTypes.func,
  onCopyClick: PropTypes.func,
  onBtGroupping: PropTypes.func,
  onBtAlert: PropTypes.func,
};

export default function FilterFooterButtons(props) {
  const { onSaveClick, onCopyClick, onBtGroupping, onRunScreenerClick, onBtAlert, onGenerateQuery } = props;
  const { isAuthenticated } = useAuth();

  const { selectedScreener } = useSelector(({ screenerReducer }) => screenerReducer);
  return (
    // <Grid sx={{ flexGrow: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }} container spacing={2}>
    // <Grid item xs={12} lg={12}>
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        mx: { md: 2 },
        // mt: { md: 3 },
        minHeight: 48,
        borderRadius: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexDirection: ' center', marginTop: '10px' }}>
        <MHidden width="mdDown">
          <Button
            disableElevation
            variant="contained"
            onClick={() => onBtGroupping()}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(62, 203, 236, .8)',
                },
                boxShadow: 'none',
                backgroundColor: '#3ECBEC',
                padding: '5px 10px 5px 5px',
              },
            ]}
          >
            <TableViewOutlinedIcon sx={{ marginRight: '5px' }} size="small" />
            Groupping
          </Button>
        </MHidden>
        <MHidden width="mdUp">
          <Button
            disableElevation
            variant="contained"
            onClick={() => onBtGroupping()}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(62, 203, 236, .8)',
                },
                boxShadow: 'none',
                backgroundColor: '#3ECBEC',
                // padding: '5px 10px 5px 5px',
              },
            ]}
          >
            <TableViewOutlinedIcon size="small" />
          </Button>
        </MHidden>
        <MHidden width="mdDown">
          <Button
            disableElevation
            variant="contained"
            onClick={onRunScreenerClick}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(0, 102, 204, .8)',
                },
                backgroundColor: 'secondary.main',
                padding: '5px 10px 5px 3px',
                boxShadow: 'none',
              },
            ]}
          >
            <PlayArrowIcon sx={{ marginRight: '5px' }} size="small" />
            Run screener
          </Button>
        </MHidden>
        <MHidden width="mdUp">
          <Button
            disableElevation
            variant="contained"
            onClick={onRunScreenerClick}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(0, 102, 204, .8)',
                },
                backgroundColor: 'secondary.main',
                // padding: '5px 10px 5px 3px',
                boxShadow: 'none',
              },
            ]}
          >
            <PlayArrowIcon size="small" />
          </Button>
        </MHidden>

        <MHidden width="mdDown">
          <Button
            disableElevation
            variant="contained"
            onClick={onGenerateQuery}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(0, 102, 204, .8)',
                },
                backgroundColor: 'secondary.main',
                padding: '5px 10px 5px 3px',
                boxShadow: 'none',
              },
            ]}
          >
            <PlayArrowIcon sx={{ marginRight: '5px' }} size="small" />
            Generate Query
          </Button>
        </MHidden>
        <MHidden width="mdUp">
          <Button
            disableElevation
            variant="contained"
            onClick={onGenerateQuery}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(0, 102, 204, .8)',
                },
                backgroundColor: 'secondary.main',
                // padding: '5px 10px 5px 3px',
                boxShadow: 'none',
              },
            ]}
          >
            <PlayArrowIcon size="small" />
          </Button>
        </MHidden>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexDirection: ' center', marginTop: '10px' }}>
        <MHidden width="mdDown">
          <Button
            variant="contained"
            disableElevation
            onClick={onBtAlert}
            sx={[
              {
                // '&:hover': {
                //   backgroundColor: 'palette.warning.dark'
                // },
                // backgroundColor: 'palette.warning.dark',
                // color: 'white',
                boxShadow: 'none',
                backgroundColor: '#E01E5A',
              },
            ]}
            startIcon={<NotificationsIcon />}
          >
            Create Alert
          </Button>
        </MHidden>
        <MHidden width="mdUp">
          {/* <Button
            variant="contained"
            disableElevation
            onClick={onBtAlert}
            sx={[
              {
                // '&:hover': {
                //   backgroundColor: 'palette.warning.dark'
                // },
                // backgroundColor: 'palette.warning.dark',
                // color: 'white',
                boxShadow: 'none',
                backgroundColor: '#E01E5A',
              },
            ]}
            startIcon={<NotificationsIcon />}
           /> */}
          <Button
            disableElevation
            variant="contained"
            onClick={onBtAlert}
            sx={[
              {
                '&:hover': {
                  backgroundColor: 'rgba(0, 102, 204, .8)',
                },
                backgroundColor: '#E01E5A',
                boxShadow: 'none',
              },
            ]}
          >
            <NotificationsIcon size="small" />
          </Button>
        </MHidden>
        <Button
          variant="contained"
          disableElevation
          onClick={
            isAuthenticated &&
            !_.isEmpty(selectedScreener) &&
            selectedScreener?.userId !== localStorage.getItem('user_id')
              ? onCopyClick
              : onSaveClick
          }
          sx={[
            {
              '&:hover': {
                backgroundColor: 'rgba(0, 102, 204, .8)',
              },
              backgroundColor: 'secondary.main',
              boxShadow: 'none',
            },
          ]}
        >
          {isAuthenticated &&
          !_.isEmpty(selectedScreener) &&
          selectedScreener?.userId !== localStorage.getItem('user_id')
            ? 'Copy'
            : 'Save'}
        </Button>
      </Stack>
    </Paper>
    // </Grid>
    // </Grid>
  );
}
