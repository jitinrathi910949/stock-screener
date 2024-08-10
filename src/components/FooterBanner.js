import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

FooterBanner.propTypes = {
  sx: PropTypes.object
};

export default function FooterBanner({ sx }) {
  return <Box component="img" src="/trypremium.png" sx={{ height: '92px', width: '329px', ...sx }} />;
}
