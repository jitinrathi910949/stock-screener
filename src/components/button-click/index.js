import React from 'react';
import { Box, Typography, Autocomplete, TextField, ClickAwayListener } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PropTypes from 'prop-types';

FilterSelect.propTypes = {
  showArrow: PropTypes.bool,
  optionProps: PropTypes.func,
  valSx: PropTypes.object,
  variant: PropTypes.string
};

export default function FilterSelect(props) {
  const { showArrow, variant, optionProps, valSx } = props;
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        {!open ? (
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
              padding: '7px 8px',
              ...valSx
            }}
            onClick={handleClick}
          >
            {value?.name || 'Value'}{' '}
            {showArrow && (
              <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ color: '#828282', marginLeft: '5px' }} />
            )}
          </Typography>
        ) : (
          <Autocomplete
            sx={{ backgroundColor: 'white', flex: 1, minWidth: '200px' }}
            freeSolo
            fullWidth
            openOnFocus
            disableClearable
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setOpen(!open);
            }}
            {...optionProps}
            id="filter-select-autocomplete"
            variant={variant && 'standard'}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  autoFocus: true
                }}
              />
            )}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
}
