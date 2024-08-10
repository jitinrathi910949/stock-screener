import React, { useEffect } from 'react';
import Layout from 'layouts';
import NewScreener from 'sections/screener/new-screener';
import { useDispatch } from 'react-redux';
import { screenerAction } from 'redux/screener/screenerSlice';

NewScreenerPage.getLayout = function getLayout(page) {
  return <Layout variant="screener">{page}</Layout>;
};

export default function NewScreenerPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(screenerAction.resetSelectedScreener());
  }, [dispatch]);
  return <NewScreener />;
}
