import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        bgcolor: 'background.paper',
      }}
    >
      Loading...
    </Box>
  ),
});
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import closeFill from '@iconify/icons-eva/close-fill';
import checkOutline from '@iconify/icons-eva/checkmark-outline';
import closeOutline from '@iconify/icons-eva/close-outline';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../../components/@material-extend';
import { useFormik, Form, FormikProvider } from 'formik';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useDispatch, useSelector } from 'react-redux';
import { PATH_SCREENER } from '../../../routes/paths';

import * as Yup from 'yup';
import _ from 'lodash';

import {
  Grid,
  Stack,
  TextField,
  Typography,
  Box,
  Checkbox,
  Select,
  MenuItem,
  Button,
  InputBase,
  IconButton,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { createScreenerApi, updateScreenerApi, getAllCategoryApi } from '../../../redux/screener/screenerApi';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  reactQuill: {
    width: '100%',
    overflowY: 'scroll',
    backgroundColor: '#03a9f414',
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
}));

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  marginLeft: '-9px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#0066cc',
  marginLeft: '-9px',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const screenerSchema = Yup.object().shape({
  screenerName: Yup.string().required('Screener Name required'),
  description: Yup.string(),
  scanCategory: Yup.string().required('Scan category is required'),
  isPrivate: Yup.boolean(),
});

export default function FormScreenerScan(props) {
  const isMountedRef = useIsMountedRef();
  
  const classes = useStyles();
  const navigate = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    filterPanelList,
    selectedScreener,
    categoryList = [],
  } = useSelector(({ screenerReducer }) => screenerReducer);
  props.formik.current = useFormik({
    initialValues: {
      screenerName: 'Stock Screener',
      description: '',
      scanCategory: '',
      isPrivate: false,
      ...selectedScreener,
    },
    validationSchema: screenerSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const isNew = _.isEmpty(selectedScreener);

        let params = { ...values, filterPanelList };

        if (!isNew) {
          params = { ...selectedScreener, ...values, filterPanelList };
        }
        // params.keywords = keywords;
        let response = await dispatch(isNew ? createScreenerApi(params) : updateScreenerApi(params));
        response = unwrapResult(response);
        if (response.data) {
          enqueueSnackbar('Saved successfully', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} style={{ fontWeight: 700 }} />
              </MIconButton>
            ),
          });
          props.setEditFlag(false);
          // props.formik.resetForm();
          navigate.replace(`${PATH_SCREENER.root}/${response.data?.slugUrl}`);
        }

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = props.formik.current;

  useEffect(() => {
    if (_.isEmpty(categoryList)) {
      dispatch(getAllCategoryApi());
    }
  }, []);
  return (
    <FormikProvider value={props.formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid sx={{ flexGrow: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }} container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                alignItems: 'flex-start',
                flexDirection: ' flex-start',
                marginTop: '10px',
                // boxShadow: '0 0 1px 0px #828282',
                // borderRadius: '4px',
                padding: '16px',
              }}
            >
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <InputBase
                  type="text"
                  id="screener-name"
                  name="screenerName"
                  autoFocus="true"
                  variant="outlined"
                  dense
                  size="small"
                  inputProps={{
                    classes: classes.inputTitle,
                  }}
                  {...getFieldProps('screenerName')}
                  sx={{
                    fontSize: { xs: '16px', sm: '16px', md: '18px' },
                    color: '#333333',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  error={Boolean(touched.screenerName && errors.screenerName)}

                  // onChange={({ target: { value } }) => setTempTitle(value)}
                  // onBlur={saveTitle}
                  // className={classes.noBorder}
                />
                <IconButton size="small" onClick={() => props.setEditFlag(false)}>
                  <Icon icon={closeOutline} style={{ fontSize: 24 }} />
                </IconButton>
              </Stack>

              <Box as="div" fullWidth sx={{ width: '100%' }}>
                <ReactQuill
                  className={classes.reactQuill}
                  value={values.description}
                  name="description"
                  // {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  onChange={(value) => setFieldValue('description', value)}
                />
              </Box>
              <Box
                as="div"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <div>
                  <Typography
                    as="h6"
                    sx={{
                      fontSize: '14px',
                      display: 'inline-block',
                      maxWidth: '100%',
                      fontWeight: '700',
                      color: 'black',
                    }}
                    noWrap /* sx={{ minWidth: '0px' }} */
                  >
                    Scan Category:
                  </Typography>
                </div>
                <Select
                  size="small"
                  dense
                  id="Screener-categoru"
                  name="scanCategory"
                  {...getFieldProps('scanCategory')}
                  error={Boolean(touched.scanCategory && errors.scanCategory)}
                  helperText={touched.scanCategory && errors.scanCategory}
                  sx={{ minWidth: '150px', border: '1px solid #ced4da', marginLeft: 1, borderRadius: '4px' }}
                >
                  {categoryList.map((cat) => (
                    <MenuItem key={cat?.categoryName} value={cat?.categoryName}>
                      {cat?.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                as="div"
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <BpCheckbox checked={values.isPrivate} onClick={() => setFieldValue('isPrivate', !values.isPrivate)} />
                <Box
                  as="div"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    as="span"
                    sx={{
                      fontSize: '14px',
                      display: 'inline-block',
                      maxWidth: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={() => setFieldValue('isPrivate', !values.isPrivate)}
                  >
                    is Private?
                  </Typography>
                </Box>
              </Box>
              {/* <Button
                variant="contained"
                disableElevation
                type="submit"
                sx={[
                  {
                    '&:hover': {
                      backgroundColor: 'rgba(0, 102, 204, .8)',
                    },
                    backgroundColor: 'secondary.main',
                    boxShadow: 'none',
                  },
                ]}
              >
                Submit
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
