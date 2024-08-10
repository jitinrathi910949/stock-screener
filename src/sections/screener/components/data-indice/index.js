import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import _ from 'lodash';
import DataIndiceSelect from './DataIndiceSelect';
import RsiSelect from './RsiSelect';
import MinMaxSelect from './MinMaxSelect';
import SmaSelect from './SmaSelect';
import TripleNumSelect from './TripleNumSelect';
import DoubleNumSelect from './DoubleNumSelect';
import GeneralIndiceSelect from './GeneralIndiceSelect';
import FourNumSelect from './FourNumSelect';
import BracketSubIndiceSelect from './BracketSubIndiceSelect';
import FundamentalIndiceSelect from './FundamentalIndiceSelect';
import SymSecIndusSelect from './SymSecIndusSelect';

DataIndice.propTypes = {
  showInput: PropTypes.bool,
  index: PropTypes.number,
  handleValue: PropTypes.func,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
};

function DataIndice(props) {
  const { showInput, index, handleValue, value, isDisabled = false, handleBlur } = props;
  const [valEntered, setValEntered] = useState();
  // const valEntered = useRef(null);

  const { filterPanelList } = useSelector(({ screenerReducer }) => screenerReducer);

  // useEffect(() => {
  //   // if (field === 'indice') {
  //   // valEntered.current = value;
  //   setValEntered(value);
  //   // }
  // }, [value]);

  const canProceed = (value, field) => {
    if (field === 'indice') {
      // valEntered.current = value;
      setValEntered(value);
    }
  };

  const onEvBlur = (val, index) => {
    if (!valEntered) {
      handleBlur(val, index);
    }
  };

  switch (value?.indice?.action) {
    case 'SHOW_RSI':
      return (
        <RsiSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            valEntered,
            canProceed,
          }}
        />
      );

    case 'SHOW_MIN_MAX':
      return (
        <MinMaxSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            valEntered,
            canProceed,
          }}
        />
      );
    case 'SHOW_SMA':
      return (
        <SmaSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            valEntered,
            canProceed,
          }}
        />
      );

    case 'SHOW_DATA_INDICE':
    case 'SHOW_CANDLE':
    case 'SHOW_NUM':
      return (
        <DataIndiceSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            canProceed,
            onEvBlur,
            valEntered,
          }}
        />
      );
    case 'SHOW_TRIPLE_NUM':
      return (
        <TripleNumSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            canProceed,
            onEvBlur,
            valEntered,
          }}
        />
      );
    case 'SHOW_DOUBLE_NUM':
      return (
        <DoubleNumSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            canProceed,
            onEvBlur,
            valEntered,
          }}
        />
      );
    case 'SHOW_FOUR_NUM':
      return (
        <FourNumSelect
          {...{
            showInput,
            index,
            handleValue,
            value,
            isDisabled,
            handleBlur,
            filterPanelList,
            canProceed,
            onEvBlur,
            valEntered,
          }}
        />
      );
    case 'BRACKET_SUB_INDICE':
      return (
        <BracketSubIndiceSelect
          {...{
            showInput,
            index,
            value,
            isDisabled,
            canProceed,
            onEvBlur,
            valEntered,
            handleValue,
          }}
        />
      );
    case 'FUNDAMENTAL_OFFSET':
      return (
        <FundamentalIndiceSelect
          {...{
            showInput,
            index,
            value,
            isDisabled,
            canProceed,
            onEvBlur,
            valEntered,
            handleValue,
            handleBlur,
          }}
        />
      );
    case 'SYM_SEC_INDUS':
      return (
        <SymSecIndusSelect
          {...{
            showInput,
            index,
            value,
            isDisabled,
            canProceed,
            onEvBlur,
            valEntered,
            handleValue,
            handleBlur,
          }}
        />
      );
    default:
      return (
        <GeneralIndiceSelect
          {...{
            showInput,
            index,
            value,
            isDisabled,
            canProceed,
            onEvBlur,
            valEntered,
            handleValue,
          }}
        />
      );
  }
}

export default DataIndice;
