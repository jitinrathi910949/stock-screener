import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(() => ({
  color: '#3ECBEC',
  borderRadius: '2px',
  backgroundColor: 'rgba(62, 203, 236, .1)',
  '&:hover': {
    backgroundColor: 'rgba(62, 203, 236, .3)'
  }
}));

export default ColorButton;
