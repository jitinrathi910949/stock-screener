import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

FooterLogo.propTypes = {
  sx: PropTypes.object
};

export default function FooterLogo({ sx }) {
  return <Box component="img" src="/footerLogo.svg" sx={{ height: '23px', ...sx }} />;
}
