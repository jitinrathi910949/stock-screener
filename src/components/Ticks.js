import { Box, Divider, Stack, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '46px',
  width: '160px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '4px 16px',
}));
export default function Ticks(props) {
  // const {name, price, priceVariationPer, priceVariationRup} =props;
  return (
    <RootStyle>
        <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', flex: 1 }}>
        <Typography
          as="div"
          sx={{
            color: '#302F42',
            fontSize: '10px',
            lineHeight: '15px',
            fontWeight: 400,
            fontFamily: 'Poppins',
            width: '50%',
            textAlign: 'center',
          }}
        >
          DOW
        </Typography>
        <Typography as="div" sx={{ ml: 1, fontSize: '10px', color: '#302F42', fontWeight: 400, fontFamily: 'Poppins' }}>
          3647.5
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ padding: 0 }}>
        <Stack direction="row">
          <Box as="img" src="/assets/fund-page/historicalTab-img/arrowDown.svg" />
          <Typography sx={{ ml: 1, fontSize: '16px', color: '#F14B47', fontWeight: 500, fontFamily: 'Poppins' }}>
            0.62%
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            as="div"
            sx={{ ml: 1, fontSize: '10px', color: '#F14B47', fontWeight: 400, fontFamily: 'Poppins' }}
          >
            16.0
          </Typography>
        </Box>
      </Stack>
      </Box>
      <Box sx={{ backgroundColor: '#E7EDF9', height: '70%',mt:'3px',ml:'90%', width: '1px', position: 'absolute', mr:0 }} />
    </RootStyle>
  );
}
