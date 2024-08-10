export const dataIndiceFields = { candle: 'candle', offset: 'offset', indice: 'indice', numVal: 'numVal' };

export function checkDisplay(value, field) {
  const fieldStatus = { candleField: false, offsetField: false, numField: false };

  switch (field) {
    case dataIndiceFields.indice:
      if (value.action === 'SHOW_NUM') {
        fieldStatus.numField = true;
      }
      if (value.action === 'SHOW_CANDLE') {
        fieldStatus.candleField = true;
      }
      break;

    case dataIndiceFields.candle:
      fieldStatus.candleField = true;
      if (value.action === 'SHOW_TIME') {
        fieldStatus.offsetField = true;
      }
      break;

    case dataIndiceFields.offset:
      fieldStatus.candleField = true;
      fieldStatus.offsetField = true;
      break;

    case dataIndiceFields.numVal:
      fieldStatus.numField = true;
      break;

    default:
      break;
  }
  return fieldStatus;
}

export function checkIsComplete(valueObj) {
  if (valueObj?.indice) {
    if (valueObj?.offset) {
      return true;
    }
    if (valueObj.indice?.action === 'NONE') {
      return true;
    }
    if (valueObj?.candle && valueObj?.candle.action === 'NONE') {
      return true;
    }
  }
  return false;
}

export function checkFieldDisplay(valueObj) {
  const fieldStatus = { candleField: false, offsetField: false, numField: false };

  if (valueObj?.indice?.action === 'SHOW_NUM') {
    fieldStatus.numField = true;
  } else if (valueObj?.indice?.action === 'SHOW_CANDLE') {
    fieldStatus.candleField = true;

    if (valueObj?.candle?.action === 'SHOW_TIME') {
      fieldStatus.offsetField = true;
    }
  }

  return fieldStatus;
}

export function checkRsiFieldDisplay(valueObj) {
  const fieldStatus = { offsetField: false };
  if (valueObj?.candle?.action === 'SHOW_TIME') {
    fieldStatus.offsetField = true;
  }
  return fieldStatus;
}

export function checkifAdd(updatedVal, index) {
  let isAdd = index === updatedVal.length - 1 && index < 6;
  const len = updatedVal.length;

  if (len >= 3 && updatedVal[1]?.groupedAs === 'Comparison Operations') {
    isAdd = false;
  }
  // // Check if last entry is industrial, sector or symbol
  if (updatedVal[len - 1]?.type === 'data' && updatedVal[len - 1]?.indice?.action === 'SYM_SEC_VALUE') {
    isAdd = false;
  }

  return isAdd;
}

export function validate(uploadedValues, showMsg) {
  const len = uploadedValues.length;
  const op1 = uploadedValues[1]?.groupedAs === 'Arithmetic Operations' ? 'AO' : 'CO';
  let op3;
  let op5;

  switch (len) {
    case 4:
    case 5:
      if (op1 === 'CO') {
        showMsg('You cannot have any operation at this 3rd place', 'error');
        return false;
      }
      op3 = uploadedValues[3]?.groupedAs === 'Arithmetic Operations' ? 'AO' : 'CO';

      if (op3 === 'AO') {
        showMsg('You cannot have arithmetic operation at this 3rd place', 'error');
        return false;
      }
      break;

    case 6:
    case 7:
      op3 = uploadedValues[3]?.groupedAs === 'Arithmetic Operations' ? 'AO' : 'CO';
      if (op1 === 'CO') {
        showMsg('You cannot have any operation at this 3rd place', 'error');
        return false;
      }
      if (op3 === 'AO') {
        showMsg('You cannot have arithmetic operation at the 3rd place', 'error');
        return false;
      }
      op5 = uploadedValues[5]?.groupedAs === 'Arithmetic Operations' ? 'AO' : 'CO';
      if (op5 === 'CO') {
        showMsg('You cannot have any comparision operation at the 5rd place', 'error');
        return false;
      }
      break;

    default:
      break;
  }

  return true;
}
