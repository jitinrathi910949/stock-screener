import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, Box } from '@mui/material';
import FilterSelect from '../../../../components/filter-select';
import dataPointOptions from '../../../../mock-data/screener-filter/dataPoint.json';

GeneralIndiceSelect.propTypes = {
  showInput: PropTypes.bool,
  index: PropTypes.number,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  canProceed: PropTypes.func,
  onEvBlur: PropTypes.func,
  valEntered: PropTypes.any,
  handleValue: PropTypes.func,
};

export default function GeneralIndiceSelect(props) {
  const {
    showInput,
    index,
    value: values = { candle: '', offset: '', indice: '', numVal: '' },
    isDisabled = false,
    canProceed,
    onEvBlur,
    valEntered,
    handleValue,
  } = props;

  useEffect(() => {
    if (valEntered) {
      // const toShow = checkFieldDisplay(values);
      onDataChange(valEntered, 'indice');
    }
  }, [valEntered]);

  const onDataChange = (value, field) => {
    const upVal = { ...values, [field]: value };

    submitValue(upVal, false);
  };
  const submitValue = (upVal, isComplete) => {
    // const isComplete = checkIsComplete(upVal);
    handleValue({ ...upVal, type: 'data', isComplete }, index);
  };

  return (
    <>
      <Box as="div" sx={{ display: 'flex', cursor: 'pointer' }}>
        <Stack direction="row" sx={{ alignItems: 'center', flexDirection: ' center' }}>
          <FilterSelect
            showInput={showInput}
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
