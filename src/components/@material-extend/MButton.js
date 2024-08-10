import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { Button } from '@mui/material';
//
import { ButtonAnimate } from '../animate/ButtonAnimate';

// ----------------------------------------------------------------------

const MButton = forwardRef(({ label, ...other }, ref) => (
  <ButtonAnimate>
    <Button ref={ref} {...other}>
      {label}
    </Button>
  </ButtonAnimate>
));

MButton.propTypes = {
  label: PropTypes.string,
};

export default MButton;
