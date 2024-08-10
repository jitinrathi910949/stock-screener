import PropTypes from 'prop-types';
// guards
import AuthGuard from '../guards/AuthGuard';
// components
// import MainLayout from './main';
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';
import ScreenerLayout from './screener-layout';
import ProfileLayout from './profile';
import StocksLayout from './stocks';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly']),
};

export default function Layout({ variant = 'dashboard', children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === 'screener') {
    return (
      <DashboardLayout>
        <ScreenerLayout>{children}</ScreenerLayout>
      </DashboardLayout>
    );
  }

  if(variant === 'stocks') {
    return (
      <DashboardLayout>
        <StocksLayout>{children}</StocksLayout>
      </DashboardLayout>
    )
  }

  if (variant === 'profile') {
    return <ProfileLayout>{children}</ProfileLayout>;
  }

  return (
    // <AuthGuard>
    <DashboardLayout> {children} </DashboardLayout>
    // </AuthGuard>
  );
}
