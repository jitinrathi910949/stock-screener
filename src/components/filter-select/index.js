import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  ClickAwayListener,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Paper,
  Button,
  InputAdornment,
  Stack,
  Grid,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import SingleToggleButton from 'components/SingleToggleButton';
import FuzzySearch from 'fuzzy-search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';

FilterSelect.propTypes = {
  showArrow: PropTypes.bool,
  optionProps: PropTypes.func,
  valSx: PropTypes.object,
  variant: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  showInput: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  viewMoreProps: PropTypes.object,
};

const CustomPaper = (props) => {
  const { viewMoreProps, openDialogBt, ...other } = props;
  return (
    <Paper elevation={8} {...other}>
      {props.children}

      <span style={{ float: 'right' }}>
        {viewMoreProps?.isVisible && (
          <Button variant="text" onMouseDown={() => openDialogBt()} size="small" endIcon={<AspectRatioIcon />}>
            Expand
          </Button>
        )}
      </span>
    </Paper>
  );
};

CustomPaper.propTypes = {
  viewMoreProps: PropTypes.object,
  openDialogBt: PropTypes.func,
  children: PropTypes.node,
};

export default function FilterSelect(props) {
  const {
    showArrow,
    variant,
    optionProps,
    valSx,
    handleChange,
    value,
    showInput,
    isDisabled,
    handleBlur,
    viewMoreProps = {},
  } = props;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [groups, setGroups] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [activeFilter, setActiveFilter] = React.useState();
  const [selectedFilter, toggleFilter] = React.useState(null);
  const [selectedItem, selectItem] = useState('');

  useEffect(() => {
    if (showInput) {
      setOpen(true);
    }
  }, [showInput]);

  useEffect(() => {
    if (!_.isEmpty(optionProps?.options)) {
      const uniqueGroups = _.groupBy(optionProps?.options, 'groupedAs');
      // console.log('groups are ', uniqueOpts);
      // const uniqueGroups = _.map(uniqueOpts, (opt) => opt?.groupedAs);
      setGroups(uniqueGroups);
      setFilteredList(uniqueGroups);
    }
  }, [optionProps]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const openDialogBt = () => {
    console.log('butnda dsfjlasdjflkasjdflasdlfgjladsjg');
    setOpenDialog(true);
    setOpen(false);
  };
  const handleCloseDialog = (event, reason) => {
    if (reason !== 'backdropClick') setOpenDialog(false);
  };

  const handelActiveFilter = (key) => {
    toggleFilter(key);
    const element = document?.getElementById(`li-${key}`);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveFilter(key);
  };

  const onSearchText = (text) => {
    if (!text) {
      setFilteredList(groups);
    } else {
      const searcher = new FuzzySearch(optionProps?.options, ['name'], {
        caseSensitive: false,
      });
      const result = searcher.search(text);
      const uniqueGroups = _.groupBy(result, 'groupedAs');
      setFilteredList(uniqueGroups);
    }
  };

  const onBtSubmit = () => {
    handleChange(selectedItem);
    setOpen(!open);
    handleCloseDialog()
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} disableEscapeKeyDown maxWidth="lg" fullWidth>
        <DialogTitle sx={{ px: 10, mt: 1 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 4,
              top: 4,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            id="outlined-search"
            fullWidth
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            type="search"
            sx={{ mb: 1 }}
            onChange={(data) => onSearchText(data.target.value)}
          />
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            {_.map(groups, (value, key) => (
              // <Button
              //   key={`groupdskey-${key}`}
              //   style={{ marginRight: '5px', marginBottom: '5px' }}
              //   onClick={() => handleSetFilter(key)}
              //   variant="outlined"
              // >
              //   {key}
              // </Button>
              <div key={`singleToggleButton${key}`}>
                <SingleToggleButton
                  label={key}
                  setActive={() => handelActiveFilter(key)}
                  active={activeFilter === key}
                />
              </div>
            ))}
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ px: 10, mt: 1 }}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="start">
            <Grid item xs={12} sm={12} md={6}>
              {/* <PerfectScrollbar> */}
              <Paper
                variant="outlined"
                sx={{
                  maxHeight: '400px',
                }}
              >
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflowY: 'scroll',
                    maxHeight: 400,
                   

                    '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {_.map(filteredList, (value, key) => (
                    <li key={`li-${key}`} id={`li-${key}`}>
                      <ul>
                        <ListSubheader>{key}</ListSubheader>
                        {value?.map((item) => (
                          <ListItemButton
                            key={item?.templateValue}
                            selected={selectedItem?.name === item?.name}
                            onClick={() => selectItem(item)}
                            sx={{
                              '&.Mui-selected': {
                                backgroundColor: '#F2F7FF',
                              },
                              '&:hover': {
                                backgroundColor: '#F2F7FF',
                              },
                            }}
                          >
                            <ListItemText primary={item?.name} />
                          </ListItemButton>
                        ))}
                      </ul>
                    </li>
                  ))}
                </List>
              </Paper>
              {/* </PerfectScrollbar> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {/* {filterTitle != 'Select Filter' && <section className="mb-5"> */}
              <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: ' flex' }}>
                {!_.isEmpty(selectedFilter) && (
                  <section style={{ marginTop: '32px' }}>
                    <h3 sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <HelpOutlineIcon sx={{ fontSize: '15px' }} /> What is {selectedFilter}?
                    </h3>
                    <p style={{ padding: '5px 0' }}>
                      <strong>A paragraph </strong> of <span className="text-danger">text</span> with on{' '}
                      <a href="">unassigned link</a>{' '}
                    </p>
                    <p style={{ padding: '5px 0' }}>
                      <strong>
                        A <span className="fst-italic">second</span>{' '}
                        <span className="text-decoration-underline">row</span>{' '}
                        <span className="text-decoration-line-through">text</span>{' '}
                      </strong>{' '}
                      with a <a href="">web link</a>{' '}
                    </p>
                  </section>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ padding: '8px 24px !important' }}>
          <Button variant="contained" color="secondary" disableRipple autoFocus onClick={onBtSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            cursor: isDisabled && 'not-allowed',
          }}
        >
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
                padding: '7px 4px',
                ...valSx,
              }}
              onClick={handleClick}
            >
              {value?.value || value?.name || 'Value'}{' '}
              {showArrow && (
                <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ color: '#828282', marginLeft: '2px' }} />
              )}
            </Typography>
          ) : (
            <Autocomplete
              sx={{ backgroundColor: 'white', minWidth: '200px' }}
              freeSolo
              fullWidth
              openOnFocus
              disableClearable
              PaperComponent={(prop) => (
                <CustomPaper openDialogBt={openDialogBt} {...prop} viewMoreProps={viewMoreProps} />
              )}
              onBlur={(event) => handleBlur && handleBlur(event?.target?.value)}
              value={value}
              onChange={(event, newValue) => {
                handleChange(newValue);
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
                    autoFocus: true,
                  }}
                />
              )}
            />
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
}
