import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const RootButton = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#F2F7FF',
  borderRadius: '2px',
  color: '#828282',
  fontSize: '12px',
  fontWeight: 500,
  padding: '7px 8px',
  cursor: 'pointer',
  marginBottom: '2px'
});

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme?.palette?.secondary?.main,
    color: 'white'
  }
}));

SingleToggleButton.propTypes = {
  label: PropTypes.string.isRequired
};

function SingleToggleButton(props) {
  const classes = useStyles();
  const {active, setActive} = props;

  return (
    <RootButton className={clsx(active && classes.active)} onClick={setActive}>
      {props.label}
    </RootButton>
  );
}

export default SingleToggleButton;
