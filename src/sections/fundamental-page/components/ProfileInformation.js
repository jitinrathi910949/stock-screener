import { Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useResponsive from 'hooks/useResponsive';

const ProfileInformation = (props) => {
  const isDesktop = useResponsive('up', 'md');
  const router = useRouter();
  const dispatch = useDispatch();

  const { stockId } = router.query;

  const fundamental = useSelector((state) => state.fundamentalsReducer);

  const { profile } = fundamental
  const { description, address, city, phone, state, website, zip } = profile && profile[0] ? profile[0] : {}
  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: 'space-between', paddingLeft: { xs: '0px' }, paddingBottom: { xs: '10px' } }}
    >
      <Grid item sm={12} lg={9} md={9}>
        <Typography sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'poppins', color: '#302F42' }}>
          Company description
        </Typography>
        <Typography sx={{ textAlign: "justify", textJustify: "inter-word", mt: '20px', fontSize: '14px', fontWeight: 400, fontFamily: 'poppins', color: '#302F42', marginRight: isDesktop? "25px": "0" }}>
          {description}
        </Typography>
      </Grid>
      <Grid item sm={12} lg={3} md={3} sx={{ mt: { sm: 2, lg: 0, md: 0 } }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'poppins', color: '#302F42' }}>
          Contact info
        </Typography>
        <Typography sx={{ mt: '20px', fontSize: '14px', fontWeight: 400, fontFamily: 'poppins', color: '#302F42' }}>
          {address && `${address},${city} ${state} ${zip} ${phone}`}
        </Typography>
        <a style={{ textDecoration: 'none' }} href={website}>
          {website}
        </a>
      </Grid>
    </Grid >
  );
};
export default ProfileInformation;
