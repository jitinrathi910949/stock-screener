import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemIcon,Stack ,Grid} from '@mui/material';


const advisory = [
    {
      priText: 'Technology',
      secText: 'Technology – consumer electronics',
      imageSrc: '/assets/fund-page/overviewTab-img/Techno.svg',
    },
    {
      priText: 'Largecap',
      secText: 'With a market cap of 121,78 bil stock is ranked 1',
      imageSrc: '/assets/fund-page/overviewTab-img/cap.svg',
    },
    {
      priText: 'Low risk',
      secText: 'ISS score of this stock is ranked 1',
      imageSrc: '/assets/fund-page/overviewTab-img/Frame.svg',
    },
  ];
export default function KeyData(props) {

    return (
        <Stack spacing={1} container sx={{mt: '30px'}}>
        <Grid container  direction="row" sx={{justifyContent: 'space-between'}} >
        {advisory.map((opt) => (
          <>
            <Grid
            xs={12}
            sm={12}
            md={3.8}
            lg={3.8}
              item
              direction="row"
              spacing={1}
              sx={{
                height: '94px',
                width: '228px',
                border: '1px solid #E7EDF9',
                padding: '20px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Box component="img" src={opt.imageSrc} sx={{ pt: '3px' ,width:'16px'}} />
              <Stack sx={{ padding: 0, ml: 1 }}>
                <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', fontWeight: 600 }}>
                  {opt.priText}
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#302F42', lineHeight: '18px', fontWeight:500 }}>{opt.secText}</Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
      </Stack>
    )
}