import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';

const LINES_TO_SHOW = 1;
const useStyles = makeStyles({
  limitText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical"
  }
});

export default function NewsPanel(props) {
  const { screenerData } = props
  const [description, setDescription] = useState("");
  const [screenerName, setScreenerName] = useState("");

  const classes = useStyles();

  useEffect(() => {
    setDescription(props?.screenerData?.description)
    setScreenerName(props?.screenerData?.screenerName)

  }, [props])
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        minHeight: '61px',
        padding: '8px 14px 11px',
        flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' },
        backgroundColor: '#F2F4F9',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeft: '3px solid #3F6DC7',
        borderRadius: '2px 0px 0px 2px',
        marginTop: '12px',
        cursor: 'pointer'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column',
          maxWidth: '167px'
        }}
      >
        <Typography
          className={classes.limitText}
          sx={{ fontSize: '12px', color: '#4F4F4F', fontWeight: 600, lineHeight: '16px', marginBottom: '5px', overflow: 'hidden' }}
        >
          {screenerName ? screenerName : "Intraday Candle1"}
        </Typography>
        {/* <Typography className={classes.limitText} sx={{ fontSize: '9px', color: '#828282', fontWeight: 500, lineHeight: '10px' }}>
          {description ? description : "hello thus is your intraday Candle"}

        </Typography> */}
      </Box>
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column'
          }}
        >

        </Box>
        <Divider style={{ height: '42px', position: 'absolute', right: '75px' }} orientation={"vertical"} flexItem />

        <Box>
          <Typography
            sx={{ fontSize: '14px', color: '#828282', fontWeight: 600, lineHeight: '16px', marginBottom: '3px' }}
          >
            50+
          </Typography>
          <Typography sx={{ fontSize: '9px', color: '#828282', fontWeight: 500, lineHeight: '10px' }}>
            Likes{' '}
          </Typography>
        </Box>
        {/* <Box
          sx={{
            //   borderLeft: '1px solid #3F6DC7',
            //   opacity: '0.2',
            //   height: '61px',
            width: '10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MoreVertIcon sx={{ color: '#828282', fontSize: '20px' }} />
        </Box> */}
        {/* <Box
          sx={{
            // borderLeft: '1px solid #3F6DC7',
            backgroundColor: '#3F6DC7',
            opacity: '0.2',
            height: '60px',
            width: '1px',
            position: 'absolute',
            marginLeft: { lg: '78%', md: '75%' },
            marginTop: '2px'
          }}
        /> */}
      </>
    </Paper>
  );
}
