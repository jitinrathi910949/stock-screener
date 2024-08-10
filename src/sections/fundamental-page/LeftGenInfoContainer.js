import { Paper, Grid, Typography, Box, Stack, List, Button } from '@mui/material';
import AppleComponent from './tabs/overview-tab/AppleComponent';
import Investment from './components/Investment';

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

function LeftGenInfoContainer(props) {
  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: '340px',
        maxWidth: '340px',
        height: 'max-content',
        padding: '30px',
        position: 'sticky',
        top: '80px',
      }}
    >
      {/* <StickyBox> */}
      <AppleComponent />
      {/* <List sx={{ width: '100%', py: 0, mt: '20px' }}> */}
        {/* {checklist.map((per, ind) => ( */}
        <Investment
          // key={`${ind}-investKey`}
          // imageSrc={per.imageSrc}
          // secondaryText={per.secText}
          // primaryText={per.priText}
        />
        {/* ))} */}
      {/* </List> */}
      {/* </StickyBox> */}
    </Paper>
  );
}

export default LeftGenInfoContainer;
