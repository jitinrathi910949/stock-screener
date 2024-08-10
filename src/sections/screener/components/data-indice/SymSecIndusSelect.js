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

SymSecIndusSelect.propTypes = {
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

export default function SymSecIndusSelect(props) {
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
    // if (field === 'indice') {
    //   // upVal.indice = { ...upVal?.indice, name: value?.value };
    // }

    // setValues(upVal);
    submitValue(upVal, true);
    // const toShow = checkDisplay(value, field);
    // setFields(toShow);
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
      <Box as="div" sx={{ display: 'flex', cursor: 'pointer' }}>
        <Stack direction="row" sx={{ alignItems: 'center', flexDirection: ' center' }}>
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
