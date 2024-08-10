import React from 'react';

import { Grid, Stack, MenuItem, Paper, Typography, Select } from '@mui/material';
import ColorButton from '../../../components/ColorButton';
import SingleToggleButton from '../../../components/SingleToggleButton';
import FilterSelect from '../../../components/filter-select';
import { makeStyles } from '@mui/styles';

import FilterButton from './FilterButtons';

const styles = (theme) => ({
  singleButtonBox: {
    alignItems: 'center',
    flexDirection: ' center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexWrap: ' wrap',
      marginBottom: '10px',
    },
  },
});

const Package = [
  { code: 'tackage2', label: 'Package 2', value: 'package2' },
  { code: 'package1', label: 'Package 1', value: 'package1' },
  { code: 'package2', label: 'Package 2', value: 'package2' },
  { code: 'package2', label: 'Package 3', value: 'package3' },
];
const NavbarLabels = [
  { label: 'Overview', value: 'overview' },
  { label: 'Performance', value: 'performance' },
  { label: 'Extended', value: 'extended' },
  { label: 'hours', value: 'hours' },
  { label: 'Valuation', value: 'valuation' },
  { label: 'Dividends', value: 'dividends' },
  { label: 'Margins', value: 'margins' },
  { label: 'Income', value: 'income' },
  { label: 'statement', value: 'statement' },
  { label: 'Balance', value: 'balance' },
  { label: 'sheet', value: 'sheet' },
];
export default function FilterBanner() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Paper
        // scroll="paper"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          flex: 1,
          mx: { md: 2 },
          minHeight: 48,
          borderRadius: 0.5,
          justifyContent: 'space-between',
          alignItems: 'center',
          // overflowX: 'scroll',
          // scrollBehavior: 'smooth',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            flexDirection: ' row',
            display: 'flex',
            marginBottom: '10px',
            maxWidth: { xs: '80vw', sm: '80vw', md: '50vw' },
            overflowX: 'scroll',

            MsOverflowStyle: 'none' /* Internet Explorer 10+ */,
            scrollbarWidth: 'none' /* Firefox */,

            '::-webkit-scrollbar': {
              display: 'none' /* Safari and Chrome */,
            },
          }}
        >
          {NavbarLabels.map((nav, ind) => (
            <div key={`singleToggleButton${ind}`}>
              <SingleToggleButton label={nav.label} />
            </div>
          ))}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', flexDirection: ' center', marginBottom: '10px' }}
        >
          <Typography as="body1" noWrap>
            Search for instruments:
          </Typography>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            size="small"
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>S&P 500</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

          {/* <ColorButton sx={{ paddingX: 3 }}>Save</ColorButton> */}
        </Stack>
      </Paper>
    </>
  );
}
