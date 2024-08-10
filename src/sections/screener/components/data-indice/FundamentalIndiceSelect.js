import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Stack, Box, Dialog, DialogContent, DialogActions, Button, DialogTitle, TextField } from '@mui/material';
import FilterSelect from '../../../../components/filter-select';
import FilterTextfield from '../../../../components/filter-textfield';
import candleOptions from '../../../../mock-data/screener-filter/fundamentalCandle.json';
import dataPointOptions from '../../../../mock-data/screener-filter/dataPoint.json';
import { checkFieldDisplay, checkIsComplete } from '../../utils/dataIndiceUtil';

FundamentalIndiceSelect.propTypes = {
  showInput: PropTypes.bool,
  index: PropTypes.number,
  handleValue: PropTypes.func,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  filterPanelList: PropTypes.array,
  valEntered: PropTypes.any,
  canProceed: PropTypes.func,
  onEvBlur: PropTypes.func,
};

const defaultCandleVal = _.find(candleOptions, (candle) => candle?.name === 'Latest');

export default function FundamentalIndiceSelect(props) {
  const {
    showInput,
    index,
    handleValue,
    value: values = { candle: '', offset: '', indice: '', numVal: '' },
    isDisabled = false,
    handleBlur,
    filterPanelList,
    valEntered,
    canProceed,
    onEvBlur,
  } = props;
  const [openNumberDialog, setNumberDialog] = useState(false);
  const [numEntered, setNumEntered] = useState();
  const [tempVal, setTempVal] = useState();

  useEffect(() => {
    if (valEntered) {
      // const toShow = checkFieldDisplay(values);
      onDataChange(valEntered, 'indice');
    }
  }, [valEntered]);

  const onDataChange = (value, field) => {
    const upVal = { ...values, [field]: value };
    if (value?.action === 'NUMBER_CANDLES_YEARS' || value?.action === 'NUMBER_CANDLES_QUATERLY') {
      setNumberDialog(true);
      setTempVal({ tempValue: value, tempField: field });
      return;
    }
    if (field === 'indice') {
      // upVal.indice = { ...upVal?.indice, name: value?.value };
      upVal.candle = values?.candle || defaultCandleVal;

      if (value?.action === 'SHOW_NUM') {
        delete upVal?.offset;
        delete upVal?.candle;
      }
    }

    let isComplete = false;
    if (field === 'numVal') isComplete = false;
    else isComplete = checkIsComplete(upVal);

    // setValues(upVal);
    submitValue(upVal, isComplete);
    // const toShow = checkDisplay(value, field);
    // setFields(toShow);
  };

  const onNumFetched = () => {
    let tempStoredVal = _.cloneDeep(tempVal);
    if (tempStoredVal?.tempValue?.action === 'NUMBER_CANDLES_QUATERLY') {
      tempStoredVal.tempValue.name = `${numEntered}  quarters ago`;
    }
    if (tempStoredVal?.tempValue?.action === 'NUMBER_CANDLES_YEARS') {
      tempStoredVal.tempValue.name = `${numEntered}  years ago`;
    }

    const upVal = { ...values, [tempStoredVal.tempField]: tempStoredVal.tempValue };

    const isComplete = checkIsComplete(upVal);

    submitValue(upVal, isComplete);
    setNumberDialog(false);
    setTempVal({});
    setNumEntered(null);
  };

  const submitValue = (upVal, isComplete) => {
    // const isComplete = checkIsComplete(upVal);
    handleValue({ ...upVal, type: 'data', isComplete }, index);
  };

  const markComplete = () => {
    handleValue({ ...values, type: 'data', isComplete: true }, index);
  };

  return (
    <>
      <Dialog open={openNumberDialog} onClose={() => setNumberDialog(false)} disableEscapeKeyDown>
        <DialogTitle>Enter a value to continue</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            autoFocus
            margin="dense"
            id="name"
            // value={number}
            label="Enter Number"
            fullWidth
            variant="standard"
            onChange={(e) => setNumEntered(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onNumFetched}>Done</Button>
        </DialogActions>
      </Dialog>
      <Box as="div" sx={{ display: 'flex', cursor: 'pointer' }}>
        <Stack direction="row" sx={{ alignItems: 'center', flexDirection: ' center' }}>
          <FilterSelect
            optionProps={{
              options: candleOptions,
              getOptionLabel: (option) => option.name || option,
              groupBy: (option) => option.groupedAs,
            }}
            value={values.candle}
            handleChange={(val) => onDataChange(val, 'candle')}
            // valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            isDisabled={isDisabled}
            handleBlur={(val) => handleBlur(val, index)}
          />

          <FilterSelect
            optionProps={{
              options: dataPointOptions,
              getOptionLabel: (option) => option.name || option,
              groupBy: (option) => option.groupedAs,
            }}
            viewMoreProps={{ isVisible: true }}
            value={values.indice}
            handleChange={(val) => canProceed(val, 'indice')}
            showArrow
            valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            isDisabled={isDisabled}
            handleBlur={(val) => onEvBlur(val, index)}
          />
        </Stack>
      </Box>
    </>
  );
}
