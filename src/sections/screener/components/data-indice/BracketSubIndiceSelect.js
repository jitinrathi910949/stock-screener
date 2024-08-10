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
import CompleteFilterPanel from './CompleteFilterPanel';

import { checkRsiFieldDisplay, checkIsComplete } from '../../utils/dataIndiceUtil';

BracketSubIndiceSelect.propTypes = {
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

const defaultIndiceVal = _.find(dataPointOptions, (point) => point?.name === 'Number');

export default function BracketSubIndiceSelect(props) {
  const {
    showInput,
    index,
    handleValue,
    value: values = { indice: '' },
    isDisabled = false,
    handleBlur,
    filterPanelList,
    valEntered,
    canProceed,
  } = props;

  useEffect(() => {
    if (valEntered) {
      // const toShow = checkFieldDisplay(values);
      onDataChange(valEntered, 'indice');
    }
  }, [valEntered]);

  const onDataChange = (value, field) => {
    const upVal = { ...values, [field]: value };

    if (field === 'indice') {
      upVal.indice = { ...upVal?.indice };
      upVal.subIndice = [{ type: 'data', indice: defaultIndiceVal, isComplete: true, numVal: '20' }];
    }

    // setValues(upVal);
    let isComp = field === 'indice';
    if (!isComp) {
      isComp = checkIsComplete(upVal, field);
    }

    submitValue(upVal, isComp);
  };

  const updateSubIndice = (subIndice) => {
    const upVal = { ...values, subIndice };
    submitValue(upVal, false);
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
            valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            handleChange={(val) => canProceed(val, 'indice')}
            isDisabled={isDisabled}
            // handleBlur={(val) => handleBlur(val, index)}
          />
          <CompleteFilterPanel
            isActive={!isDisabled}
            valueUploaded={values?.subIndice || []}
            updateSubIndice={updateSubIndice}
            enclose={{ open: true, close: true }}
          />
        </Stack>
      </Box>
    </>
  );
}
