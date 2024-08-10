import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Stack, IconButton } from '@mui/material';
import closeFill from '@iconify/icons-eva/close-fill';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../../../components/@material-extend';
import DataIndice from './index';
import OperatorSelect from '../OperatorSelect';
import { checkifAdd, validate } from '../../utils/dataIndiceUtil';

function CompleteFilterPanel(props) {
  const { valueUploaded, isActive, updateSubIndice, enclose, endConnector } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onAddFill = () => {
    // const updatedFields = [...selectFields];
    const valToUpdate = { isComplete: 'false' };
    if (valueUploaded[valueUploaded.length - 1]?.type === 'data') {
      valToUpdate.type = 'operator';
    } else {
      valToUpdate.type = 'data';
    }
    handleValue(valToUpdate, valueUploaded.length);
  };
  const handleValue = (val, index) => {
    const updatedVal = [...valueUploaded];
    if (val?.isComplete === 'false') {
      val.isComplete = false;
    } else {
      val.isComplete = true;
    }

    if (updatedVal.length < index) {
      updatedVal.push(val);
    } else {
      updatedVal[index] = val;
    }

    if (index % 2 && val.groupedAs && !validate(updatedVal, showMsg)) {
      if (index === updatedVal.length - 1) {
        updatedVal.splice(index, 1);
        updateSubIndice(updatedVal);
        // updatedPanel[itemIndex].data = updatedVal;
        // updatedPanel[itemIndex].bgColor = bgColor;
        // dispatch(screenerAction.setFilterPanelList(updatedPanel));
        return;
      }
      return;
    }

    // if (val.isComplete && checkifAdd(updatedVal, index)) {
    //   updatedVal.push({ type: val.type === 'data' ? 'operator' : 'data' });
    // }
    updateSubIndice(updatedVal);
  };

  const handleBlur = (value, index) => {
    console.log(value);
    if (_.isEmpty(value)) {
      const updatedVal = [...valueUploaded];
      updatedVal.splice(index, 1);
      updateSubIndice(updatedVal);
    }
  };

  const showMsg = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant,
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };

  return (
    <Stack
      direction="row"
      // spacing={1}
      sx={{
        alignItems: 'center',
        flexDirection: ' center',
        maxWidth: '60vw',
        backgroundColor: 'white',
        flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' },
        overflow: { md: 'scroll' },
        MsOverflowStyle: 'none' /* Internet Explorer 10+ */,
        scrollbarWidth: 'none' /* Firefox */,

        '::-webkit-scrollbar': {
          display: 'none' /* Safari and Chrome */,
        },
      }}
    >
      {enclose?.open && <div style={{ fontWeight: 700 }}>(</div>}
      {valueUploaded.map((value, index) =>
        value?.type === 'operator' ? (
          <OperatorSelect
            showInput={!value?.isComplete}
            handleValue={handleValue}
            index={index}
            value={value}
            isDisabled={!isActive}
            handleBlur={handleBlur}
          />
        ) : (
          <DataIndice
            showInput={!value?.isComplete}
            handleValue={handleValue}
            index={index}
            value={value}
            isDisabled={!isActive}
            handleBlur={handleBlur}
          />
        )
      )}
      {valueUploaded?.length < 7 && (
        <IconButton
          disabled={!isActive}
          size="small"
          color="secondary"
          sx={{ marginLeft: '-8px' }}
          disableFocusRipple
          disableRipple
        >
          <AddOutlinedIcon
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: !isActive ? '#919EAB' : '#0066CC',
              borderRadius: '4px',
              color: '#fff',
              margin: '0px',
              // fontSize: 12,
              width: 15,
              height: 'auto'
            }}
            fontSize="small"
            onClick={() => onAddFill()}
          />
        </IconButton>
      )}
      {enclose?.close && <div style={{ fontWeight: 700, marginRight: '8px' }}>)</div>}
      {endConnector && <div style={{ fontWeight: 700 }}>{endConnector}</div>}
    </Stack>
  );
}
CompleteFilterPanel.propTypes = {
  valueUploaded: PropTypes.array,
  isActive: PropTypes.bool,
  updateSubIndice: PropTypes.func,
  enclose: PropTypes.object,
  endConnector: PropTypes.string
};

export default CompleteFilterPanel;
