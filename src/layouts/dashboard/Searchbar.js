import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import searchFill from '@iconify/icons-eva/search-fill';
import backFill from '@iconify/icons-eva/arrow-ios-back-outline';
import CircularProgress from '@mui/material/CircularProgress';

// material
import { styled, alpha } from '@mui/material/styles';
import { Box, Input, Slide, Button, InputAdornment, ClickAwayListener, IconButton } from '@mui/material';
import { ROOTS_SEARCH } from 'routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from 'redux/common/commonSlice';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  // backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------
let initCount = 0;
export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const prevPath = useRef(null);
  const router = useRouter();
  const { pathname } = router;
  const { searchText } = router.query;
  const { isSearching } = useSelector(({ commonReducer }) => commonReducer);

  useEffect(() => {
    if (pathname === '/search') {
      setOpen(true);
    } else {
      setOpen(false);
      initCount = 0;
    }
    if (initCount === 0) {
      prevPath.current = pathname;
      ++initCount;
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    router.push(ROOTS_SEARCH);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (value) => {
    router.query.searchText = value;
    dispatch(commonAction.setSearchText(value));

    router.push(router);
  };

  const onBtBack = () => {
    router.replace(prevPath.current);
  };

  return (
    // <ClickAwayListener onClickAway={handleClose}>
    <div>
      {!isOpen && (
        <IconButton onClick={handleOpen} color="default">
          <Icon icon={searchFill} width={20} height={20} />
        </IconButton>
      )}

      <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
        <SearchbarStyle>
          <Input
            autoFocus
            value={searchText}
            fullWidth
            disableUnderline
            onChange={({ target: { value } }) => handleInputChange(value)}
            placeholder="Search for Stocks, Indicators, Pattern screeners"
            startAdornment={
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={backFill}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  onClick={onBtBack}
                />
              </InputAdornment>
            }
            sx={{ mr: 1, fontWeight: 'fontWeightBold', color: 'white' }}
          />
          {isSearching ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          )}
        </SearchbarStyle>
      </Slide>
    </div>
    // </ClickAwayListener>
  );
}
