import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
// components
//

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: '38px',
  backgroundColor: 'black',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  [theme.breakpoints.up('lg')]: {
    minHeight: '38px'
  }
}));

// ----------------------------------------------------------------------

export default function EmailVerify({ onBtResend }) {
  return (
    <>
      <ToolbarStyle>
        <Typography sx={{ color: 'white', fontWeight: 500 }}>
          We have sent you a verification mail. Please verify.
          <Button color="inherit" onClick={onBtResend}>
            Click here{' '}
          </Button>
          to resend.
        </Typography>
      </ToolbarStyle>
    </>
  );
}

EmailVerify.propTypes = {
  onBtResend: PropTypes.func
};
