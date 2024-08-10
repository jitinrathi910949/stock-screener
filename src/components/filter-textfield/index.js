import React, { useEffect } from 'react';
import { Box, Typography, TextField, ClickAwayListener } from '@mui/material';
import PropTypes from 'prop-types';

FilterTextField.propTypes = {
  valSx: PropTypes.object,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  showInput: PropTypes.bool,
  enclose: PropTypes.object,
  endConnector: PropTypes.string
};

export default function FilterTextField(props) {
  const { valSx, handleChange, value, isDisabled, handleBlur, showInput, enclose, endConnector } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (showInput) {
      setOpen(true);
    }
  }, [showInput]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          // flex: 1,
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row',
          cursor: isDisabled && 'not-allowed',
          pr: 1
        }}
      >
        {enclose?.open && <div style={{ fontWeight: 700 }}>(</div>}
        {!open || isDisabled ? (
          <Typography
            as="div"
            noWrap
            sx={{
              display: 'flex',
              backgroundColor: 'white',
              color: '#828282',
              fontSize: 12,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
              padding: '7px 3px',
              ...valSx
            }}
            onClick={handleClick}
          >
            {value || 'Value'}{' '}
          </Typography>
        ) : (
          <TextField
            sx={{ backgroundColor: 'white', minWidth: '100px' }}
            color="secondary"
            size="small"
            fullWidth
            onBlur={(event) => handleBlur(event?.target?.value)}
            InputProps={{
              autoFocus: true
            }}
            value={value}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event.target.value);
            }}
            variant="outlined"
          />
        )}
        {enclose?.close && <div style={{ fontWeight: 700 }}>)</div>}
        {endConnector && <div style={{ fontWeight: 700 }}>{endConnector}</div>}
      </Box>
    </ClickAwayListener>
  );
}
