import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getScreenerByUserApi } from 'redux/screener/screenerApi';
import Layout from 'layouts';
import ManageAlert from 'sections/manage-alert/ManageAlert';

function ManageAlertPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScreenerByUserApi());
  }, [dispatch]);

  return  (
    <RootStyle title="Manage Alert | Find-Scan" elevation={2}>
      <ManageAlert />
    </RootStyle>
  );}

ManageAlertPage.getLayout = function getLayout(page) {
  return <Layout variant="profile">{page}</Layout>;
};

export default ManageAlertPage;
