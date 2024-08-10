import { Box, Typography, Grid } from '@mui/material';

import FooterLogo from '../../components/FooterLogo';
import FooterBanner from '../../components/FooterBanner';
import { styled } from '@mui/material/styles';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navItemBox: {
    paddingTop: 10,
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'Poppins',
    cursor: 'pointer',
    '&:hover': {
      color: 'black'
    }
  },
  subtitle: {
    color: '#2C3760',
    fontSize: '14px',
    lineHeight: '19px',
    marginTop: 10,
    fontFamily: 'Poppins'
  }
  // navItemLinks: {
  //   fontWeight: '500',
  //   fontSize: 15,
  //   lineHeight: 15,
  //   fontFamily: 'poppins',
  //   color: '#2C3760'
  // }
}));
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    maxWidth: '83vw',
    margin: 'auto',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  [theme.breakpoints.down('md')]: {
    padding: '24px 16px'
  }
}));

const navFooterItems = [
  {
    key: 'foooternav1',
    route: '/scan',
    name: 'Home',
    icon: '/assets/icon/nav-icon/stock.svg'
  },
  {
    key: 'foooternav1',
    route: '/scan',
    name: 'Products',
    icon: '/assets/icon/nav-icon/stock.svg'
  },
  {
    key: 'foooternav1',
    route: '/scan',
    name: 'Company',
    icon: '/assets/icon/nav-icon/stock.svg'
  },
  {
    key: 'foooternav1',
    route: '/scan',
    name: 'Blog',
    icon: '/assets/icon/nav-icon/stock.svg'
  }
];

const navItems = [
  {
    key: 'nav1',
    route: '/scan',
    name: 'Stock Screener',
    icon: '/assets/icon/nav-icon/stock.svg'
  },
  {
    key: 'nav2',
    route: '/scan',
    name: 'Forex Screener',
    icon: '/assets/icon/nav-icon/$.svg'
  },
  {
    key: 'nav3',
    route: '/scan',
    name: 'Crypto Screener',
    icon: '/assets/icon/nav-icon/bitcoin.svg'
  }
];

function FooterNav() {
  const classes = useStyles();
  return (
    <RootStyle>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <FooterLogo as="div" />
          <Typography as="div" className={classes.subtitle}>
            Stocks, Indicators, Pattern screeners all at one place
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ margin: { md: 'auto', lg: 'auto' } }}>
              {navFooterItems.map((item) => (
                <Box to={item.route} className={classes.navItemBox} key={item.key}>
                  {item.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ margin: 'auto' }}>
              {navItems.map((item) => (
                <Box to={item.route} className={classes.navItemBox} key={item.key}>
                  {item.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Box
            component="img"
            src="/assets/img/trypremium.png"
            sx={{ height: { xs: 'auto', sm: 'auto', md: '92px' } }}
          />
        </Grid>
      </Grid>
    </RootStyle>
  );
}
export default FooterNav;
