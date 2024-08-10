import React, { useCallback, useEffect } from 'react';
import Layout from 'layouts';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
import SearchMenuList from './SearchMenuList';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { searchApi, searchExchangeApi } from 'redux/common/commonApi';
import { commonAction } from 'redux/common/commonSlice';
import searchTypeConst from 'utils/constants/searchTypeConst';
import { PATH_SCREENER } from 'routes/paths';
// import NewScreenerPage from './NewScreenerPage';
// import ScreenerHomePage from '';

const RootStyle = styled(Page)(() => ({
  // display: 'flex',
  // minHeight: '100%',
  // alignItems: 'center',
  // paddingTop: theme.spacing(15),
  // paddingBottom: theme.spacing(10)
}));

SearchPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function SearchPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { searchText = '' } = router?.query;
  const debounceFn = useCallback(_.debounce(handleSearch, 1000), []);
  const { searchList, searchExchangeList, isSearching } = useSelector(({ commonReducer }) => commonReducer);
  const searchTotalList = searchList.concat(searchExchangeList);

  useEffect(() => {
    if (searchText) {
      dispatch(commonAction.setSearching(true));
      dispatch(commonAction.setSearchText(searchText));
      debounceFn(searchText);
    }
  }, [searchText]);

  async function handleSearch(text) {
    dispatch(commonAction.setSearching(true));

    await dispatch(searchApi({ searchText: text }));
    if (text !== '') {
    await  dispatch(searchExchangeApi(text));
    }
    dispatch(commonAction.setSearching(false));

  }

  const onItemSelect = (option) => {
    if (option?.type === searchTypeConst.SCREENER) {
      router.push(`${PATH_SCREENER.root}/${option.slugUrl}`);
    }
  };

  return (
    <RootStyle title="Search" elevation={2}>
      <SearchMenuList mainSearchList={searchTotalList} onItemSelect={onItemSelect} />
    </RootStyle>
  );
}
