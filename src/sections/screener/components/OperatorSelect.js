import { useState } from 'react';
import PropTypes from 'prop-types';
import operationList from '../../../mock-data/screener-filter/operator.json';
import symSecIndusOperator from '../../../mock-data/screener-filter/symSecIndusOperator.json';
import FilterSelect from '../../../components/filter-select';
import { operatorListTypeConst } from '../utils/constants';

OperatorSelect.propTypes = {
  showInput: PropTypes.bool,
  index: PropTypes.number,
  handleValue: PropTypes.func,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  operatorListType: PropTypes.string,
};

function OperatorSelect(props) {
  const { showInput, index, handleValue, value, isDisabled, handleBlur, operatorListType } = props;

  const onDataChange = (value) => {
    handleValue({ ...value, type: 'operator', isComplete: true }, index);
  };
  const getOperatorList = () => {
    switch (operatorListType) {
      case operatorListTypeConst.SYM_SEC_INDUS:
        return symSecIndusOperator;
      default:
        return operationList;
    }
  };

  // const [value, setValue] = useState('');

  return (
    <FilterSelect
      showInput={showInput}
      showArrow
      optionProps={{
        options: getOperatorList(),
        getOptionLabel: (option) => option.name || option,
        groupBy: (option) => option.groupedAs,
      }}
      value={value?.name ? value : ''}
      handleChange={(val) => onDataChange(val)}
      valSx={{ color: !isDisabled ? 'error.main' : '#828282', fontWeight: 700 }}
      isDisabled={isDisabled}
      handleBlur={(val) => handleBlur(val, index)}
    />
  );
}
export default OperatorSelect;
