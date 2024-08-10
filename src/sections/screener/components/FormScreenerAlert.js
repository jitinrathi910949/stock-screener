import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../../components/@material-extend';
import { Grid, Stack, Typography, Box, Select, MenuItem, Button } from '@mui/material';
import timePeriodList from '../../../mock-data/alert-options/timePeriodList.json';
import offsetListOpts from '../../../mock-data/alert-options/offsetList.json';
import _ from 'lodash';
import { unwrapResult } from '@reduxjs/toolkit';
import { PATH_SCREENER } from '../../../routes/paths';
import { createAlertApi } from '../../../redux/screener/alertApi';
import { useRouter } from 'next/router';

export default function FormScreenerAlert(props) {
  const { setSaveForm } = props;
  const dispatch = useDispatch();
  const { selectedScreener } = useSelector(({ screenerReducer }) => screenerReducer);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useRouter();

  const [formValues, setFormValues] = useState({
    timePeriod: '',
    offset: '',
    notification: '',
  });
  const [showField, setFieldDisplay] = useState({ offset: false, notification: false });
  const [offsetOpt, setOffsetOpts] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(selectedScreener?.alert)) {
      setFormValues((preVal) => ({ ...preVal, ...selectedScreener.alert }));
      toggleFieldDisplay(true, true);
      setOffsetOpts(offsetListOpts[selectedScreener.alert.timePeriod]);
    }
  }, [selectedScreener]);

  const toggleFieldDisplay = (offset, notification) => {
    setFieldDisplay({ offset, notification });
  };

  const handleChange = (value, field) => {
    setFormValues((preVal) => ({ ...preVal, [field]: value }));
    if (!_.isEmpty(value)) {
      switch (field) {
        case 'timePeriod':
          toggleFieldDisplay(!_.isEmpty(value), false);
          setOffsetOpts(offsetListOpts[value]);
          break;
        case 'offset':
          toggleFieldDisplay(true, !_.isEmpty(value));
          break;
        case 'notification':
          toggleFieldDisplay(true, true);
          break;
        default:
          break;
      }
    }
    // if (e.target.value) {
    //   setOffset(true);
    // } else {
    //   setOffset(false);
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      ...formValues,
      screenerId: selectedScreener?._id,
    };
    let response = await dispatch(createAlertApi(params));
    response = unwrapResult(response);
    if (response.data) {
      enqueueSnackbar('Saved successfully', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      setSaveForm(null);
      navigate(`${PATH_SCREENER.root}/${response.data?._id}`, { replace: true });
    }
  };

  return (
    <Grid
      sx={{ flexGrow: 1, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}
      container
      spacing={2}
    >
      <Grid item xs={12} sm={12} md={8}>
        <form noValidate onSubmit={handleSubmit}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              // alignItems: 'flex-start',
              // flexDirection: ' flex-start',
              marginTop: '10px',
              boxShadow: '0 0 1px 0px #828282',
              borderRadius: '4px',
              padding: '16px',
              width: '100%',
            }}
          >
            <Typography
              as="h6"
              sx={{
                fontSize: '14px',
                display: 'inline-block',
                maxWidth: '100%',
                fontWeight: '700',
                color: 'black',
              }}
            >
              Run alert every:
            </Typography>
            <Stack direction="row" sx={{ width: '100%' }} spacing={2} alignItems="center">
              <Typography
                as="h6"
                sx={{
                  fontSize: '14px',
                  display: 'inline-block',
                  maxWidth: '100%',
                  fontWeight: '700',
                  color: 'black',
                  minWidth: 120,
                }}
                noWrap
              >
                Time Period
              </Typography>
              {/* <TextField
              id="time-period"
              name="timePeriod"
              variant="outlined"
              fullWidth
              dense
              size="small"
              onChange={editTimeperiod}
            /> */}
              <Select
                value={formValues.timePeriod}
                onChange={({ target: { value } }) => handleChange(value, 'timePeriod')}
                displayEmpty
                fullWidth
                size="small"
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {timePeriodList.map((opt, key) => (
                  <MenuItem key={`meuadf-${key}`} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {showField?.offset && (
              <Stack direction="row" sx={{ width: '100%' }} spacing={2} alignItems="center">
                <Typography
                  as="h6"
                  sx={{
                    fontSize: '14px',
                    display: 'inline-block',
                    maxWidth: '100%',
                    fontWeight: '700',
                    color: 'black',
                    minWidth: 120,
                  }}
                  noWrap
                >
                  Offset
                </Typography>
                <Select
                  value={formValues.offset}
                  displayEmpty
                  size="small"
                  onChange={({ target: { value } }) => handleChange(value, 'offset')}
                  fullWidth
                  dense
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {offsetOpt.map((opt) => (
                    <MenuItem key={opt?.key} value={opt?.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            )}
            {showField?.notification && (
              <Stack
                direction="row"
                sx={{ width: '100%' }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  as="h6"
                  sx={{
                    fontSize: '14px',
                    display: 'inline-block',
                    fontWeight: '700',
                    color: 'black',
                    minWidth: 120,
                  }}
                  noWrap
                >
                  Notification On
                </Typography>
                {/* <TextField id="time-period" name="timePeriod" fullWidth variant="outlined" dense size="small" /> */}
                <Select
                  size="small"
                  variant="outlined"
                  value={formValues.notification}
                  displayEmpty
                  onChange={({ target: { value } }) => handleChange(value, 'notification')}
                  fullWidth
                  dense
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="sms"> SMS</MenuItem>
                  <MenuItem value="email">E-Mail</MenuItem>
                  <MenuItem value="webPush">Web(push)</MenuItem>
                  <MenuItem value="mobilePush">Mobile(push)</MenuItem>
                </Select>
              </Stack>
            )}
            <Box sx={{ width: '100%', textAlign: 'end' }}>
              <Button
                variant="contained"
                disableElevation
                type="submit"
                disabled={!formValues?.notification}
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
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}
