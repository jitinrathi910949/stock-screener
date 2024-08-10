import React, { useState, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';
import { Autocomplete, InputBase, Typography, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Iconify from 'components/Iconify';
import { createStyles, makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import _, { isNull } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from 'redux/common/commonSlice';
import { searchApi, searchExchangeApi } from 'redux/common/commonApi';
import { useRouter } from 'next/router';
import { PATH_SCREENER, PATH_STOCK } from 'routes/paths';
import searchTypeConst from 'utils/constants/searchTypeConst';

const top100Films = [
  { title: 'Reliance Industries' },
  { title: 'Nifty Bank Index' },
  { title: 'SBI Small Cap Fund' },
  { title: 'Kotak Nifty ETF' },
  { title: 'KitKat' },
  { title: 'Nifty Bank Index' },
  { title: 'SBI Small Cap Fund' },
  { title: 'Kotak Nifty ETF' },
  { title: 'KitKat' },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  // zIndex: theme.zIndex.modal,
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  // borderRadius: theme.shape.borderRadius
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:focus-within': {
    backgroundColor: 'white',
    color: theme.palette.text.primary,
  },

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
  // color: theme.palette.text.primary,
  '&:focus-within': {
    color: theme.palette.text.primary,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '&:focus-within': {
    color: theme.palette.text.primary,
  },
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: 14,
    fontWeight: 500,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: 1,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '41ch',
    },
  },
}));

const useStyles = makeStyles({
  paper: {
    borderRadius: '0px !important',
  },
});

const CustomPaper = (props) => <Paper elevation={2} {...props} />;

function DesktopSearchbar(props) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { searchList, searchText, isSearching, searchExchangeList } = useSelector(({ commonReducer }) => commonReducer);
  const debounceFn = useCallback(_.debounce(handleSearch, 1000), []);
  let searchTotalList = searchList.concat(searchExchangeList);

  async function handleSearch(text) {
    dispatch(commonAction.setSearching(true));

    await dispatch(searchApi({ searchText: text }));
    if (text !== '') {
      await dispatch(searchExchangeApi(text));
    }
    dispatch(commonAction.setSearching(false));
  }

  const onInputChange = (newInputValue) => {
    dispatch(commonAction.setSearching(true));
    dispatch(commonAction.setSearchText(newInputValue));
    debounceFn(newInputValue);
  };

  const onItemSelect = (option) => {
    if (option?.type === searchTypeConst.SCREENER) {
      router.push(`${PATH_SCREENER.root}/${option.slugUrl}`);
    }
  };
  const goScreenStock = (data) => {
    if (data?.type === searchTypeConst.SCREENER) {
      router.push(`${PATH_SCREENER.root}/${data.slugUrl}`);
    } else {
      router.push(`${PATH_STOCK.root}/${data?.name}`);
    }
  };

  return (
    <>
      <Search>
        <SearchIconWrapper>
          {isSearching ? <CircularProgress color="primary" size={18} /> : <SearchIcon />}
        </SearchIconWrapper>
        <Autocomplete
          // PopperComponent={(params) => <StyledPopper {...params} />}
          options={searchTotalList}
          noOptionsText={'No Data Found'}
          loading={isSearching}
          classes={{ paper: classes.paper }}
          getOptionLabel={(option) => {
            if (option?.type === 'STOCK') {
              return option?.name + ' ' + option?.fullName;
            }
            return option?.name;
          }}
          onInputChange={(event, newInputValue) => {
            onInputChange(newInputValue);
          }}
          PaperComponent={CustomPaper}
          onChange={(event, newValue) => {
            onItemSelect(newValue);
          }}
          inputValue={searchText}
          renderOption={(props, option) => (
            <Box
              onClick={(e) => {
                goScreenStock(option);
              }}
            >
              <Box component="li" {...props}>
                <Iconify
                  icon={'akar-icons:arrow-up-right'}
                  color="theme.palette.text.primary"
                  width={15}
                  sx={{ marginRight: '10px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      borderRadius: '2px',
                      maxWidth: 'fit-content',
                      border: '1px solid #DFE3E8',
                      p: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography style={{ fontSize: '7px', color: '#212B36', fontWeight: 500 }}>
                      {' '}
                      {option?.type}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '12px', color: 'black' }}>
                    {' '}
                    {option?.name} &emsp; {option?.fullName}{' '}
                  </Typography>
                </div>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <StyledInputBase
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              placeholder="Search for Stocks, Indicators, Pattern screeners"
              // endAdornment={
              //   <React.Fragment>
              //     {isSearching ? <CircularProgress size={18} /> : null}
              //     {params.InputProps.endAdornment}
              //   </React.Fragment>
              // }
            />
          )}
        />
      </Search>
    </>
  );
}

export default DesktopSearchbar;
