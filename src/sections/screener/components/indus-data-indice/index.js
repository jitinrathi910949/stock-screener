import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Stack, Box, Dialog, DialogContent, DialogActions, Button, DialogTitle, TextField } from '@mui/material';
import FilterSelect from '../../../../components/filter-select';
import { checkFieldDisplay, checkIsComplete } from '../../utils/dataIndiceUtil';
import { getIndustryListApi, getSectorListApi, getStockListApi } from 'redux/screener/screenerApi';

IndustrialDataIndice.propTypes = {
  showInput: PropTypes.bool,
  index: PropTypes.number,
  handleValue: PropTypes.func,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  filterPanelList: PropTypes.array,
  valEntered: PropTypes.any,
  canProceed: PropTypes.func,
  indiceSelected: PropTypes.string,
};

export default function IndustrialDataIndice(props) {
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
    indiceSelected,
  } = props;
  const dispatch = useDispatch();
  const { stockList, sectorList, industryList } = useSelector(({ screenerReducer }) => screenerReducer);
  useEffect(() => {
    if (valEntered) {
      // const toShow = checkFieldDisplay(values);
      onDataChange(valEntered, 'indice');
    }
  }, [valEntered]);

  useEffect(() => {
    if (!_.isEmpty(indiceSelected)) {
      switch (indiceSelected) {
        case 'Symbol':
          if (_.isEmpty(stockList)) dispatch(getStockListApi());
          break;
        case 'Sector':
          if (_.isEmpty(sectorList)) dispatch(getSectorListApi());
          break;
        case 'Industry':
          if (_.isEmpty(industryList)) dispatch(getIndustryListApi());
          break;
        default:
          break;
      }
    }
  }, [indiceSelected]);

  const onDataChange = (value, field) => {
    const upVal = { ...values, [field]: value };

    submitValue(upVal, true);
  };

  const onEvBlur = (val, index) => {
    if (!valEntered) {
      handleBlur(val, index);
    }
  };

  const submitValue = (upVal, isComplete) => {
    // const isComplete = checkIsComplete(upVal);
    handleValue({ ...upVal, type: 'data', isComplete }, index);
  };

  const getOption = () => {
    if (!_.isEmpty(indiceSelected)) {
      switch (indiceSelected) {
        case 'Symbol':
          return stockList;
        case 'Sector':
          return sectorList;
        case 'Industry':
          return industryList;
        default:
          return [];
      }
    }
  };

  return (
    <>
      <Box as="div" sx={{ display: 'flex', cursor: 'pointer' }}>
        <Stack direction="row" sx={{ alignItems: 'center', flexDirection: ' center' }}>
          <FilterSelect
            optionProps={{
              options: getOption(),
              getOptionLabel: (option) => option.name || option,
            }}
            viewMoreProps={{ isVisible: true }}
            value={values.indice}
            handleChange={(val) => onDataChange(val, 'indice')}
            showArrow
            valSx={{ color: !isDisabled ? 'secondary.main' : '#828282', fontWeight: 700 }}
            isDisabled={isDisabled}
            handleBlur={(val) => handleBlur(val, index)}
          />
        </Stack>
      </Box>
    </>
  );
}
