import * as React from 'react';
import { Paper, Grid, Typography, Box, Stack, Card, Button ,List} from '@mui/material';
import Investment from '../components/Investment';
import Divider from '@mui/material/Divider';


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



export default function Investementre() {
    return (
        <>
        <Box sx={{ width:{xl:'784px', lg:'784px', md:'784px', sm:'600px',xs:'300px',},}}>
        <Paper sx={{minHeight:''}}>
        <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#302F42',padding:'20px' }}>
            {' '}
            Investment Checklist
          </Typography>
          <Divider />
            <List sx={{ width: '100%', py: 0, mt: '20px' ,px:'20px',paddingBottom:'20px'}}>
            {checklist.map((per) => (
              <Investment imageSrc={per.imageSrc} secondaryText={per.secText} primaryText={per.priText} />
            ))}
          </List> 
        </Paper>
        </Box>   
</>

        );
    }