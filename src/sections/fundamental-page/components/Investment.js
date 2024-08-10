import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { color } from '@mui/system';


const checklist = [
  {
    key: 'permission1',
    imageSrc: '/assets/fund-page/plus.svg',
    priText: 'Intrinsic Value',
    secText: 'Current price is less than the intrinsic value',
  },
  {
    key: 'permission2',
    imageSrc: '/assets/fund-page/plus.svg',
    priText: 'Returns vs FD rates',
    secText: 'Stock has been generating better return on equity than bank FD',
  },
  {
    key: 'permission3',
    imageSrc: '/assets/fund-page/minus.svg',
    priText: 'Dividend Returns',
    secText: "Stock doesn't offer attractive dividend returns",
  },
  {
    key: 'permission4',
    imageSrc: '/assets/fund-page/plus.svg',
    priText: 'Entry Point',
    secText: 'Good time to consider, as stock is not in overbought zone',
  },
  {
    key: 'permission5',
    imageSrc: '/assets/fund-page/plus.svg',
    priText: 'No Red Flags',
    secText: 'Stock not in ASM/GSM lists, not a lot of promoter holding is pledged and default probability is low',
  },
];

export default function Investment(props) {
  const { imageSrc, primaryText, secondaryText } = props;
  return (
    <>
    <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#302F42', mt: '30px' }}>
    {' '}
    Investment Checklist
    </Typography>
   
        <List sx={{ width: '100%', py: 0, mt: '20px' }}>
            {checklist.map((per) => (
               <>    
      <ListItem alignItems="flex-start" sx={{px: '0 !important'}}>
        <ListItemIcon sx={{ color: 'black' }}>
        <Box component="img" src={per.imageSrc} />
        </ListItemIcon>
        <ListItemText
          primary={per.priText}
          primaryTypographyProps={{
            fontSize: '14px',
            fontWeight: 700,
            color:'#302F42',
            lineHeight:'21px'
          }}
          secondary={per.secText}
          secondaryTypographyProps={{
            fontSize: '14px',
            color:'#302F42',
            lineHeight:'20px',
         }}
        />
      </ListItem>
      </>
       ))}
      </List>

      </>
  );
}