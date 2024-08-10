import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScreenerByUserApi } from 'redux/screener/screenerApi';
import Layout from 'layouts';
import ManageScreener from 'sections/manage-screener/ManageScreener';

function ManageScreenerPage() {
  const dispatch = useDispatch();
  const { screenerList } = useSelector(({ screenerReducer }) => screenerReducer);

  useEffect(() => {
    dispatch(getScreenerByUserApi());
  }, []);

  return <ManageScreener />;
}

ManageScreenerPage.getLayout = function getLayout(page) {
  return <Layout variant="profile">{page}</Layout>;
};

export default ManageScreenerPage;
