import NextLink from 'next/link';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import Logo from '../../components/Logo';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { MHidden, MIconButton } from '../../components/@material-extend';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, InputBase, Button } from '@mui/material';
import AccountPopover from '../dashboard/AccountPopover';
import NotificationsPopover from '../dashboard/NotificationsPopover';
import { PATH_SCREENER } from 'routes/paths';

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  zIndex: theme.zIndex.drawer + 1
  // backgroundColor: '#191753'
}));

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 68;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    maxWidth: '90vw',
    margin: 'auto'
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '41ch'
    }
  }
}));

const useStyles = makeStyles((theme) => ({
  navItemBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
    padding: '0 12px',
    textDecoration: 'none',
    '&:hover': {
      opacity: 1
    }
  },
  navItemName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#F5F5F5'
  }
}));

const navItems = [
  {
    key: 'nav1',
    route: PATH_SCREENER.root,
    name: 'Stock Screener',
    icon: 'octicon:graph-24',
    active: true
  },
  {
    key: 'nav2',
    route: '/scan',
    name: 'Forex Screener',
    icon: 'bx:bx-dollar'
  },
  {
    key: 'nav3',
    route: '/scan',
    name: 'Crypto Screener',
    icon: 'cib:bitcoin'
  }
];

export default function ProfileNavbar({ onOpenSidebar }) {
  const classes = useStyles();

  return (
    <RootStyle position="fixed">
      <ToolbarStyle>
        <MHidden width="mdUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'white' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        <Logo sx={{ marginRight: '8px' }} />

        <MHidden width="mdDown">
          {navItems.map((item) => (
            <Box
              component={NextLink}
              to={item.route}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: item?.active ? 1 : 0.4,
                padding: '0 12px',
                textDecoration: 'none',
                '&:hover': {
                  opacity: 1
                }
              }}
              key={item.key}
            >
              {/* <Box component="img" src={item.icon} sx={{ height: '24px', width: '27px' }} /> */}
              <Icon icon={item.icon} style={{ fontSize: '24px', color: 'white' }} />
              <Typography noWrap className={classes.navItemName}>
                {item.name}
              </Typography>
            </Box>
          ))}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Stocks, Indicators, Pattern screeners"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Button
            color="secondary"
            variant="contained"
            size="small"
            sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
            startIcon={<AddIcon />}
          >
            New screener
          </Button>
        </MHidden>
        {/* <Box component={RouterLink} to="/"> */}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover /> */}

          <NotificationsPopover />
          {/* <ContactsPopover /> */}
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
