import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Stack,
  Grid,
} from '@mui/material';
import _ from 'lodash';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useResponsive from 'hooks/useResponsive';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/router';
import { getStockNewsApi } from 'redux/fundamentals/stockApi';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';

export default function News(props) {
  const isDesktop = useResponsive('up', 'md');
  const router = useRouter();
  const dispatch = useDispatch();

  const { stockId } = router.query;

  const { tickerNews = [] } = useSelector(({ stockReducer }) => stockReducer);
  const shortTickerNews = !_.isEmpty(tickerNews) && _.chunk(tickerNews, 3)[0];
  const fundamental = useSelector((state) => state.fundamentalsReducer);

  const { stockNews } = fundamental

  useEffect(() => {
    dispatch(getStockNewsApi({ ticker: stockId }));
  }, [])
  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '20px', color: '#302F42', lineHeight: '30px', fontWeight: 600 }}
        >
          News
        </Typography>
        {isDesktop && (
          <Stack
            direction="row"
            sx={{ alignItems: 'center', cursor: 'pointer' }}
            onClick={() => router.push(`${router.query?.stockId}/news`)}
          >
            <Typography sx={{ fontSize: '12px', color: '#3886FA', fontWeight: 500 }}>See all news</Typography>
            <ChevronRightIcon sx={{ fontSize: '14px', color: '#3886FA' }} />
          </Stack>
        )}
      </Stack>

      <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}>
        {stockNews &&
          stockNews.slice(0,10)?.map((val) => {
            const { site , title, image, publishedDate,url, text } = val;
            // const publisherName = publisher?.name;
            const publishedOn = publishedDate && moment(publishedDate)?.fromNow();
            return (
              <>
                <Stack direction="row">
                  <Box component="img" src={image} sx={{ maxWidth: { xs: '100px', lg: '200px' }, maxHeight: "100px", width: 'auto' }} />
                  <Stack sx={{ paddingLeft: '20px' }}>
                    <Stack direction="row">
                      <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px' }}>
                        {site}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#302F42', lineHeight: '18px', pl: '18px' }}>
                        {publishedOn}
                      </Typography>
                    </Stack>
                    <Link href={url} sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px', fontWeight: 700 }}>
                      {title}
                    </Link>
                    <Typography sx={{ fontSize: '14px', color: '#302F42', lineHeight: '20px' }}>
                      {text}
                    </Typography>
                  </Stack>
                </Stack>
              </>
            );
          })}
      </Stack>

      {!isDesktop && (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', mt: 3 }}>
          <Typography sx={{ fontSize: '12px', color: '#3886FA', fontWeight: 500 }}>See all news</Typography>
          <ChevronRightIcon sx={{ fontSize: '14px', color: '#3886FA' }} />
        </Stack>
      )}
    </Box>
  );
}
