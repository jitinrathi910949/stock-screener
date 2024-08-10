import { AppBar, Toolbar, Typography } from '@mui/material';

const getCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear;
};
function Footer(props) {
  return (
    <AppBar color="primary" position="relative" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ minHeight: '36px !important' }}>
        <Typography sx={{ margin: 'auto', fontSize: '12px', fontWeight: 600, color: 'white' }}>
          Copyright © {getCurrentYear()} Findscan.net
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Footer;
