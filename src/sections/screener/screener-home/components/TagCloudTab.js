import { Paper, Grid, Typography, Box, Stack, Card, Button } from '@mui/material';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getActivesApi, getProfileApi } from 'redux/fundamentals/stockApi';
import { TagCloud } from 'react-tagcloud';
import { PATH_STOCK } from 'routes/paths';

const TagCloudTab = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const fundamental = useSelector((state) => state.fundamentalsReducer);
  const { actives, isLoading } = fundamental;
  useEffect(() => {
    dispatch(getActivesApi());
  }, []);
  const [data, setData] = useState([]);
  // const options = {
  //   // luminosity: 'light',
  //   hue: '#2c3760',
  // }
  const goScreenStock = (data) => {
    router.push(`${PATH_STOCK.root}/${data.value}`);
  };

  useEffect(() => {
    let arr = [];
    actives &&
      actives.map((data, key) => {
        arr.push({
          value: data?.ticker,
          count: key < 10 ? 35 - Number(key) * 2 : 10,
          color: '#2c3760',
          props: {
            style: {
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          },
        });
      });
    setData(arr);
  }, [actives]);

  return data ? (
    // <>
    <TagCloud
      minSize={10}
      maxSize={35}
      tags={data}
      // style={{ cursor: "pointer" }}
      className="myTagCloud"
      onClick={(tag) => goScreenStock(tag)}
      // colorOptions={options}
      disableRandomColor={true}
    />
  ) : (
    <div />
  );
};
export default TagCloudTab;
