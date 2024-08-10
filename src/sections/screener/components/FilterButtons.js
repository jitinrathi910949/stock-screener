import React from 'react';

import { Grid, NativeSelect } from '@mui/material';

export default function FilterButton(props) {
  const { optionList, variant } = props;
  const [variants, setVariant] = React.useState(variant);
  return (
    <Grid sx={{ flex: 1, marginTop: '2px', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} lg={12}>
        <NativeSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{
            backgroundColor: 'white',
            padding: '2px 8px',
            height: '28px',
            flex: 1,
            flexGrow: 'inherit',
            fontFamily: 'inherit',
            fontSize: 12,
            color: '#828282'
          }}
          label="Marketplace"
          disableUnderline
          variant={variants ? `&{variants}` : 'standard'}
        >
          {optionList.map((opt) => (
            <option key={opt.code} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect>
      </Grid>
    </Grid>
  );
}
