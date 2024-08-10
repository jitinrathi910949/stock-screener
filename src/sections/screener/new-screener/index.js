import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, Typography, Box, Button, TextField } from '@mui/material';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import Page from 'components/Page';
import useAuth from 'hooks/useAuth';
import randomColor from 'randomcolor';
import { useSelector, useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';

import { PATH_AUTH, PATH_SCREENER } from 'routes/paths';
import { unwrapResult } from '@reduxjs/toolkit';
import StockBanner from 'components/StockBanner';
import DialogAlert from 'components/DialogAlert';
import ResultsContainer from '../components/ResultsContainer';
import FilterNavbar from '../components/FilterNavbar';
import FilterPanel from '../components/FilterPanel';
import { screenerAction } from 'redux/screener/screenerSlice';
import FilterFooterButtons from '../components/FilterFooterButtons';
import FormScreenerScan from '../components/FormScreenerScan';
import FormScreenerAlert from '../components/FormScreenerAlert';
import GroupToggler from '../components/GroupToggler';
import ScreenerTitleAndDesc from '../components/ScreenerTitleAndDesc';
import {
  getScreenerBySlugApi,
  updateScreenerApi,
  generateScreenerQueryApi,
  getAllCategoryApi,
} from 'redux/screener/screenerApi';
import { saveFormConst } from '../utils/constants';
import { MIconButton } from '../../../components/@material-extend';
import { useRouter } from 'next/router';

import { createScreenerApi } from '../../../redux/screener/screenerApi';

const RootStyle = styled(Page)({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const useStyles = makeStyles((theme) => ({
  createStock: {
    [theme?.breakpoints?.up('md')]: {
      width: '80%',
    },
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '18px 16px',
    marginBottom: '24px',
  },
  stockList: {
    width: '80%',
    height: 643,
    backgroundColor: 'white',
    marginTop: '44px',
    borderRadius: 2,
    boxShadow: 3,
  },
  reactQuill: {
    width: '100%',
    overflowY: 'scroll',
    backgroundColor: '#F2F4F9',
    'MuiBox-root &': {
      width: '500px',
    },
    '& .ql-toolbar': {
      border: 'none',
    },
    '& .ql-container': {
      border: 'none',
      '& .ql-editor': {
        minHeight: '100px',
        maxHeight: '300px',
      },
      maxHeight: '300px',
    },
  },
  descriptionRoot: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  desBtn: {
    cursor: 'pointer',
    borderBottom: '1px solid #0066CC',
    color: '#0066CC',
  },
  noBorder: {
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  inputTitle: {
    fontSize: { xs: '16px', sm: '16px', md: '18px' },
    color: '#333333',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
}));

const SortableItem = sortableElement((props) => <FilterPanel {...props} />);

const SortableContainer = sortableContainer(({ children }) => <div>{children}</div>);

export default function NewScreenerPage(props) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const formsRef = useRef();
  let formikSaveForm = useRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { isAuthenticated } = useAuth();
  const {
    filterPanelList,
    selectedScreener,
    screenerQuery,
    isScreenerQueryLoading,
    categoryList = [],
  } = useSelector(({ screenerReducer }) => screenerReducer);
  const [showSaveForm, setSaveForm] = useState(null);
  const [handleScreener, setHanldeScreener] = useState(false);
  const [isResultLoading, setResultLoading] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);

  const [editFlag, setEditFlag] = useState(false);

  useEffect(() => {
    if (_.isEmpty(categoryList)) {
      dispatch(getAllCategoryApi());
    }
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const updatedFilterVals = arrayMoveImmutable(filterPanelList, oldIndex, newIndex);
    console.log('updated filter fal is', updatedFilterVals);
    dispatch(screenerAction.setFilterPanelList(updatedFilterVals));
  };

  const onhandleScreener = () => {
    // setFormScreenerScan((fom) => !fom);
    setResultLoading(true);

    setTimeout(() => {
      setResultLoading(false);
    }, 3000);
  };

  const pathname = navigate?.pathname;
  useEffect(() => {
    const lastPath = pathname?.split('/').pop();
    if (lastPath === 'new-screener') {
      dispatch(screenerAction.resetSelectedScreener());
    }
  }, [navigate]);

  const classes = useStyles();

  const setToggler = (itemIndex) => {
    const updatedToggle = _.cloneDeep(filterPanelList);
    if (updatedToggle[itemIndex].relation === 'AND') {
      updatedToggle[itemIndex].relation = 'OR';
    } else {
      updatedToggle[itemIndex].relation = 'AND';
    }
    dispatch(screenerAction.setFilterPanelList(updatedToggle));
  };

  const onBtGroupping = () => {
    const updatedPanel = _.cloneDeep(filterPanelList);

    const rdClr = randomColor({
      luminosity: 'light',
      format: 'rgba',
      alpha: 0.5,
    });
    updatedPanel.push({ data: [], relation: 'AND', type: 'group' });
    updatedPanel.push({ data: [], bgColor: rdClr, relation: 'AND', type: 'filter' });
    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const onCopyClick = async () => {
    const { _id, createdAt, updatedAt, userId, slugUrl, ...otherScreenerParams } = selectedScreener;
    // const params = {
    //   ...selectedScreener,
    //   _id: '',
    //   createdAt: '',
    //   updatedAt: '',
    //   userId: '',
    // };
    // otherScreenerParams.userId = localStorage.getItem('user_id')
    let response = await dispatch(createScreenerApi(otherScreenerParams));
    response = unwrapResult(response);
    if (response.data) {
      enqueueSnackbar('Saved successfully', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      setSaveForm(null);
      // formik.resetForm();
      navigate.replace(`${PATH_SCREENER.root}/${response?.data?.slugUrl}`);
    }
  };

  const onBtSave = async () => {
    if (isAuthenticated) {
      // if (_.isEmpty(selectedScreener)) {
      //   // setSaveForm((val) => (val === saveFormConst.SCREENER_SAVE ? null : saveFormConst.SCREENER_SAVE));
      // } else {
      //   const params = { ...selectedScreener, filterPanelList };
      //   let response = await dispatch(updateScreenerApi(params));
      //   response = unwrapResult(response);
      //   if (response.data) {
      //     enqueueSnackbar('Saved successfully', {
      //       variant: 'success',
      //       action: (key) => (
      //         <IconButton size="small" onClick={() => closeSnackbar(key)}>
      //           <Icon icon={closeFill} />
      //         </IconButton>
      //       ),
      //     });
      //   }
      //   setSaveForm(null);
      // }
      formikSaveForm.current.handleSubmit();
    } else {
      navigate.push(PATH_AUTH.login);
    }
  };

  const onBtAlert = async () => {
    if (isAuthenticated) {
      if (!_.isEmpty(selectedScreener)) {
        setSaveForm((val) => (val === saveFormConst.ALERT_SAVE ? null : saveFormConst.ALERT_SAVE));
      } else {
        setAlertDialog(true);
      }
    } else {
      navigate.push(PATH_AUTH.login);
    }
  };

  const onGenerateQuery = async () => {
    const params = { filterPanelList };
    setResultLoading(true);
    await dispatch(generateScreenerQueryApi(params));
    setResultLoading(false);
  };

  return (
    <RootStyle title="Screener">
      <DialogAlert
        handleClose={() => setAlertDialog(false)}
        title="Information"
        message="Please create or select a screener to create alert"
        dialogOpen={alertDialog}
      />
      <Paper elevation={3} className={classes.createStock}>
        <Grid sx={{ flexGrow: 1, flex: 1 }} container spacing={2}>
          {/* <Grid item xs={12} lg={12}>
            <StockBanner />
          </Grid> */}
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            sx={{
              marginLeft: 2,
              width: '100%',
            }}
          >
            <ScreenerTitleAndDesc classes={classes} formik={formikSaveForm} {...{ editFlag, setEditFlag }} />
          </Grid>

          <Grid item xs={12} lg={12}>
            <FilterNavbar />
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
              {_.map(filterPanelList, (val, index) =>
                val.type === 'filter' ? (
                  <SortableItem
                    itemIndex={index}
                    key={`item-${index}`}
                    index={index}
                    valueUploaded={val.data}
                    bgColor={val?.bgColor}
                    relation={val?.relation}
                    isActive={val?.isActive}
                    disabled={!val?.isActive}
                  />
                ) : (
                  <GroupToggler
                    setToggleButton={() => setToggler(index)}
                    key={`item-${index}`}
                    relation={val?.relation}
                  />
                )
              )}
            </SortableContainer>
            <FilterFooterButtons
              onRunScreenerClick={() => onhandleScreener(!handleScreener)}
              onSaveClick={onBtSave}
              onCopyClick={onCopyClick}
              onBtGroupping={onBtGroupping}
              onBtAlert={onBtAlert}
              onGenerateQuery={onGenerateQuery}
            />
            <Box
              as="div"
              ref={formsRef}
              sx={{
                opacity: showSaveForm ? '1' : '0',
                height: showSaveForm ? 'auto' : '0px',
                overFLow: showSaveForm ? 'visible' : 'hidden',
                transition: 'height 0.3s, display: 1s',
                // display: formScreenerScan ? 'block' : 'none'
                // transition: 'display 1s ease-in-out'
              }}
            >
              {/* {showSaveForm === saveFormConst.SCREENER_SAVE && <FormScreenerScan setSaveForm={setSaveForm} />} */}
              {showSaveForm === saveFormConst.ALERT_SAVE && <FormScreenerAlert setSaveForm={setSaveForm} />}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {screenerQuery && (
        <Paper elevation={3} className={classes.createStock}>
          {screenerQuery}
        </Paper>
      )}
      <Paper elevation={3} className={classes.createStock}>
        <ResultsContainer isResultLoading={isResultLoading}  />
      </Paper>
    </RootStyle>
  );
}
