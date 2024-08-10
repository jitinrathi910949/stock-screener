import PropTypes from 'prop-types';
import React from 'react';
import NextLink from 'next/link';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, InputBase, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';

// components
//

import { MHidden, MIconButton } from '../../components/@material-extend';
import Logo from '../../components/Logo';
import { PATH_SCREENER } from '../../routes/paths';
import Searchbar from './Searchbar';
import NotificationsPopover from './NotificationsPopover';
import AccountPopover from './AccountPopover';
import EmailVerify from './EmailVerify';
import DesktopSearchbar from './DesktopSearchbar';

// ----------------------------------------------------------------------
const COLLAPSE_WIDTH = 102;
const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // backgroundColor: '#191753'
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    maxWidth: '90vw',
    margin: 'auto',
  },
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
      opacity: 1,
    },
  },
  navItemName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#F5F5F5',
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

const navItems = [
  {
    key: 'nav1',
    route: PATH_SCREENER.root,
    name: 'Stock Screener',
    icon: 'octicon:graph-24',
    active: true,
  },
  {
    key: 'nav2',
    route: '/scan',
    name: 'Forex Screener',
    icon: 'bx:bx-dollar',
  },
  {
    key: 'nav3',
    route: '/scan',
    name: 'Crypto Screener',
    icon: 'cib:bitcoin',
  },
];

export default function DashboardNavbar({ onOpenSidebar }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setBackLoading, user, resendEmail } = useAuth();
  const classes = useStyles();

  const onBtResend = async () => {
    try {
      const res = await resendEmail();
      if (res.data) {
        enqueueSnackbar('Resend verification email successfully', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      }
    } catch (err) {
      console.log('found error while sending email', err);
    }
  };

  return (
    <>
      <RootStyle position="fixed">
        {user?.status === 'NOT_VERIFIED' && <EmailVerify onBtResend={onBtResend} />}
        <ToolbarStyle>
          <MHidden width="mdUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'white' }}>
              <Icon icon={menu2Fill} />
            </IconButton>
          </MHidden>
          <NextLink href="/" passHref>
            <Box>
              <Logo sx={{ marginRight: '8px', cursor: 'pointer' }} />
            </Box>
          </NextLink>

          <MHidden width="mdDown">
            {navItems.map((item, ind) => (
              <NextLink href={item.route} key={`${ind}_mainRoute`}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: item?.active ? 1 : 0.4,
                    padding: '0 12px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  key={item.key}
                >
                  {/* <Box component="img" src={item.icon} sx={{ height: '24px', width: '27px' }} /> */}
                  <Icon icon={item.icon} style={{ fontSize: '24px', color: 'white' }} />
                  <Typography noWrap className={classes.navItemName}>
                    {item.name}
                  </Typography>
                </Box>
              </NextLink>
            ))}

            <DesktopSearchbar />

            <NextLink href={PATH_SCREENER.newScreener}>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
                startIcon={<AddIcon />}
              >
                New screener
              </Button>
            </NextLink>
          </MHidden>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            {/* <LanguagePopover /> */}
            <MHidden width="mdUp">
              <Searchbar />
            </MHidden>
            <NotificationsPopover />
            {/* <ContactsPopover /> */}
            <AccountPopover />
          </Stack>
        </ToolbarStyle>
      </RootStyle>
    </>
  );
}
