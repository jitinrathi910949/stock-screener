import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
//
import { MHidden } from 'components/@material-extend';

import DashboardNavbar from './DashboardNavbar';
import Footer from './Footer';
import FooterNav from './FooterNav';
import DashboardSidebar from './DashboardSidebar';
import useResponsive from 'hooks/useResponsive';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  // overflow: 'hidden',
  // [theme.breakpoints.up('md')]: {
  //   maxWidth: '90vw',
  //   margin: 'auto'
  // }
}));

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  // overflow: 'auto',
  minHeight: '100%',
  maxWidth: '100vw',
  paddingTop: APP_BAR_MOBILE,
  // paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    // paddingTop: APP_BAR_DESKTOP
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2)
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'lg');

  return (
    <>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <MHidden width="mdUp">
          <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        </MHidden>
        <MainStyle>{children}</MainStyle>
      </RootStyle>
      <FooterNav />
      <Footer />
    </>
  );
}
