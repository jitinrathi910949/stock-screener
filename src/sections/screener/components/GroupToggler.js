import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Box, Typography } from '@mui/material';

export default function GroupToggler(props) {
  const { setToggleButton, relation } = props;
  const { filterPanelList } = useSelector(({ screenerReducer }) => screenerReducer);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '18px'
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          height: 30,
          width: 85,
          backgroundColor: '#F2F4F9',
          borderRadius: 0.5,
          alignItems: 'center',
          cursor: 'pointer',
          padding: '0px '
        }}
        onClick={setToggleButton}
      >
        <Typography
          sx={
            relation === 'AND' && {
              backgroundColor: 'white',
              color: 'secondary.main',
              padding: '3px 8px',
              boxShadow: '0px 1px 2px rgb(0 0 0 / 10%)',
              transition: 'all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)',
              borderRadius: '2px'
            }
          }
          as="div"
        >
          And
        </Typography>
        <Typography
          sx={
            relation === 'OR' && {
              backgroundColor: 'white',
              color: 'secondary.main',
              padding: '3px 8px',
              boxShadow: '0px 1px 2px rgb(0 0 0 / 10%)',
              transition: 'all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)',
              borderRadius: '2px'
            }
          }
          as="div"
        >
          Or
        </Typography>
      </Paper>
    </Box>
  );
}
