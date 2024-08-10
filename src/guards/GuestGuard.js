import PropTypes from 'prop-types';
import NextLink from 'next/link';

// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_SCREENER } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <NextLink href={PATH_SCREENER.root} />;
  }

  return <>{children}</>;
}
