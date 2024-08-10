import React, { useEffect } from 'react';
import Layout from 'layouts';
import { useRouter } from 'next/router';
import NewScreener from 'sections/screener/new-screener';
import { useDispatch } from 'react-redux';
// import { screenerAction } from 'redux/screener/screenerSlice';
import { getScreenerBySlugApi } from 'redux/screener/screenerApi';

function ScreenerData() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { screenerId } = router.query;

  useEffect(() => {
    console.log('screener id is', screenerId);
    if (screenerId !== '[screenerId]') dispatch(getScreenerBySlugApi({ slugUrl: screenerId }));
  }, [dispatch, screenerId]);
  return <NewScreener />;
}
ScreenerData.getLayout = function getLayout(page) {
  return <Layout variant="screener">{page}</Layout>;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}
export default ScreenerData;
