import { useSnackbar } from 'notistack';
import { useState, useRef } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Button } from '@mui/material';
// routes
import { PATH_AUTH, PATH_PROFILE } from 'routes/paths';
// hooks
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
// components
import MyAvatar from 'components/MyAvatar';
import MenuPopover from 'components/MenuPopover';
import { IconButtonAnimate } from 'components/animate';

import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: PATH_PROFILE.user,
  },
  {
    label: 'Your Screeners',
    icon: 'octicon:graph-24',
    linkTo: PATH_PROFILE.screener,
  },
  {
    label: 'Your Alerts',
    icon: 'ic:baseline-notifications-active',
    linkTo: PATH_PROFILE.alert,
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const anchorRef = useRef(null);
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate.replace('/');
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  const onBtSignin = () => {
    navigate.push(PATH_AUTH.login);
  };

  return (
    <>
      {isAuthenticated ? (
        <IconButtonAnimate
        ref={anchorRef}
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <MyAvatar />
        </IconButtonAnimate>
      ) : (
        <Button noWrap size="small" onClick={onBtSignin} fullWidth color="inherit" variant="outlined">
          Sign In
        </Button>
      )}

      <MenuPopover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        sx={{
          width: 220,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <NextLink key={option.label} href={option.linkTo} passHref>
            <MenuItem key={option.label} onClick={handleClose} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          </NextLink>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
