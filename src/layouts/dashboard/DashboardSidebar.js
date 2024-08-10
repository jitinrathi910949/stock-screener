import PropTypes from 'prop-types';
import { useEffect } from 'react';
import NextLink from 'next/link';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Stack, Button, Drawer, Tooltip, Typography, CardActionArea, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

// hooks
import useAuth from '../../hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// routes
// import { PATH_DASHBOARD } from 'routes/paths';
// components
import Logo from '../../components/Logo';
import MyAvatar from '../../components/MyAvatar';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = '100%';
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useRouter();
  const { user } = useAuth();

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center',
          }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <NextLink href="/">
            <Box sx={{ display: 'inline-flex' }}>
              <Logo />
            </Box>
          </NextLink>

          <IconButton onClick={() => onCloseSidebar()}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Stack>

        {isCollapse ? (
          <MyAvatar sx={{ mx: 'auto', mb: 2 }} />
        ) : (
          // <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.user.account}>
          <AccountStyle>
            <MyAvatar />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'white' }}>
                {user?.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                {user?.role}
              </Typography>
            </Box>
          </AccountStyle>
          // </Link>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && (
        <Stack spacing={3} alignItems="center" sx={{ px: 2, pb: 5, mt: 10, width: '100%', textAlign: 'center' }}>
          {/* <DocIllustration sx={{ width: 1 }} /> */}

          {/* <div>
            <Typography gutterBottom variant="subtitle1">
              Hi, {user?.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Need help?
              <br /> Please check our docs
            </Typography>
          </div> */}
          <Button
            color="secondary"
            variant="contained"
            sx={{ whiteSpace: 'nowrap', minWidth: 'max-content', width: '100%' }}
            startIcon={<AddIcon />}
          >
            New screener
          </Button>
        </Stack>
      )}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
        backgroundColor: 'primary.main',
      }}
    >
      <MHidden width="mdUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, backgroundColor: 'primary.main' },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
