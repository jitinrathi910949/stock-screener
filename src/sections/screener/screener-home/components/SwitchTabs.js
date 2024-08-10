import React from 'react';
import { styled } from '@mui/system';
import { Button, Box } from '@mui/material';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import NextLink from 'next/link';
import { PATH_SCREENER } from 'routes/paths';
import TagCloudTab from './TagCloudTab';
import YourScreener from '../YourScreener';
import MostPopular from '../MostPopular';


const Tab = styled(TabUnstyled)`
  //   font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 9px 12px 10px 13px;
  margin: 6px 6px;
  border: none;
  border-radius: 2px;
  color: #828282;
  display: flex;
  justify-content: center;

  &.${tabUnstyledClasses.selected} {
    background-color: white;
    color: #2c3760;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  max-width: 400px;
  max-height: 50px;
  background-color: #f2f4f9;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function UnstyledTabsCustomized() {
  return (
    <Box sx={{ width: '100%' }}>
      <TabsUnstyled defaultValue={1}>
        <TabsList>
          <Tab>Most popular</Tab>
          <Tab>Your screener</Tab>
          <Tab>Stocks in Focus</Tab>
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              display: { sm: 'none', xs: 'none', lg: 'flex', md: 'flex' },
              width: '25%',
              marginTop: '-35px',
            }}
          >
            <NextLink href={PATH_SCREENER.newScreener} passHref>
              <Button
                variant="contained"
                disableElevation
                // onClick={onSaveClick}
                sx={[
                  {
                    '&:hover': {
                      backgroundColor: 'rgba(0, 102, 204, .8)',
                    },
                    backgroundColor: 'secondary.main',
                    boxShadow: 'none',
                    position: 'absolute',
                  },
                ]}
              >
                New Screener
              </Button>
            </NextLink>
          </Box>
        </TabsList>
        <TabPanel value={0}>
          <MostPopular/>
        </TabPanel>
        <TabPanel value={1}>
          <YourScreener />
        </TabPanel>
        <TabPanel value={2}>
          <TagCloudTab sx={{ width: '100%' }} />
        </TabPanel>
      </TabsUnstyled>
    </Box>
  );
}
