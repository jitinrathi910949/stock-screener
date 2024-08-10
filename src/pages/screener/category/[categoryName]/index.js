import React, { useEffect } from 'react';
import Layout from 'layouts';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import { screenerAction } from 'redux/screener/screenerSlice';
import { getScreenerByCategoryApi, getAllCategoryApi } from 'redux/screener/screenerApi';
import Category from 'sections/category';
import _ from 'lodash';

function ScreenerData() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { categoryName } = router.query;
  const { categoryList = [] } = useSelector(({ screenerReducer }) => screenerReducer);


  useEffect(() => {
    if (_.isEmpty(categoryList)) {
      dispatch(getAllCategoryApi());
    }
  }, []);

  useEffect(() => {
    console.log('categoryName is', categoryName);
    if (categoryName !== '[categoryName]' && !_.isEmpty(categoryList)) {
      const catName = _.find(categoryList, cat => cat?.slug === categoryName);
      dispatch(getScreenerByCategoryApi({ categoryName: catName?.categoryName }));
    }
  }, [categoryName]);
  return <Category />;
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
