import {
  Paper,
  Typography,
  Stack,
  ListItemButton,
  ListSubheader,
  List,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import _ from 'lodash';
import { PATH_STOCK } from 'routes/paths';
import { useRouter } from 'next/router';


const RootStyle = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  height: '100%',
  width: '100%',
}));
const searchList = [
  { title: 'Reliance Industries' },
  { title: 'Nifty Bank Index' },
  { title: 'SBI Small Cap Fund' },
  { title: 'Kotak Nifty ETF' },
  { title: 'KitKat' },
  { title: 'Nifty Bank Index' },
  { title: 'SBI Small Cap Fund' },
  { title: 'Kotak Nifty ETF' },
  { title: 'KitKat' },
];

// let urlInfor = '';
// if (typeof window !== 'undefined') {
//   urlInfor = window.location.origin + '/stock/';
// }


const SearchMenuList = (props) => {
  const { mainSearchList, onItemSelect } = props;
  const router = useRouter();

  return (
    <RootStyle>
      <List sx={{ width: '100%', height: '100%' }} component="nav">
        {_.isEmpty(mainSearchList)
          ? searchList.map((opt) => (
              <ListItemButton
              onClick={(e) => {
                e.preventDefault();
                onItemSelect(option);
                router.push(`${PATH_STOCK.root}/${option?.name}`);

                // window.location.href = urlInfor + '' + option.name;
                }}

              >
                <ListItemIcon>
                  <Iconify
                    icon={'akar-icons:arrow-up-right'}
                    color="theme.palette.text.primary"
                    width={15}
                    sx={{ marginRight: '10px' }}
                  />
                </ListItemIcon>
                <ListItemText primary={opt.title} />
              
              </ListItemButton>
            ))
          : mainSearchList.map((option) => (
              <ListItemButton 
              onClick={(e) => {
                e.preventDefault();
                onItemSelect(option);
                router.push(`${PATH_STOCK.root}/${option?.name}`);

                // window.location.href = urlInfor + '' + option.name;
                }}

              >
                <ListItemIcon>
                  <Iconify
                    icon={'akar-icons:arrow-up-right'}
                    color="theme.palette.text.primary"
                    width={15}
                    sx={{ marginRight: '10px' }}
                  />
                </ListItemIcon>
                {/* <ListItemText primary={opt.title} /> */}
                <Box>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        borderRadius: '2px',
                        maxWidth: 'fit-content',
                        border: '1px solid #DFE3E8',
                        p: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography style={{ fontSize: '7px', color: '#212B36', fontWeight: 500 }}>
                        {' '}
                        {option.type}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: 'black' }}> {option?.name} &emsp; {option?.fullName}</Typography>
                  </div>
                </Box>
              </ListItemButton>
            ))}
      </List>
    </RootStyle>
  );
};
export default SearchMenuList;
