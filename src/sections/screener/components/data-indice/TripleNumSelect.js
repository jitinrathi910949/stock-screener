import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Stack, Box, Dialog, DialogContent, DialogActions, Button, DialogTitle, TextField } from '@mui/material';
import FilterSelect from '../../../../components/filter-select';
import FilterTextfield from '../../../../components/filter-textfield';

import dataPointOptions from '../../../../mock-data/screener-filter/dataPoint.json';
import timeOptions from '../../../../mock-data/screener-filter/time.json';
import candleOptions from '../../../../mock-data/screener-filter/candle.json';

import { checkRsiFieldDisplay, checkIsComplete } from '../../utils/dataIndiceUtil';

TripleNumSelect.propTypes = {
  showInput: PropTypes.bool,
  index: PropTypes.number,
  handleValue: PropTypes.func,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  filterPanelList: PropTypes.array,
  valEntered: PropTypes.any,
  canProceed: PropTypes.func,
};

const defaultCandleVal = _.find(candleOptions, (candle) => candle?.name === 'Latest');

export default function TripleNumSelect(props) {
  const {
    showInput,
    index,
    handleValue,
    value: values = { candle: '', offset: '', indice: '', numVal1: '', numVal2: '', numVal3: '' },
    isDisabled = false,
    handleBlur,
    filterPanelList,
    valEntered,
    canProceed,
  } = props;

  const [showFields, setFields] = useState({ offsetField: false });
  const [openNumberDialog, setNumberDialog] = useState(false);
  const [numEntered, setNumEntered] = useState();
  const [tempVal, setTempVal] = useState();

  useEffect(() => {
    if (values) {
      const toShow = checkRsiFieldDisplay(values);
      setFields(toShow);
    }
  }, [filterPanelList]);

  useEffect(() => {
    if (valEntered) {
      // const toShow = checkFieldDisplay(values);
      onDataChange(valEntered, 'indice');
    }
  }, [valEntered]);

  const onDataChange = (value, field) => {
    const upVal = { ...values, [field]: value };

    if (
      value?.action === 'NUMBER_CANDLES_DAYS' ||
      value?.action === 'NUMBER_CANDLES_WEEKS' ||
      value?.action === 'NUMBER_OFFSET_DAYS'
    ) {
      setNumberDialog(true);
      setTempVal({ tempValue: value, tempField: field });
      return;
    }
    if (field === 'candle' && value?.action === 'NONE') {
      delete upVal?.offset;
    }
    if (field === 'indice') {
      const num1 = values?.numVal1 || values?.indice?.defaultNumVal1;
      const num2 = values?.numVal2 || values?.indice?.defaultNumVal2;
      const num3 = values?.numVal3 || values?.indice?.defaultNumVal3;

      upVal.indice = { ...upVal?.indice };
      upVal.numVal1 = num1;
      upVal.numVal2 = num2;
      upVal.numVal3 = num3;

      upVal.candle = values?.candle || defaultCandleVal;

      if (value?.action === 'SHOW_NUM') {
        delete upVal?.offset;
        delete upVal?.candle;
      }
    }
    // setValues(upVal);
    let isComp = field === 'indice';
    if (!isComp) {
      isComp = checkIsComplete(upVal, field);
    }

    submitValue(upVal, isComp);
  };

  const submitValue = (upVal, isComplete) => {
    // const isComplete = checkIsComplete(upVal);
    handleValue({ ...upVal, type: 'data', isComplete }, index);
  };

  const onNumFetched = () => {
    const tempStoredVal = { ...tempVal };
    if (tempStoredVal?.tempValue?.action === 'NUMBER_CANDLES_DAYS') {
      tempStoredVal.tempValue.name = `${numEntered}  days ago`;
    }
    if (tempStoredVal?.tempValue?.action === 'NUMBER_CANDLES_WEEKS') {
      tempStoredVal.tempValue.name = `${numEntered}  weeks ago`;
    }
    if (tempStoredVal?.tempValue?.action === 'NUMBER_OFFSET_DAYS') {
      tempStoredVal.tempValue.name = `${numEntered}  candles ago`;
    }
    const upVal = { ...values, [tempStoredVal.tempField]: tempStoredVal.tempValue };
    submitValue(upVal);
    setNumberDialog(false);
    setTempVal({});
    setNumEntered(null);
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
          {showFields.offsetField && (
            <FilterSelect
              optionProps={{
                options: timeOptions,
                getOptionLabel: (option) => option.name || option,
                groupBy: (option) => option.groupedAs,
              }}
              value={values.offset}
              handleChange={(val) => onDataChange(val, 'offset')}
              // valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
              isDisabled={isDisabled}
              handleBlur={(val) => handleBlur(val, index)}
            />
          )}
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
            valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            handleChange={(val) => canProceed(val, 'indice')}
            isDisabled={isDisabled}
            // handleBlur={(val) => handleBlur(val, index)}
          />

          <FilterTextfield
            isDisabled={isDisabled}
            value={values.numVal1}
            enclose={{ open: true, close: false }}
            showArrow
            endConnector=","
            handleChange={(val) => onDataChange(val, 'numVal1')}
            // valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            handleBlur={(val) => {
              handleBlur(val, index);
              markComplete();
            }}
          />
          <FilterTextfield
            isDisabled={isDisabled}
            value={values.numVal2}
            enclose={{ open: false, close: false }}
            showArrow
            endConnector=","
            handleChange={(val) => onDataChange(val, 'numVal2')}
            // valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            handleBlur={(val) => {
              handleBlur(val, index);
              markComplete();
            }}
          />
          <FilterTextfield
            isDisabled={isDisabled}
            value={values.numVal3}
            enclose={{ open: false, close: true }}
            showArrow
            handleChange={(val) => onDataChange(val, 'numVal3')}
            // valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            handleBlur={(val) => {
              handleBlur(val, index);
              markComplete();
            }}
          />
        </Stack>
      </Box>
    </>
  );
}
